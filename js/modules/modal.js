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
export default modal;

// щоб не було помилок (експортую в форми)
export { openModal };
export { hideModal };
