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
export default calculator;
