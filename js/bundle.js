/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calculator() {
  const result = document.querySelector(".calculating__result span");

  let gender, ratio, height, weight, age;

  // localStorage
  //   якщо в пам'яті уже є вибраний гендер, то прописую його в перемінну
  if (localStorage.getItem("gender")) {
    gender = localStorage.getItem("gender");
  } else {
    // якщо немає, то задаю стандартний і прописую його в пам'ять
    gender = "female";
    localStorage.setItem("gender", "female");
  }

  //   так само з активністю
  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }
  // рахує
  function calcTotal() {
    // якщо чогось немає, то виводим повідомлення і перериваєм
    if (!gender || !height || !weight || !age || !ratio) {
      result.textContent = "___";
      // прериваєм ф-цію
      return;
    }

    // якщо стать жіноча
    if (gender === "female") {
      // округляю
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  //
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      // delete active class
      element.classList.remove(activeClass);
      // якщо в едемента атрибут такий як у лС (тобто в лС уже був записаний) то:
      if (element.getAttribute("id") === localStorage.getItem("gender")) {
        // даю активний клас цьому елементу
        element.classList.add(activeClass);
      }
      // для активності
      if (
        element.getAttribute("data-ratio") === localStorage.getItem("ratio")
      ) {
        // даю активний клас цьому елементу
        element.classList.add(activeClass);
      }
    });
  }

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  // для класів і атрибутів
  function getStaticInf(selector, activeClass) {
    // отримую діви з цього елементу
    const elements = document.querySelectorAll(selector);

    // на кожен елемент навішую подію
    elements.forEach((element) => {
      element.addEventListener("click", (e) => {
        // якщо на нажатій конпці є атрибут (getAttr - повертає значення атрибуту, якщо немає атрибуту, то null), то
        if (e.target.getAttribute("data-ratio")) {
          // присвоюю значення цій перемінній як у атрибута
          ratio = +e.target.getAttribute("data-ratio");
          // записую в локал сторедж ключ і значення (те що нажав користувач в калькуляторі (від 1.2 до 1.75))
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          gender = e.target.getAttribute("id");
          //  зберігаю гердер який вибрали в калькуляторі
          localStorage.setItem("gender", e.target.getAttribute("id"));
        }
        // видаляю активній клас у всіх
        elements.forEach((el) => {
          el.classList.remove(activeClass);
        });

        // даю активний клас при клікові
        e.target.classList.add(activeClass);

        // перераховую
        calcTotal();
      });
    });
  }

  getStaticInf("#gender div", "calculating__choose-item_active");
  getStaticInf(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  // ф-ція для записів значень інпуту в перемінні
  function getDynamicInf(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", function (e) {
      // якщо починаю вводити букву, інпут світитьмя червоним
      if (input.value.match(/\D/g)) {
        input.style.border = "2px solid red";
        // коли цифри все норм
      } else {
        input.style.border = "";
      }

      // чи є атрибут id => якщо і його значеення
      switch (input.getAttribute("id")) {
        // якщо рост
        case "height":
          // даэм перемынный значення з інпуту(числове)
          height = +input.value;
          //  остановлюю
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      //  перераховуєм після вводду в інпут
      calcTotal();
    });
  }

  getDynamicInf("#height");
  getDynamicInf("#weight");
  getDynamicInf("#age");
}

// module.exports = calculator;
/* harmony default export */ __webpack_exports__["default"] = (calculator);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

