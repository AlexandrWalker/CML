(() => {
  document.addEventListener('DOMContentLoaded', () => {
    /**
     * Инициализация слайдеров swiper
     */
    var hero__slider = new Swiper(".hero__slider-init", {
      slidesPerView: 1,
      centeredSlides: true,
      loop: false,
      init: false,
      speed: 600,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    hero__slider.on("slideChange afterInit init", function () {
      let currentSlide = this.activeIndex + 1;
      document.querySelector('.fraction').innerHTML = `
      <span class="fraction-current">
      ${currentSlide < 10 ? currentSlide : currentSlide}
      </span> 
      / 
      <span class="fraction-total">
        ${this.slides.length}
      </span>`;
    });

    hero__slider.init();


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



    // var work__items = new Swiper(".work__items", {
    //   slidesPerView: 'auto',
    //   spaceBetween: 0,
    //   slidesPerGroup: 1,
    //   speed: 600,
    //   mousewheel: {
    //     forceToAxis: true,
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

    // let children = [
    //   {
    //     label: 'Россия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Нигерия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Новая Зеландия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Папуа — Новая Гвинея',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Чили',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: ' Бахрейн',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Нигер',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Норвегия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: ' Маврикий',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Мальта',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Перу',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Сьерра-Леоне',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Непал',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Бруней',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Ангола',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Гана',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Сирия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Доминиканка',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Мадагаскар',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Ливия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Венесуэла,',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Ливан',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Кипр Иордания',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Филиппины',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Панама',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Эфиопия',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: ' Лаос',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Гватемала',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Уругвай',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Ирландия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Гвинея',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Ливия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Танзания',
    //     url: '/',
    //     target: '_top'
    //   },
    //   {
    //     label: 'Камерун',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Кувейт',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Швеция',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Австрия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Дания',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Кения',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Шри-Ланка',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Кот-д’Ивуар',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Аргентина',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Австралия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Йемен',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Бангладеш',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Бельгия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Эквадор',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Катар',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Нидерланды',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Швейцария',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Марокко',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Португалия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Венгрия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Бразилия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Сингапур',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: ' Словакия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Тунис',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Греция',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Болгария',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Словения',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Саудовская Аравия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Сербия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Мьянма',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Мексика',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Камбоджа',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Канада',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Испания',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Чехия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'США',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Оман',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Германия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Франция',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Латвия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Италия',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Тунис',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Литва',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Великобритания',
    //     url: '/',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Эстония',
    //     url: '/',
    //     target: '_top',
    //   },
    // ];

    // let settings = {
    //   children: children,
    //   width: 1660,
    //   height: 515,
    //   radius: '100%',
    //   radiusMin: 100,
    //   isDrawSvgBg: true,
    //   svgBgColor: 'transparent',
    //   opacityOver: 1.0,
    //   opacityOut: 0.3,
    //   opacitySpeed: 6,
    //   fov: 800,
    //   speed: 0.1,
    //   fontFamily: 'inherit, sans-serif',
    //   fontSize: '20',
    //   fontColor: 'var(--primary-black)',
    //   fontWeight: '800', //bold
    //   fontStyle: 'normal', //italic
    //   fontStretch: 'narrower', //wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    //   fontToUpperCase: true,
    //   animatingSpeed: 0.01,
    //   animatingRadiusLimit: 1.3,
    // };

    // new SVG3DTagCloud(document.getElementById('textcloud1'), settings).build();



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

    // const test = document.querySelectorAll(".work__item");

    // test.addEventListener( "mouseover", (event) => {
    //     // highlight the mouseover target
    //     event.target.classList.toggle('work__item-active');

    //     // reset the color after a short delay
    //     setTimeout(() => {
    //       event.target.style.color = "";
    //     }, 500);
    //   },
    //   false,
    // );



    /**
 * Управляет переключением вкладок на странице.
 * Добавляет и удаляет классы активности для кнопок и панелей вкладок.
 * Поддерживает вложенные табы любой глубины и сохраняет активное состояние у вложенных табов при переключении внешних.
 */
    function tabsFunc() {
      document.querySelectorAll('.tabs').forEach((tabsContainer) => {
        tabsContainer.addEventListener('click', (event) => {
          const tabsBtn = event.target.closest('.tabs__btn');
          if (!tabsBtn || !tabsContainer.contains(tabsBtn)) return;

          // Останавливаем всплытие, чтобы вложенные табы не влияли на родительские
          event.stopPropagation();

          // Ищем ближайший контейнер, к которому принадлежит нажатая кнопка
          const currentTabsContainer = tabsBtn.closest('.tabs');
          if (!currentTabsContainer) return;

          // Сбрасываем активные состояния кнопок и панелей только внутри текущего уровня
          const tabsBtns = Array.from(currentTabsContainer.querySelectorAll('.tabs__btn'));
          const tabsPanels = Array.from(currentTabsContainer.querySelectorAll('.tabs__panel'));

          tabsBtns.forEach((btn) => {
            if (btn.closest('.tabs') === currentTabsContainer) {
              btn.classList.remove('tabs__btn--active');
            }
          });

          tabsPanels.forEach((panel) => {
            if (panel.closest('.tabs') === currentTabsContainer) {
              panel.classList.remove('tabs__panel--active');
            }
          });

          // Устанавливаем активное состояние для выбранной вкладки
          tabsBtn.classList.add('tabs__btn--active');
          const targetPanel = currentTabsContainer.querySelector(
            `.tabs__panel[data-tab="${tabsBtn.dataset.tab}"]`,
          );
          if (targetPanel) {
            /* HACK */
            targetPanel.classList.add('tabs__panel--active');
          }
        });
      });
    };

    tabsFunc();



    var workItem = document.querySelectorAll('.work__item'),
      workActive = document.getElementsByClassName('work__item-active');

    Array.from(workItem).forEach(function (item, i, workItem) {
      item.addEventListener('mouseover', function (e) {
        if (workActive.length > 0 && workActive[0] !== this) {
          workActive[0].classList.remove('work__item-active');
        }
        this.classList.add('work__item-active');
      });
    });



    const case__acc = document.querySelectorAll('.case__acc');

    if (case__acc) {
      window.addEventListener('resize', function (event) {
        if (window.innerWidth < 769) {
          for (let i = 0; i < case__acc.length; i++) {
            case__acc[i].classList.add('accordion');
            case__acc[i].classList.remove('tabs__panel');
          }
        } else {
          for (let i = 0; i < case__acc.length; i++) {
            case__acc[i].classList.remove('accordion');
            case__acc[i].classList.add('tabs__panel');
          }
        }
      }, true);
    }



    document.getElementById('warning-btn').addEventListener('click', event => {
      document.getElementById('warning-plate').style.display = 'none';
    });

    gsap.registerPlugin(ScrollTrigger, TweenLite, TweenMax);

    function scrolled1() {
      $(function () {
        $('.numberFraction').each(function () {
          $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
          }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
              $(this).text(now.toFixed(1));
            }
          });
        });
      });
    }

    function scrolled2() {
      $(function () {
        $('.number').each(function () {
          $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
          }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
          });
        });
      });
    }

    function scrolled3() {
      $(function () {
        $('.numberPartner').each(function () {
          $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
          }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
          });
        });
      });
    }

    ScrollTrigger.create({
      trigger: '.about__feat',
      onEnter: scrolled2,
    });

    ScrollTrigger.create({
      trigger: '.about__feat',
      onEnter: scrolled1,
    });

    ScrollTrigger.create({
      trigger: '.partner__head',
      onEnter: scrolled3,
    });

    Splitting();


    // function asdd(asd) {
    //   const asdTitle = asd.querySelector('.section__title');
    //   Splitting(asdTitle)
    // }

    function asdd() {
      const char = document.querySelectorAll('.char');
      char.forEach(element => {
        element.classList.add('animate');
      });
    }

    ScrollTrigger.create({
      trigger: '.section__head',
      onEnter: asdd(),
      // onEnter: asdd(asd),
    });



    // gsap.to('.about__feat', {
    //   scrollTrigger: {
    //     trigger: '.about__feat',
    //     start: 'top top',
    //     // scrub: true,
    //     // end: 'bottom bottom',
    //     // toggleClass: 'active',
    //   },
    //   onStart: () => scrolled1(),
    //   // onComplete: () => removeClass(items[0]),
    // });

    // gsap.to('.partner__head-count', {
    //   scrollTrigger: {
    //     trigger: '.partner__head-count',
    //     start: 'top top',
    //   },
    //   onStart: () => scrolled2(),
    // });


    // ScrollTrigger.create({
    //   trigger: 'titleTarget',
    //   start: 'top top',
    //   end: 'bottom bottom',
    //   onToggle: (self) => console.log('toggled, isActive:', self.isActive),
    //   onUpdate: (self) => {
    //     console.log(
    //       'progress:',
    //       self.progress.toFixed(3),
    //       'direction:',
    //       self.direction,
    //       'velocity',
    //       self.getVelocity()
    //     );
    //   }
    // });



    // function counter() {
    //   const items = document.querySelectorAll(".number");

    //   for (let i = 0; i < items.length; i++) {
    //     var Cont = { val: 0 },
    //       NewVal = items[i].textContent;

    //     console.log(items[i].textContent);

    //     TweenLite.to(Cont, 2, {
    //       val: NewVal,
    //       roundProps: "val",
    //       onUpdate: function () {
    //         items[i].innerHTML = Cont.val;
    //         console.log();
    //       }
    //     });
    //   }
    // }



    // counter();



    // const items = document.querySelector(".numberFirst");

    // gsap.from(items, {
    //   innerText: 0,
    //   duration: 5,
    //   snap: {
    //     innerText: 1,
    //   },
    // });



  });
})();