/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

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

module.exports = calculator;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

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
  const getResourde = async (url) => {
    const res = await fetch(url);
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

  // обробляю дані попередньою ф-цією, далі:
  getResourde("http://localhost:3000/menu")
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

module.exports = cards;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
  // всі форми
  const forms = document.querySelectorAll("form");
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
      postData("http://localhost:3000/requests", json)
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
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
  const modalWindow = document.querySelector(".modal");
  const modalBtns = document.querySelectorAll("[data-modal]");

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function openModal() {
    modalWindow.classList.remove("hide");
    modalWindow.classList.add("show");
    document.body.style.overflow = "hidden";
    clearInterval(timerModal);
  }

  function hideModal() {
    modalWindow.classList.remove("show");
    modalWindow.classList.add("hide");
    document.body.style.overflow = "";
  }

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      hideModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      hideModal();
    }
  });

  const timerModal = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  //   ф-ція показу модального вікна
  function showThanksModal(message) {
    // в константу беру модальне вікно (текст і форму безпосередньо)
    const prevModalDialog = document.querySelector(".modal__dialog");
    // ховаю
    prevModalDialog.classList.add("hide");

    // показую модальне вікно
    openModal();

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
      hideModal();
    }, 4000);
  }
}

module.exports = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
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
  const slidesField = document.querySelector(".offer__slider-inner");
  const slider = document.querySelector(".offer__slider");
  const slidesWrapper = document.querySelector(".offer__slider-wrapper");
  // слайди:
  const slides = document.querySelectorAll(".offer__slide");
  // btn:
  const prevSlide = document.querySelector(".offer__slider-prev");
  const nextSlide = document.querySelector(".offer__slider-next");
  // щотчик:
  const total = document.querySelector("#total");
  const current = document.querySelector("#current");
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

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
  const tabsWrapper = document.querySelector(".tabheader__items"),
    tabs = tabsWrapper.querySelectorAll(".tabheader__item"),
    tabContents = document.querySelectorAll(".tabcontent");

  // 1

  function hideTabContent() {
    tabContents.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  // 2

  function showTabContent(i = 0) {
    tabContents[i].classList.add("show");
    tabContents[i].classList.remove("hide");

    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  // 3

  tabsWrapper.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, i) => {
        if (target == tab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

module.exports = tabs;

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener("DOMContentLoaded", () => {
  // підключаю модулі
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
  const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
  const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
  const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
  const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
  const calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");

  // викликаю їх
  tabs();
  modal();
  cards();
  forms();
  slider();
  calculator();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map