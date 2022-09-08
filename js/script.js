//										 1 Таби

window.addEventListener("DOMContentLoaded", () => {
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

  //   						2 Модальні вікна

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

  //   					3 Модальні вікна таймер

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

  //							Класи

  class MenuCard {
    constructor(src, alt, title, describe, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.describe = describe;
      this.price = price;

      // додаю додаткові класи в масив
      this.classes = classes;

      this.parent = document.querySelector(parentSelector);
      this.exchange = 37;
      this.convertUAH();
    }
    convertUAH() {
      this.price = +this.price * +this.exchange;
    }
    renderCard() {
      const card = document.createElement("div");

      // якщо класи не вказані, то
      if (this.classes.length === 0) {
        // даєм карточці клас за замовчуванням
        this.card = "menu__item";
        // і прописуєм його в класах
        card.classList.add(this.card);
      } else {
        // додаю клас в початок карти з ім'ям, що прийшло з масиву
        this.classes.forEach((className) => card.classList.add(className));
      }

      card.innerHTML = `
      		<img src=${this.src} alt=${this.alt}/>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.describe}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total">
                <span>${this.price}</span> грн/день
              </div>
            </div>
		`;
      this.parent.append(card);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
    //  тепер навіть коли клас не вказаний, то він ставиться по дефолту
    //  "menu__item"
  ).renderCard();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    14,
    ".menu .container",
    "menu__item"
  ).renderCard();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    21,
    ".menu .container",
    "menu__item"
  ).renderCard();

  //   if
  // const card1 = new MenuCard(
  // 	"img/tabs/vegy.jpg",
  //    "vegy",
  //    'Меню "Фитнес"',
  //    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //    9,
  //    ".menu .container"
  // 	).renderCard();

  //   								Server

  // forms
  // форми
  const forms = document.querySelectorAll("form");
  // об'єкт з повідомленнями
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами звяжемся",
    failure: "Что-то пошло не так...",
  };

  // для кожної форми виконуєм функцію
  forms.forEach((form) => {
    postData(form);
  });

  // ф-ція яка працює при відправці форми
  function postData(form) {
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
      const object = {};
      // перебираю formData і поміщаю в об'єкт
      formData.forEach(function (value, key) {
        // ключ об'єкту = значенню з форм дата
        object[key] = value;
      });

      // краща альтернатива XMLHttp
      // запрос на отправку данних 1url
      fetch("server.php", {
        // 2 obj setings
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        // тип даних тіла повинен відповідати заголовку
        // превожу мій об'єкт (конверт форм дата) в фоормат Json
        body: JSON.stringify(object),
      })
        // fetch працює на промісах
        // отримую дату(якщо все норм(response)) і конвертую в текст utf 8
        .then((data) => data.text())
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

  // spiner

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
});
