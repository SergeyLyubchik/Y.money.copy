const slides = document.querySelectorAll('.slider__slide'),
      prev = document.querySelector('.slider__prev-button'),
      next = document.querySelector('.slider__next-button'),
      slidesWrapper = document.querySelector('.slider__wrapper'),
      slidesField = document.querySelector('.slider__inner'),
      width = window.getComputedStyle(slidesWrapper).width;

      let offset = 0;

slidesField.style.width = 100 * slides.length + "5";
slidesField.style.display = "flex";
slidesField.style.transition = "0.5s all";

slidesField.style.width = 100 * slides.length + "px";
slides.forEach(slide => {
    slide.style.width = width;
});

next.addEventListener('click', () => {
    if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
        offset = 0; 
    } else {
        offset += +width.replace(/\D/g, '');
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = +width.replace(/\D/g, '') * (slides.length - 1);
    } else {
        offset -= +width.replace(/\D/g, '');
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
});


//changeTouches
//targetTouches
//touches