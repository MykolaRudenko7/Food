window.addEventListener("DOMContentLoaded", () => {
  // підключаю модулі
  const tabs = require("./modules/tabs");
  const modal = require("./modules/modal");
  const cards = require("./modules/cards");
  const forms = require("./modules/forms");
  const slider = require("./modules/slider");
  const calculator = require("./modules/calculator");

  // викликаю їх
  tabs();
  modal();
  cards();
  forms();
  slider();
  calculator();
});
