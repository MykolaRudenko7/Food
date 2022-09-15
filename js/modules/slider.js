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

// module.exports = slider;
export default slider;
