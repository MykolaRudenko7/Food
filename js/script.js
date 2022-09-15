require("es6-promise").polyfill();
// імпорт пакету НПМ
import "nodelist-foreach-polyfill";
//   або так (ES6)
import tabs from "./modules/tabs";
import modal from "./modules/modal";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calculator from "./modules/calculator";
import timer from "./modules/timer";

// Ф-ція відкриття модального вікна
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  // підключаю модулі
  //   const tabs = require("./modules/tabs");
  //   const modal = require("./modules/modal");
  //   const cards = require("./modules/cards");
  //   const forms = require("./modules/forms");
  //   const slider = require("./modules/slider");
  //   const calculator = require("./modules/calculator");

  const timerModal = setTimeout(() => openModal(".modal", timerModal), 500000);

  // викликаю їх
  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  modal("[data-modal]", ".modal", timerModal);
  //   селектор таймера і дата
  timer(".timer", "2022-12-31");
  cards();
  calculator();
  forms("form", timerModal);
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
});