//
//
//
function cards() {
  // 1й метод шаблонізація
  //
  //   class MenuCard {
  //     constructor(src, alt, title, describe, price, parentSelector, ...classes) {
  //       this.src = src;
  //       this.alt = alt;
  //       this.title = title;
  //       this.describe = describe;
  //       this.price = price;

  //       // додаю додаткові класи в масив
  //       this.classes = classes;

  //       this.parent = document.querySelector(parentSelector);
  //       this.exchange = 37;
  //       this.convertUAH();
  //     }
  //     convertUAH() {
  //       this.price = +this.price * +this.exchange;
  //     }
  //     renderCard() {
  //       const card = document.createElement("div");

  //       // якщо класи не вказані, то
  //       if (this.classes.length === 0) {
  //         // даєм карточці клас за замовчуванням
  //         this.card = "menu__item";
  //         // і прописуєм його в класах
  //         card.classList.add(this.card);
  //       } else {
  //         // додаю клас в початок карти з ім'ям, що прийшло з масиву
  //         this.classes.forEach((className) => card.classList.add(className));
  //       }

  //       card.innerHTML = `
  //         		<img src=${this.src} alt=${this.alt}/>
  //               <h3 class="menu__item-subtitle">${this.title}</h3>
  //               <div class="menu__item-descr">${this.describe}</div>
  //               <div class="menu__item-divider"></div>
  //               <div class="menu__item-price">
  //                 <div class="menu__item-cost">Цена:</div>
  //                 <div class="menu__item-total">
  //                   <span>${this.price}</span> грн/день
  //                 </div>
  //               </div>
  //   		`;
  //       this.parent.append(card);
  //     }
  //   }
  //
  // 1й метод
  //
  //   // отримую карточки масивом, якщо все добре, то
  //   getResourde("http://localhost:3000/menu").then((data) => {
  //     // для кожного ел масиву (елемент це об'єкт) створюю карточку (визив конструктор)
  //     // щоб було комфортніше - деструктуризація
  //     data.forEach(({ img, altimg, title, descr, price }) => {
  //       new MenuCard(
  //         img,
  //         altimg,
  //         title,
  //         descr,
  //         price,
  //         ".menu .container"
  //       ).renderCard();
  //     });
  //   });
  //
  //
  //
  // 2й метод
  //
  // получаєм дані
  //  function getRes

  // обробляю дані попередньою ф-цією, далі:
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)("http://localhost:3000/menu")
    //беру масив і передаю його ф-ції
    .then((data) => createCard(data));

  //
  //
  //  3й бібліотека axios (коли є конструктор)
  //   включить в index.html
  //
  // отримую данні
  //   axios.get("http://localhost:3000/menu").then(data => {
  //   		// обращаюсь до даних які отримав, а не до общого
  //        data.data.forEach(({ img, altimg, title, descr, price }) => {
  //           new MenuCard(
  //             img,
  //             altimg,
  //             title,
  //             descr,
  //             price,
  //             ".menu .container"
  //           ).renderCard();
  //         });
  //   });
  //
  //
  //

  // ф-ція отримує масив
  function createCard(data) {
    // перебирає його і витягуєм дані
    data.forEach(({ img, altimg, title, descr, price }) => {
      // створ контейнер
      const element = document.createElement("div");
      element.classList.add("menu__item");
      // поміщаю в нього верстку і дані з перебраного масиву
      element.innerHTML = `
      		<img src=${img} alt=${altimg}/>
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total">
                <span>${+price * 40}</span> грн/день
              </div>
            </div>
		`;
      // закидую на сторінку
      document.querySelector(".menu .container").append(element);
    });
  }
}

// module.exports = cards;
/* harmony default export */ __webpack_exports__["default"] = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
// імпортую з модальних вікон

//

//
//
//
function forms(formSelector, timerModal) {
  // всі форми
  const forms = document.querySelectorAll(formSelector);
  // об'єкт з повідомленнями
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами звяжемся",
    failure: "Что-то пошло не так...",
  };

  // для кожної форми виконуєм функцію
  forms.forEach((form) => {
    bindPostData(form);
  });

  //   function services

  // ф-ція яка працює при відправці форми
  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      // скидаю перезаваантаження при відправці форми
      e.preventDefault();

      // повідомлення, що вивожу в модальне вікно, спінер (стан відправки)
      const statusMessage = document.createElement("div");
      // прописою атрибут з шляхом до картинки
      statusMessage.src = message.loading;
      // стиль
      statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
		`;
      // у верстку
      form.insertAdjacentElement("afterend", statusMessage);

      // обєкт форм дата (для передачі данних форм) і передать використовуючи XMLHttp... або конвертувати в JSON
      const formData = new FormData(form);

      // для конвертації форм дати
      // роблю з formData масив з масивами => робим об'єкт => робим об'єкт JSON
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // поверниться проміс, який обробляю then
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
        // затим вивожу
        .then((data) => {
          // вивожу в консоль
          console.log(data);
          //  показую в модальному вікні повідомленя, що все добре
          showThanksModal(message.success);
          //  видаляю спінер
          statusMessage.remove();
        })
        // при помилці
        .catch(() => {
          // показую в модальному вікні, що щось не так
          showThanksModal(message.failure);
        })
        // дія завжди
        .finally(() => {
          // скидаю форму
          form.reset();
        });
    });
  }

  //   ф-ція показу модального вікна
  function showThanksModal(message) {
    // в константу беру модальне вікно (текст і форму безпосередньо)
    const prevModalDialog = document.querySelector(".modal__dialog");
    // ховаю
    prevModalDialog.classList.add("hide");

    // показую модальне вікно
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", timerModal);

    // верстаю текст для виводу на місце де була форма з текстом
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
	 		<div class="modal__content">
         	<div class="modal__close" data-close>×</div>
         	<div class="modal__title">${message}</div>
      	</div>
		`;
    document.querySelector(".modal").append(thanksModal);

    //  ця ф-ція триває 4с
    setTimeout(() => {
      // видаляю стан
      thanksModal.remove();
      // показую стару форму
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      // і ховаю стару форму
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)(".modal");
    }, 4000);
  }
}

