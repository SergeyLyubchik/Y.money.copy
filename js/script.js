window.addEventListener('DOMContentLoaded', function() { 
       
        const   slides = document.querySelectorAll('.slider__slide'),
                prev = document.querySelector('.slider__prev-button img'),
                next = document.querySelector('.slider__next-button img'),
                slidesWrapper = document.querySelector('.slider__wrapper'),
                slidesField = document.querySelector('.slider__inner'),
                width = getComputedStyle(slidesWrapper).width;

        let     slideIndex = 0,
                posInit = 0,
                posX1 = 0,
                posX2 = 0,
                posFinal = 0,
                posThreshold = width * 0.35,
                trfRegExp = /[-0-9.]+(?=px)/,
                slide = function() {
                    slidesField.style.transition = 'transform 0.5s';
                    slidesField.style.transform = `translateX(-${slideIndex * width}px)`;      
                },
                getEvent = function() {
                    return event.type.search('touch') !== -1 ? event.touches[0] : event;                    
                },
                swipeStart = function() {
                    let evt = getEvent();                                      
                    posInit = posX1 = evt.clientX;                  
                    
                    slidesField.style.transition = '';
                  
                    document.addEventListener('touchmove', swipeAction);
                    document.addEventListener('touchend', swipeEnd);
                    document.addEventListener('mousemove', swipeAction);
                    document.addEventListener('mouseup', swipeEnd);
                  },
                swipeAction = function() {
                  let evt = getEvent(),
                    style = slidesField.style.transform,
                    transform = +style.match(trfRegExp)[0];
                  
                    posX2 = posX1 - evt.clientX;
                    posX1 = evt.clientX;
                  
                    slidesField.style.transform = `translateX(${transform - posX2}px)`;                    
                },
                swipeEnd = function() {    
                    posFinal = posInit - posX1;                  
                    document.removeEventListener('touchmove', swipeAction);
                    document.removeEventListener('mousemove', swipeAction);
                    document.removeEventListener('touchend', swipeEnd);
                    document.removeEventListener('mouseup', swipeEnd);                
                    
                    if (Math.abs(posFinal) > posThreshold) {
                      if (posInit < posX1) {
                        slideIndex--;                      
                      } else if (posInit > posX1) {
                        slideIndex++;
                      }
                    }                  
                    if (posInit !== posX1) {
                      slide();
                    }
                  
                };   


        slidesField.style.transform = 'translateX(0px)';

        slidesWrapper.addEventListener('touchstart', swipeStart);
        slidesWrapper.addEventListener('mousedown', swipeStart);  
                        
        let offset = 0;   

        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
        
        slides.forEach(slide => {
            slide.style.width = width;
        });
     

        next.addEventListener('click', () => {
            if(offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +width.replace(/\D/g, '');
            }

            slidesField.style.transform = `translateX(-${offset}px)`;
        });

        prev.addEventListener('click', () => {
            if(offset == 0) {
                
                offset = +width.replace(/\D/g, '') * (slides.length - 1);
            } else {
                offset -= +width.replace(/\D/g, '');
            }

            slidesField.style.transform = `translateX(-${offset}px)`;
        });
});