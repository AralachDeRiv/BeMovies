import * as apiFunctions from "./js/apiFunctions.js";

const displayMovieHover = async (moviesList, container) => {
  container.innerHTML = "";
  moviesList.forEach(async (movie) => {
    const slide = document.createElement("div");
    slide.classList = "swiper-slide";
    let title = apiFunctions.getTitle(movie);
    title = title.length > 30 ? title.slice(0, 25) + "..." : title;
    let poster = apiFunctions.getPoster(movie);
    poster =
      poster == "https://image.tmdb.org/t/p/w500null"
        ? "./img/no-image.svg"
        : poster;

    let listGenres = await apiFunctions.getGenresOfMovie(movie);
    listGenres = listGenres.slice(0, 3).join(" / ");
    listGenres =
      listGenres.length > 30 ? listGenres.slice(0, 27) + "..." : listGenres;
    const content = `
    <div class="card-movie">
        <!-- mettre le titre -->
        <h2>${title}</h2>
        <p class="date">${apiFunctions.getYearOfRelease(movie)}</p>
        <!-- list genre max 3 -->
        <p class="genres">${listGenres}</p>
        <div class="star">
          <img src="./img/star.svg" alt="" />
        </div>
        <!-- rate -->
        <p class="rate">${apiFunctions.getVoteAverage(movie)}</p>
        <div class="poster">
          <!-- lien poster -->
          <img
            src="${poster}"
          />
        </div>
    </div>`;

    slide.innerHTML = content;
    slide.addEventListener("click", async () => {
      await displayMovieModal(movie);
    });
    container.appendChild(slide);
  });
};

const displayMovieModal = async (movie) => {
  const movieModal = document.getElementById("movieModal");
  const posterModal = document.getElementById("poster-modal");
  let poster = apiFunctions.getPoster(movie);
  poster =
    poster == "https://image.tmdb.org/t/p/w500null"
      ? "./img/no-image.svg"
      : poster;

  posterModal.innerHTML = `     <img
          src="${poster}"
        />`;

  document.getElementById("title-modal").innerText =
    apiFunctions.getTitle(movie);
  document.getElementById("date-modal").innerText =
    apiFunctions.getYearOfRelease(movie);
  document.getElementById("rate-modal").innerText =
    apiFunctions.getVoteAverage(movie);
  let genres = await apiFunctions.getGenresOfMovie(movie);
  genres = genres.join(" / ");
  document.getElementById("genres-modal").innerText = genres;
  document.getElementById("overview-modal").innerText =
    apiFunctions.getOverview(movie);
  let casting = await apiFunctions.getCastingFromMovie(movie);
  casting = casting.slice(0, 5).join(", ");
  document.getElementById(
    "cast-modal"
  ).innerHTML = `<span>Cast :</span> ${casting}`;
  movieModal.showModal();
  movieModal.style.display = "flex";

  document.querySelector("body").classList.add("no-scroll");
  // for closing
  const cross = movieModal.querySelector(".cross");
  cross.addEventListener("click", () => {
    document.querySelector("body").classList.remove("no-scroll");
    movieModal.style.display = "none";
    movieModal.close();
  });
  movieModal.addEventListener("click", (e) => {
    const rect = movieModal.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      document.querySelector("body").classList.remove("no-scroll");
      movieModal.style.display = "none";
      movieModal.close();
    }
  });
};

const searchMovieForm = document.getElementById("searchMovie");
const wrapperResult = document.getElementById("wrapper-result");
const resultContainer = document.querySelector(".result-container");

searchMovieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let userInput = document.getElementById("searchMovieInput").value;
  const listOfMovies = await apiFunctions.searchMovie(userInput);
  if (listOfMovies.length) {
    await displayMovieHover(listOfMovies, wrapperResult);
    document.getElementById(
      "title-results"
    ).innerText = `Results for ${userInput}`;
  } else {
    wrapperResult.innerHTML = "";
    document.getElementById(
      "title-results"
    ).innerText = `No result for ${userInput}`;
  }

  resultContainer.style.display = "block";
});

const genres = {
  Comedy: 35,
  Action: 28,
  Drama: 18,
  Fantasy: 14,
  Animation: 16,
  Romance: 10749,
};

const wrapperLatestReleases = document.getElementById("wrapper-latest-release");
const wrapperMoviesByGenre = document.getElementById("wrapper-movies-by-genre");

document.addEventListener("DOMContentLoaded", async (e) => {
  const latestReleases = await apiFunctions.getLatestReleases();
  await displayMovieHover(latestReleases, wrapperLatestReleases);
  const genreComedyList = await apiFunctions.getFilmByGenre(genres.Comedy);
  await displayMovieHover(genreComedyList, wrapperMoviesByGenre);
});

const genreBtn = document.querySelectorAll(".genres-name .genreBtn");
const genreTitle = document.getElementById("genre-title");

genreBtn.forEach((btn) => {
  btn.addEventListener("click", async () => {
    genreBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
    genreTitle.innerText = btn.id;
    const moviesByGenreList = await apiFunctions.getFilmByGenre(genres[btn.id]);
    wrapperMoviesByGenre.innerHTML = "";
    await displayMovieHover(moviesByGenreList, wrapperMoviesByGenre);
  });
});