// module.exports = forms;
/* harmony default export */ __webpack_exports__["default"] = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hideModal": function() { return /* binding */ hideModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; }
/* harmony export */ });
function hideModal(modalWindowsSelector) {
  const modalWindow = document.querySelector(modalWindowsSelector);

  modalWindow.classList.add("hide");
  modalWindow.classList.remove("show");
  document.body.style.overflow = "";
}

function openModal(modalWindowsSelector, timerModal) {
  const modalWindow = document.querySelector(modalWindowsSelector);

  modalWindow.classList.add("show");
  modalWindow.classList.remove("hide");
  document.body.style.overflow = "hidden";

  if (timerModal) {
    clearInterval(timerModal);
  }
}

function modal(btnsSelector, modalWindowsSelector, timerModal) {
  const modalBtns = document.querySelectorAll(btnsSelector);
  const modalWindow = document.querySelector(modalWindowsSelector);

  modalBtns.forEach((btn) => {
    // не можна зразу визивать коллбек ф-цію (просто об'явить), щоб обійти це, обворачують  в стріллочну ф-цію
    btn.addEventListener("click", () =>
      openModal(modalWindowsSelector, timerModal)
    );
  });

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      hideModal(modalWindowsSelector);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      hideModal(modalWindowsSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalWindowsSelector, timerModal);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}

// module.exports = modal;
/* harmony default export */ __webpack_exports__["default"] = (modal);

// щоб не було помилок (експортую в форми)




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  //   const slides = document.querySelectorAll(".offer__slide");
  //   // btn
  //   const prevSlide = document.querySelector(".offer__slider-prev");
  //   const nextSlide = document.querySelector(".offer__slider-next");
  //   // щотчик
  //   const total = document.querySelector("#total");
  //   const current = document.querySelector("#current");
  //   //
  //   let slideIndex = 1;
  //   //
  //   //
  //   //
  //   // 											варіант 1
  //   //
  //   //
  //   //
  //   //показую перший слайд
  //   showSlides(slideIndex);

  //   //   всього
  //   //   якщо к-сть слайдів менша 10
  //   if (slides.length < 10) {
  //     // то в перемінну вивожу текст з 0 + к-сть слайдів
  //     total.textContent = `0${slides.length}`;
  //   } else {
  //     // якщо більше 10, то ссе показую спереду без 0
  //     total.textContent = slides.length;
  //   }

  //   // ф-ція показу і скриття слайдів
  //   function showSlides(n) {
  //     // якщо індекс слайду буде більший чим к-сть слайдів, то переміщаюсь на початок
  //     if (n > slides.length) {
  //       slideIndex = 1;
  //     }
  //     //  якщо менший чим к-сть слайдів то преміщуюсь в кінець
  //     if (n < 1) {
  //       // 4 - тобто на останній
  //       slideIndex = slides.length;
  //     }
  //     // ховаю усі слайди окрім останнього
  //     slides.forEach((slide) => {
  //       slide.style.display = "none";
  //     });
  //     slides[slideIndex - 1].style.display = "block";

  //     // якщо к-сть слайдів менша 10
  //     if (slides.length < 10) {
  //       // то до перемінної додаєм 0 і теперішній номер слайду
  //       current.textContent = `0${slideIndex}`;
  //     } else {
  //       // якщо більше, то просто номер
  //       current.textContent = slideIndex;
  //     }
  //   }

  //   // ф-ція
  //   function plusSlide(n) {
  //     // додає до перемінної щотчика значення і при прокрутці показує слайд
  //     showSlides((slideIndex += n));
  //   }

  //   prevSlide.addEventListener("click", function (e) {
  // 	// при клікові віднімаю 1, тобто переключаю на попереднє зображення
  //     plusSlide(-1);
  //   });

  //   nextSlide.addEventListener("click", function (e) {
  //     plusSlide(1);
  //   });
  //
  //
  //
  //  									варіант 2
  //
  //
  // обертки:
  const slidesField = document.querySelector(field);
  const slider = document.querySelector(container);
  const slidesWrapper = document.querySelector(wrapper);
  // слайди:
  const slides = document.querySelectorAll(slide);
  // btn:
  const prevSlide = document.querySelector(prevArrow);
  const nextSlide = document.querySelector(nextArrow);
  // щотчик:
  const total = document.querySelector(totalCounter);
  const current = document.querySelector(currentCounter);
  // витягую в константу ширину блоку
  const width = window.getComputedStyle(slidesWrapper).width;
  //
  let slideIndex = 1;
  let offset = 0;

  // якщо слайдів менше 10
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    // якщо більше
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  // поміщаю усі слайди на сторінці в цей блок-обертку задаючи йому ширину рівну всім слайдам
  slidesField.style.width = 100 * slides.length + "%";
  // слайди в одну лінію + стиль їх переміщення
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.7s all";
  // ховаю остальні слайди, ті що не в обертці
  slidesWrapper.style.overflow = "hidden";

  // кожному слайду задаю ширину рівну перемінній with (общій обертці)
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  // для точок
  slider.style.position = "relative";
  // dots
  const dots = document.createElement("ol");
  const dotsMassive = [];
  //   style
  dots.classList.add("carousel-indicators");
  // на сайт
  slider.append(dots);

  // цикл закінчиться, коли закінчуться слайди
  for (let i = 0; i < slides.length; i++) {
    // створ точки
    const dot = document.createElement("li");
    // даю їм атрибут до якого слайду вони відносяться
    dot.setAttribute("data-slide-to", i + 1);
    // додаю стилі
    dot.classList.add("dot");

    if (i == 0) {
      dot.style.opacity = 1;
    }
    dots.append(dot);
    //  поміщаю тоочку в масив
    dotsMassive.push(dot);
  }

  function counter() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dotsMassive.forEach((dot) => (dot.style.opacity = "0.5"));
    dotsMassive[slideIndex - 1].style.opacity = "1";
  }

  // регудярним виразом буду вирізать букви із значень
  function dellLetter(str) {
    return +str.replace(/\D/g, "");
  }

  //   якщо нажать на кнопку наступного слайду то:
  nextSlide.addEventListener("click", function (e) {
    // якщо перемінна буде дорівнювать ширині всих слайдів, то повертаєм на 1й слайд
    if (offset == dellLetter(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      // коли вперед то до офсет добавляється ширина слайду
      offset += dellLetter(width);
    }

    //  при клікові передвигаю на число з перемінної
    slidesField.style.transform = `translateX(-${offset}px)`;

    // контролю індекс
    if (slideIndex == slides.length) {
      slideIndex = 1;
      // якшо не дійшов до кінця
    } else {
      slideIndex++;
    }

    counter();
  });

  //   попередній слайд
  prevSlide.addEventListener("click", function (e) {
    // якщо преший слайд
    if (offset == 0) {
      // тo офсет дорівнюватиме  ширині всих слайдів (ставиться 1й)
      offset = dellLetter(width) * (slides.length - 1);
    } else {
      // коли назад то від офсет віднімається ширина слайду
      offset -= dellLetter(width);
    }
    //  при клікові передвигаю на число з перемінної
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    counter();
  });

  //   управління через точки
  dotsMassive.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = dellLetter(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      counter();
    });
  });
}

