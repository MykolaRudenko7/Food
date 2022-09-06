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

  const modalWindow = document.querySelector(".modal"),
    modalBtns = document.querySelectorAll("[data-modal]"),
    closeModal = document.querySelector("[data-close]");

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

  closeModal.addEventListener("click", hideModal);

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow) {
      hideModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      hideModal();
    }
  });

  //   					3 Модальні вікна таймер

  //   const timerModal = setTimeout(openModal, 10000);

  //   function showModalByScroll() {
  //     if (
  //       window.pageYOffset + document.documentElement.clientHeight >=
  //       document.documentElement.scrollHeight - 1
  //     ) {
  //       openModal();
  //       window.removeEventListener("scroll", showModalByScroll);
  //     }
  //   }

  //   window.addEventListener("scroll", showModalByScroll);

  //							Класи

  class MenuCard {
    constructor(src, alt, title, describe, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.describe = describe;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.exchange = 37;
      this.convertUAH();
    }
    convertUAH() {
      this.price = +this.price * +this.exchange;
    }
    renderCard() {
      const card = document.createElement("div");
      card.innerHTML = `
			<div class="menu__item">
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
  ).renderCard();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    14,
    ".menu .container"
  ).renderCard();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    21,
    ".menu .container"
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
});

