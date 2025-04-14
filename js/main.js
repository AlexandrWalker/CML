(() => {
  document.addEventListener('DOMContentLoaded', () => {
    /**
     * Инициализация слайдеров swiper
     */
    var hero__slider = new Swiper(".hero__slider-init", {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      // init: false,
      speed: 600,
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false
      // },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
    });

    // hero__slider.on("slideChange afterInit init", function () {
    //   let currentSlide = this.activeIndex + 1;
    //   document.querySelector('.swiper-fraction').innerHTML = `
    //   <span class="swiper-fraction-current">
    //   ${currentSlide < 10 ? currentSlide : currentSlide}
    //   </span> 
    //   / 
    //   <span class="swiper-fraction-total">
    //     ${this.slides.length}
    //   </span>`;
    // });

    // hero__slider.init();


    /* trash */
    // const swiper = new Swiper('.swiper', {
    //   //...
    //   pagination: {
    //     //...
    //     renderFraction: function (currentClass, totalClass) {
    //       return '<span class="' + currentClass + '"></span>' +
    //               ' of ' +
    //               '<span class="' + totalClass + '"></span>';
    //     },
    //   },
    // });


    /**
     * Инициализация аккордеона
     */
    function accordionFunc() {
      var accordionHead = document.querySelectorAll('.accordion'),
        accordionActive = document.getElementsByClassName('active');

      Array.from(accordionHead).forEach(function (accordionItem, i, accordionHead) {
        accordionItem.addEventListener('click', function (e) {
          if (this.parentNode.dataset.skip) {
            this.classList.toggle('active');
            return;
          }

          if (accordionActive.length > 0 && accordionActive[0] !== this) {
            accordionActive[0].classList.remove('active');
          }
          this.classList.toggle('active');
        });
      });
    }

    accordionFunc();



    /**
     * Инициализация Lenis для плавного скрола
     */
    const lenis = new Lenis({
      anchors: {
        offset: 100,
        onComplete: () => {
          console.log('scrolled to anchor')
        }
      }
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);



    /**
     * Управляет поведением меню-бургера.
     */
    function burgerNav() {
      const burger = document.getElementById('burger');
      const menu = document.getElementById('mobile-menu');
      const closeButton = document.querySelector('.menu__close');
      const overlay = document.querySelector('.menu__overlay');
      const elements = document.querySelectorAll('.menu__list-link');
      const head = document.querySelector('.head');
      /**
       * Переключает видимость меню.
       */
      const toggleMenu = () => {
        const isOpened = burger.classList.toggle('burger--opened');
        menu.classList.toggle('mobile-menu--opened', isOpened);
        document.body.classList.toggle('no-scroll');
        head.classList.toggle('head--active');
      };
      /**
       * Закрывает меню.
       */
      const closeMenu = () => {
        burger.classList.remove('burger--opened');
        menu.classList.remove('mobile-menu--opened');
        document.body.classList.remove('no-scroll');
      };
      // Открытие/закрытие меню по клику на бургер
      burger.addEventListener('click', toggleMenu);

      [closeButton, overlay].forEach((element) => element.addEventListener('click', closeMenu));
      // Закрытие меню при клике вне области меню и бургера
      document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !burger.contains(event.target)) {
          closeMenu();
        }
      });
      // Закрытие меню по клику на пункты меню
      elements.forEach((element) => element.addEventListener('click', closeMenu));
    };

    burgerNav();



    /**
     * Установка dropdown
     */
    if (document.querySelectorAll('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
        const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
        const dropDownBtnText = dropDownWrapper.querySelector('.dropdown__button-text');
        const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
        const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
        const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

        dropDownBtn.addEventListener('click', function (e) {
          dropDownList.classList.toggle('dropdown__list--visible');
          this.classList.add('dropdown__button--active');
        });

        dropDownListItems.forEach(function (listItem) {
          listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            dropDownBtnText.innerHTML = this.innerHTML;
            dropDownBtn.dataset.value = this.dataset.value;
            dropDownBtn.focus();
            dropDownBtn.click();
            dropDownInput.value = this.dataset.value;
            dropDownList.classList.remove('dropdown__list--visible');
          });
        });

        document.addEventListener('click', function (e) {
          if (e.target !== dropDownBtn) {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
          }
        });

        document.addEventListener('keydown', function (e) {
          if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
          }
        });
      });
    }

    let children1 = [
      {
        label: 'Россия',
        url: '/',
        target: '_top',
      },
    ]

    let children2 = [
      {
        label: 'Россия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Нигерия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Новая Зеландия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Папуа — Новая Гвинея',
        url: '/',
        target: '_top',
      },
      {
        label: 'Чили',
        url: '/',
        target: '_top'
      },
      {
        label: ' Бахрейн',
        url: '/',
        target: '_top'
      },
      {
        label: 'Нигер',
        url: '/',
        target: '_top'
      },
      {
        label: 'Норвегия',
        url: '/',
        target: '_top',
      },
      {
        label: ' Маврикий',
        url: '/',
        target: '_top'
      },
      {
        label: 'Мальта',
        url: '/',
        target: '_top'
      },
      {
        label: 'Перу',
        url: '/',
        target: '_top'
      },
      {
        label: 'Сьерра-Леоне',
        url: '/',
        target: '_top'
      },
      {
        label: 'Непал',
        url: '/',
        target: '_top',
      },
      {
        label: 'Бруней',
        url: '/',
        target: '_top',
      },
      {
        label: 'Ангола',
        url: '/',
        target: '_top',
      },
      {
        label: 'Гана',
        url: '/',
        target: '_top'
      },
      {
        label: 'Сирия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Доминиканка',
        url: '/',
        target: '_top',
      },
      {
        label: 'Мадагаскар',
        url: '/',
        target: '_top',
      },
      {
        label: 'Ливия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Венесуэла,',
        url: '/',
        target: '_top',
      },
      {
        label: 'Ливан',
        url: '/',
        target: '_top'
      },
      {
        label: 'Кипр Иордания',
        url: '/',
        target: '_top'
      },
      {
        label: 'Филиппины',
        url: '/',
        target: '_top'
      },
      {
        label: 'Панама',
        url: '/',
        target: '_top',
      },
      {
        label: 'Эфиопия',
        url: '/',
        target: '_top'
      },
      {
        label: ' Лаос',
        url: '/',
        target: '_top'
      },
      {
        label: 'Гватемала',
        url: '/',
        target: '_top'
      },
      {
        label: 'Уругвай',
        url: '/',
        target: '_top'
      },
      {
        label: 'Ирландия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Гвинея',
        url: '/',
        target: '_top',
      },
      {
        label: 'Ливия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Танзания',
        url: '/',
        target: '_top'
      },
      {
        label: 'Камерун',
        url: '/',
        target: '_top',
      },
      {
        label: 'Кувейт',
        url: '/',
        target: '_top',
      },
      {
        label: 'Швеция',
        url: '/',
        target: '_top',
      },
      {
        label: 'Австрия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Дания',
        url: '/',
        target: '_top',
      },
      {
        label: 'Кения',
        url: '/',
        target: '_top',
      },
      {
        label: 'Шри-Ланка',
        url: '/',
        target: '_top',
      },
      {
        label: 'Кот-д’Ивуар',
        url: '/',
        target: '_top',
      },
      {
        label: 'Аргентина',
        url: '/',
        target: '_top',
      },
      {
        label: 'Австралия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Йемен',
        url: '/',
        target: '_top',
      },
      {
        label: 'Бангладеш',
        url: '/',
        target: '_top',
      },
      {
        label: 'Бельгия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Эквадор',
        url: '/',
        target: '_top',
      },
      {
        label: 'Катар',
        url: '/',
        target: '_top',
      },
      {
        label: 'Нидерланды',
        url: '/',
        target: '_top',
      },
      {
        label: 'Швейцария',
        url: '/',
        target: '_top',
      },
      {
        label: 'Марокко',
        url: '/',
        target: '_top',
      },
      {
        label: 'Португалия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Венгрия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Бразилия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Сингапур',
        url: '/',
        target: '_top',
      },
      {
        label: ' Словакия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Тунис',
        url: '/',
        target: '_top',
      },
      {
        label: 'Греция',
        url: '/',
        target: '_top',
      },
      {
        label: 'Болгария',
        url: '/',
        target: '_top',
      },
      {
        label: 'Словения',
        url: '/',
        target: '_top',
      },
      {
        label: 'Саудовская Аравия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Сербия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Мьянма',
        url: '/',
        target: '_top',
      },
      {
        label: 'Мексика',
        url: '/',
        target: '_top',
      },
      {
        label: 'Камбоджа',
        url: '/',
        target: '_top',
      },
      {
        label: 'Канада',
        url: '/',
        target: '_top',
      },
      {
        label: 'Испания',
        url: '/',
        target: '_top',
      },
      {
        label: 'Чехия',
        url: '/',
        target: '_top',
      },
      {
        label: 'США',
        url: '/',
        target: '_top',
      },
      {
        label: 'Оман',
        url: '/',
        target: '_top',
      },
      {
        label: 'Германия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Франция',
        url: '/',
        target: '_top',
      },
      {
        label: 'Латвия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Италия',
        url: '/',
        target: '_top',
      },
      {
        label: 'Тунис',
        url: '/',
        target: '_top',
      },
      {
        label: 'Литва',
        url: '/',
        target: '_top',
      },
      {
        label: 'Великобритания',
        url: '/',
        target: '_top',
      },
      {
        label: 'Эстония',
        url: '/',
        target: '_top',
      },
    ];

    let settings1 = {
      children: children1,
      width: '100%',
      height: 515,
      radius: '75%',
      radiusMin: 75,
      isDrawSvgBg: true,
      svgBgColor: 'transparent',
      opacityOver: 1.0,
      opacityOut: 0.3,
      opacitySpeed: 6,
      fov: 800,
      speed: 0.1,
      fontFamily: 'inherit, sans-serif',
      fontSize: '20',
      fontColor: 'var(--primary-black)',
      fontWeight: '800', //bold
      fontStyle: 'normal', //italic
      fontStretch: 'narrower', //wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
      fontToUpperCase: true,
      animatingSpeed: 0.01,
      animatingRadiusLimit: 1.3,
    };

    let settings2 = {
      children: children2,
      width: 1660,
      height: 515,
      radius: '100%',
      radiusMin: 100,
      isDrawSvgBg: true,
      svgBgColor: 'transparent',
      opacityOver: 1.0,
      opacityOut: 0.3,
      opacitySpeed: 6,
      fov: 800,
      speed: 0.1,
      fontFamily: 'inherit, sans-serif',
      fontSize: '20',
      fontColor: 'var(--primary-black)',
      fontWeight: '800', //bold
      fontStyle: 'normal', //italic
      fontStretch: 'narrower', //wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
      fontToUpperCase: true,
      animatingSpeed: 0.01,
      animatingRadiusLimit: 1.3,
    };

    new SVG3DTagCloud(document.getElementById('textcloud1'), settings1).build();

    new SVG3DTagCloud(document.getElementById('textcloud2'), settings2).build();



    /**
         * Активация любого количества модальных окон
         */
    function modalFunc() {
      var modal__btn = document.querySelector('.modal__btn');

      if (!modal__btn) {
        return;
      } else {

        var close = document.querySelectorAll('.modal__close-btn');
        var openBtn = document.querySelectorAll('.modal__btn');

        Array.from(openBtn, openButton => {
          openButton.addEventListener('click', e => {

            let open = document.getElementsByClassName('open');

            if (open.length > 0 && open[0] !== this) {
              open[0].classList.remove('open');
            }

            let modalId = e.target.getAttribute('data-id');
            if (modalId) {
              document.getElementById(modalId).classList.add('open');
            } else {
              return
            }

            let modalTitle = e.target.getAttribute('data-title');
            if (modalTitle) {
              document.getElementById("modal-title").innerHTML = modalTitle;
            }

            let modalText = e.target.getAttribute('data-text');
            if (modalText) {
              document.getElementById("modal-text").innerHTML = modalText;
            }

            Array.from(close, closeButton => {
              closeButton.addEventListener('click', e => {
                document.getElementById(modalId).classList.remove("open");
              });

              window.addEventListener('keydown', (e) => {
                if (e.key === "Escape") {
                  document.getElementById(modalId).classList.remove("open")
                }
              });

              document.querySelector(".modal.open .modal__box").addEventListener('click', event => {
                event._isClickWithInModal = true;
              });

              document.getElementById(modalId).addEventListener('click', event => {
                if (event._isClickWithInModal) return;
                event.currentTarget.classList.remove('open');
              });
            });
          });
        });
      }
    };

    modalFunc();


    addEventListener('scroll', function () {
      const scrollPosition = window.scrollY;
      const head = this.document.querySelector('.head');

      if (scrollPosition > 0 && scrollPosition !== 0) {
        head.classList.add('fixed');
      } else {
        head.classList.remove('fixed');
      }
    });

  });
})();