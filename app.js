import * as apiFunctions from "./js/apiFunctions.js";

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 19,
  navigation: {
    nextEl: ".swiper-arrow-next",
    prevEl: ".swiper-arrow-prev",
  },
});
