const myBreakpoints = {
  1280: {
    slidesPerView: 4,
    spaceBetween: 19,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
};

var swiperResult = new Swiper(".swiper-result", {
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    nextEl: ".result-arrow-next",
    prevEl: ".result-arrow-prev",
  },
  breakpoints: myBreakpoints,
});

var swiperReleases = new Swiper(".swiper-latest-releases", {
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    nextEl: ".releases-arrow-next",
    prevEl: ".releases-arrow-prev",
  },
  breakpoints: myBreakpoints,
});

var swiperMoviesBygenre = new Swiper(".swiper-movies-by-genre", {
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    nextEl: ".movies-by-genre-arrow-next",
    prevEl: ".movies-by-genre-arrow-prev",
  },
  breakpoints: myBreakpoints,
});
