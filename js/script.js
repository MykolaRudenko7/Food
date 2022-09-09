//
//
//
//										 1 Таби
//
//
//
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
  //
  //
  //
  //   						 	Модальні вікна
  //
  //
  //
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
  //
  //
  //
  //   							Модальні вікна таймер
  //
  //
  //
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
  //
  //
  //
  //											Класи
  //
  //
  //
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
  //       		<img src=${this.src} alt=${this.alt}/>
  //             <h3 class="menu__item-subtitle">${this.title}</h3>
  //             <div class="menu__item-descr">${this.describe}</div>
  //             <div class="menu__item-divider"></div>
  //             <div class="menu__item-price">
  //               <div class="menu__item-cost">Цена:</div>
  //               <div class="menu__item-total">
  //                 <span>${this.price}</span> грн/день
  //               </div>
  //             </div>
  // 		`;
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
    // якщо не ок
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
  //
  //
  //
  //   									Server
  //
  //
  //
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
  //
  //
  // spiner
  //
  //
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
