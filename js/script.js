// // 1 таби:

// window.addEventListener("DOMContentLoaded", () => {
//   // 1

//   //обертка переключателів
//   const tabsParent = document.querySelector(".tabheader__items");
//   // самі ссилки
//   const tabs = document.querySelectorAll(".tabheader__item");
//   // наповнення
//   const tabsContent = document.querySelectorAll(".tabcontent");

//   // 2 скриття:

//   // функція, що сдодає клас скриття і відбирає показу
//   function hideTabContent() {
//     // для кожного контенту даєм стиль при якому його не видно
//     tabsContent.forEach((item) => {
//       // + стиль скрить
//       item.classList.add("hide");
//       // - стиль видно і анімація при видаленні
//       item.classList.remove("show", "fade");
//     });

//     // також для кожного елементу табу(лінків) відбираєм стиль 'ектів'
//     tabs.forEach((item) => {
//       item.classList.remove("tabheader__item_active");
//     });
//   }

//   // 3 показ:
//   // функія зо відбирає клас для скриття і додає для показу

//   function showTabContent(i = 0) {
//     //0 коли нема іншого аргумента
//     // передаєм число (і)

//     // заданому елементу додаєм клас(щоб скрити або показати)
//     tabsContent[i].classList.add("show", "fade");

//     tabsContent[i].classList.remove("hide");

//     // до табу що зараз визваний додаю клас (для показу жирнішим)
//     tabs[i].classList.add("tabheader__item_active");
//   }

//   // визов їх
//   hideTabContent();
//   showTabContent();

//   // 4

//   // подія, вішаем на батьківський ел:
//   tabsParent.addEventListener("click", (e) => {
//     const target = e.target;
//     // якщо клік на балькові і на якійсь ссилці(табові), то
//     if (target && target.classList.contains("tabheader__item")) {
//       // у масиві берем таб і його номер
//       tabs.forEach((item, i) => {
//         // якщо нажатий ел є табом, то:
//         if (target == item) {
//           // скриваєм усе
//           hideTabContent();
//           // а потім показуєм вказаний номер
//           showTabContent(i);
//         }
//       });
//     }
//   });

//   //   2 модальне вікно

//   const btnTrigerModal = document.querySelectorAll("[data-modal]");
//   const modalWindow = document.querySelector(".modal");
//   const closeModalBtn = document.querySelector("[data-close]");

//   function openModal() {
//     modalWindow.classList.add("show");
//     modalWindow.classList.remove("hide");
//     document.body.style.overflow = "hidden";
//     //  очищуєм таймер
//     clearInterval(modalTimer);
//   }

//   function closeModal() {
//     modalWindow.classList.add("hide");
//     modalWindow.classList.remove("show");
//     document.body.style.overflow = "";
//   }

//   btnTrigerModal.forEach((btn) => {
//     btn.addEventListener("click", openModal);
//   });

//   closeModalBtn.addEventListener("click", closeModal);

//   // модальне вікно на ввесь екран (окрім вводу), тому при клікові коло нього закриваю його
//   modalWindow.addEventListener("click", (e) => {
//     if (e.target === modalWindow) {
//       closeModal();
//     }
//   });
//   // при esc
//   document.addEventListener("keydown", (e) => {
//     if (e.code === "Escape" && modalWindow.classList.contains("show")) {
//       closeModal();
//     }
//   });

//   // відкриття модального вікна автоматично ()
//   const modalTimer = setTimeout(openModal, 5000);

//   // якщо прокручена частина (к-сть прокручених пікселів) + видима частина (без прокрутки) (те що ми прорутили і наразі бачим) >= повної прокрутки (все, що є)
//   function showModalByScroll() {
//     if (
//       window.pageYOffset + document.documentElement.clientHeight >=
//       document.documentElement.scrollHeight - 1 )
// 		{
//       openModal();
// 		// скидаю подію, щоб вона не повторювалась
// 		window.removeEventListener("scroll", showModalByScroll);
//     }
//   }

//   window.addEventListener("scroll", showModalByScroll);

// });
//
//
//
//
//
// 									Чистовик

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

  //   									2 Модальні вікна

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

  //   							3 Модальні вікна таймер

  const timerModal = setTimeout(openModal, 10000);

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
});