// module.exports = slider;
/* harmony default export */ __webpack_exports__["default"] = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  let tabs = document.querySelectorAll(tabsSelector);
  let tabContents = document.querySelectorAll(tabsContentSelector);
  let tabsWrapper = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabContents.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabContents[i].classList.add("show", "fade");
    tabContents[i].classList.remove("hide");

    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsWrapper.addEventListener("click", (e) => {
    const target = e.target;
    //  нова строка, але без першого символу(без крапки)
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((tab, i) => {
        if (target == tab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

// module.exports = tabs;
/* harmony default export */ __webpack_exports__["default"] = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
	
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResourse": function() { return /* binding */ getResourse; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
// ф-ція 'сервіс' (її краще в окрему папку і файли)
// ф-ція налаштовує запрос (посила на сервер запросс => получа в-дь => транс в джсон)
const postData = async (url, data) => {
  // await - знач дожидаємся  закінч запросу
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });
  //  повертаєм результат, щоб далі його обробити через then, бо це проміс
  //  коли перевів, тільки поді повертає
  return await res.json();
};

const getResourse = async (url) => {
  let res = await fetch(url);
  // .ok - чи все норм?
  // .status -
  // якщо не ок бо футч не розуміє 404
  if (!res.ok) {
    // викидаю помилку
    // выполнение текущей функции будет остановлено (инструкции после throw не будут выполнены)
    throw new Error(`Could not fetch ${url}, status ${res.status}`);
  }
  //  повертаю результат виконання в форматі json
  return await res.json();
};




/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof __webpack_require__.g !== 'undefined') {
    local = __webpack_require__.g;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (function() {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
(__webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").polyfill)();
// імпорт пакету НПМ

//   або так (ES6)








// Ф-ція відкриття модального вікна


window.addEventListener("DOMContentLoaded", () => {
  // підключаю модулі
  //   const tabs = require("./modules/tabs");
  //   const modal = require("./modules/modal");
  //   const cards = require("./modules/cards");
  //   const forms = require("./modules/forms");
  //   const slider = require("./modules/slider");
  //   const calculator = require("./modules/calculator");

  const timerModal = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)(".modal", timerModal), 500000);

  // викликаю їх
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])("[data-modal]", ".modal", timerModal);
  //   селектор таймера і дата
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__["default"])(".timer", "2022-12-31");
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form", timerModal);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
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

}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map