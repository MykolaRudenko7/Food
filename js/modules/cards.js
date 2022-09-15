import { posrData, getResourse } from "../services/services";
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
  getResourse("http://localhost:3000/menu")
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
export default cards;
