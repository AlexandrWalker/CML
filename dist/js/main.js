(() => {
  document.addEventListener('DOMContentLoaded', () => {
    /**
     * Инициализация слайдеров swiper
     */
    var hero__slider = new Swiper(".hero__slider-init", {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      init: false,
      speed: 600,
      effect: "fade",
      autoplay: {
        delay: 8000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var work__items = new Swiper(".work__items", {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      speed: 600,
      breakpoints: {
        600: {
          slidesPerView: 6,
        }
      }
    });

    hero__slider.on("slideChange afterInit init", function () {

      let currentSlide = this.realIndex + 1;

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
        offset: -150,
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
      const toggleMenu = (e) => {
        e.stopPropagation();
        const isOpened = burger.classList.toggle('burger--opened');
        menu.classList.toggle('mobile-menu--opened', isOpened);
        head.classList.toggle('head--active');
        lenis.stop();
      };

      /**
       * Закрывает меню.
       */
      const closeMenu = () => {
        burger.classList.remove('burger--opened');
        menu.classList.remove('mobile-menu--opened');
        lenis.start();
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



    var headerItem = document.querySelectorAll('.header__btn'),
      headerActive = document.getElementsByClassName('header__btn-active');

    if (headerItem) {
      Array.from(headerItem).forEach(function (hItem, i, headerItem) {
        hItem.addEventListener('click', function (e) {
          if (headerActive.length > 0 && headerActive[0] !== this) {
            headerActive[0].classList.remove('header__btn-active');
            document.querySelector('.menu__body').classList.remove('down');
          }
          this.classList.toggle('header__btn-active');
          document.querySelector('.menu__body').classList.toggle('down');

        });

      });
    }



    document.getElementById('warning-btn').addEventListener('click', event => {
      document.getElementById('warning-plate').style.display = 'none';
    });



    gsap.registerPlugin(ScrollTrigger);

    function scrolled1() {
      $(function () {
        $('.numberFraction').each(function () {
          $(this).prop('Counter', 0).animate({
            Counter: $(this).data('value')
          }, {
            duration: 2000,
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
            Counter: $(this).data('value')
          }, {
            duration: 2000,
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
            Counter: $(this).data('value')
          }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
          });
        });
      });
    }



    ScrollTrigger.create({
      trigger: '.about',
      onEnter: scrolled1,
      toggleActions: "play none none none",
      onLeave: () => document.querySelector('.numberFraction').classList.remove("numberFraction")
    });


    ScrollTrigger.create({
      trigger: '.about',
      onEnter: scrolled2,
      toggleActions: "play none none none",
      onLeave: () => {
        document.querySelectorAll('.number').forEach(element => {
          element.innerText = document.querySelector('.number').dataset.value;
          element.classList.remove("number")
        });
      },
    });

    ScrollTrigger.create({
      trigger: '.partner__head',
      onEnter: scrolled3,
      toggleActions: "play none none none",
      onLeave: () => {
        document.querySelector('.numberPartner').innerText = document.querySelector('.numberPartner').dataset.value;
        document.querySelector('.numberPartner').classList.remove("numberPartner");
      },
    });



    const faqItems = document.querySelectorAll(".faq__item");
    const serviceItems = document.querySelectorAll(".service__item");
    const calcItems = document.querySelectorAll(".calc__block");
    const aboutItem = document.querySelector(".about__img");
    const bannerItem = document.querySelector(".banner");

    for (let i = 0; i < faqItems.length; i++) {
      gsap.from(faqItems[i], {
        opacity: 0,
        x: -50,
        duration: 0.3,
        scrollTrigger: {
          trigger: faqItems[i],
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      }); 3.
    }

    for (let i = 0; i < serviceItems.length; i++) {
      gsap.from(serviceItems[i], {
        opacity: 0,
        x: -50,
        duration: 0.3,
        scrollTrigger: {
          trigger: serviceItems[i],
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      });
    }

    for (let i = 0; i < calcItems.length; i++) {
      gsap.from(calcItems[i], {
        opacity: 0,
        y: 50,
        duration: 0.3,
        scrollTrigger: {
          trigger: calcItems[i],
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      });
    }

    gsap.from(aboutItem, {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: aboutItem,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      }
    });

    gsap.from(bannerItem, {
      opacity: 0,
      y: 50,
      duration: 0.3,
      scrollTrigger: {
        trigger: bannerItem,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      }
    });

    const head = this.document.querySelector('.head');
    const h = document.getElementById('first-section').offsetHeight;
    const plate = document.getElementById('plate');
    const classToAdd = 'show';

    window.addEventListener('scroll', function () {
      const verticalScrollPosition = 0;
      const scrollPosition = window.scrollY;

      if (scrollPosition !== verticalScrollPosition) {
        plate.classList.remove(classToAdd);
      }
    });

    window.addEventListener('scroll', debounce(function () {
      const verticalScrollPosition = window.pageYOffset;
      const isActive = plate.classList.contains(classToAdd);

      if (verticalScrollPosition > 0 && verticalScrollPosition !== 0) {
        head.classList.add('fixed');
      } else {
        head.classList.remove('fixed');
      }

      if (verticalScrollPosition > h && !isActive) {
        plate.classList.add(classToAdd);
      } else {
        plate.classList.remove(classToAdd);
      }
    }, 100));

    function debounce(func, delay) {
      let timer;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          func.apply(context, args);
        }, delay);
      }
    }



    const titleItems = document.querySelectorAll(".section__head");
    const target = document.querySelectorAll('.section__title');

    for (let i = 0; i < target.length; i++) {

      const text = new SplitType(target[i], { types: 'lines, words' })

      gsap.from(text.words, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        stagger: { amount: 0.2 },
        scrollTrigger: {
          trigger: titleItems[i],
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      })
    }



    // const itemsContainer = document.querySelector('.work__items');
    // const items = document.querySelectorAll('.work__item');
    // const itemsActive = document.getElementsByClassName('work__item-active');

    // function scrollItems() {

    //   const containerRect = itemsContainer.getBoundingClientRect();
    //   const containerCenter = containerRect.left + containerRect.width / 2;
    //   const scrollRight = itemsContainer.scrollLeft + containerRect.width;

    //   const isEndPos = Math.abs(scrollRight - itemsContainer.scrollWidth) < 1;
    //   const isStartPos = itemsContainer.scrollLeft < 1;

    //   if (isStartPos) {
    //     items.forEach(item => item.classList.remove('work__item-active'));
    //     items[0].classList.add('work__item-active');
    //   } else if (isEndPos) {
    //     items.forEach(item => item.classList.remove('work__item-active'));
    //     items[items.length - 1].classList.add('work__item-active');
    //   } else {

    //     let closestItem = null;
    //     let minimalPos = Infinity;

    //     items.forEach(item => {

    //       const itemRect = item.getBoundingClientRect();
    //       const itemCenter = itemRect.left + itemRect.width / 2;
    //       const itemPos = Math.abs(itemCenter - containerCenter);

    //       if (itemPos < minimalPos) {
    //         minimalPos = itemPos;
    //         closestItem = item;
    //       }

    //       item.classList.remove('work__item-active');
    //     });

    //     if (closestItem) {
    //       closestItem.classList.add('work__item-active');
    //     }
    //   }
    // }

    const items = document.querySelectorAll('.work__slide');
    const itemsActive = document.getElementsByClassName('work__slide-active');

    items.forEach(element => {
      if (element !== items[0]) {
        element.addEventListener('mouseover', function () {
          if (itemsActive.length > 0 && itemsActive[0] !== this) {
            itemsActive[0].classList.remove('work__slide-active');
          }
          this.classList.add('work__slide-active');

        });
        element.addEventListener('mouseout', function () {
          items[0].classList.add('work__slide-active');
          this.classList.remove('work__slide-active');
        });
      }
    });



    const case__acc = document.querySelectorAll('.case__acc');
    const tabsPanelActive = document.querySelector('.tabs__panel--active');
    const tabsPanelFirst = document.querySelector('.tabs__panel--first');

    if (case__acc) {
      window.addEventListener('resize', function (event) {
        if (window.innerWidth < 769 && window.innerWidth !== 769) {

          case__acc[0].classList.add('active');

          for (let i = 0; i < case__acc.length; i++) {
            case__acc[i].classList.add('accordion');
            case__acc[i].classList.remove('tabs__panel');
            if (tabsPanelFirst) {
              tabsPanelFirst.classList.remove('tabs__panel--active');
            }
          }

        } else {

          for (let i = 0; i < case__acc.length; i++) {
            case__acc[i].classList.remove('accordion');
            case__acc[i].classList.add('tabs__panel');
            if (tabsPanelFirst) {
              tabsPanelFirst.classList.add('tabs__panel--active');
            }
          }

        }
      }, true);
    }

    // if (window.innerWidth < 769 && window.innerWidth !== 769) {
    //   itemsContainer.addEventListener('scroll', scrollItems);
    // }
    // const workItems = document.querySelector(".work__items")
    // const workItem = document.querySelector(".work__item")
    // const workWrapper = document.querySelector(".work-wrapper")

    // if (workItems) {
    //   if (window.innerWidth < 769 && window.innerWidth !== 769) {
    //     workWrapper.innerHTML = `<div class="swiper-slide"></div>`;
    //   }
    // }



    /* Квиз */
    (function (w, d, s, o) {
      var j = d.createElement(s); j.async = true; j.src = '//script.marquiz.ru/v2.js'; j.onload = function () {
        if (document.readyState !== 'loading') Marquiz.init(o);
        else document.addEventListener("DOMContentLoaded", function () {
          Marquiz.init(o);
        });
      };
      d.head.insertBefore(j, d.head.firstElementChild);
    })(window, document, 'script', {
      host: '//quiz.marquiz.ru',
      region: 'ru',
      id: '6746e81ec17b29002647f133',
      autoOpen: false,
      autoOpenFreq: 'once',
      openOnExit: false,
      disableOnMobile: false
    }
    );



    /* Карта */
    const map = [
      { name: 'Россия', size: 'extraBig', opacity: 1 },
      { name: 'ОАЭ', size: 'big', opacity: 1 },
      { name: 'Турция', size: 'big', opacity: 1 },
      { name: 'Иран', size: 'big', opacity: 1 },
      { name: 'Израиль', size: 'big', opacity: 1 },
      { name: 'Япония', size: 'big', opacity: 1 },
      { name: 'Гонконг', size: 'big', opacity: 1 },
      { name: 'Малайзия', size: 'big', opacity: 1 },
      { name: 'Индонезия', size: 'big', opacity: 1 },
      { name: 'Китай', size: 'big', opacity: 1 },
      { name: 'Индия', size: 'big', opacity: 1 },
      { name: 'ЮАР', size: 'big', opacity: 1 },
      { name: 'Польша', size: 'big', opacity: 1 },
      { name: 'Египет', size: 'big', opacity: 1 },
      { name: 'Таиланд', size: 'big', opacity: 1 },
      { name: 'Вьетнам', size: 'big', opacity: 1 },
      { name: 'Корея', size: 'big', opacity: 1 },
      { name: 'Сербия', size: 'mid', opacity: 0.8 },
      { name: 'Мьянма', size: 'mid', opacity: 0.8 },
      { name: 'Мексика', size: 'mid', opacity: 0.8 },
      { name: 'Камбоджа', size: 'mid', opacity: 0.8 },
      { name: 'Канада', size: 'mid', opacity: 0.8 },
      { name: 'Испания', size: 'mid', opacity: 0.8 },
      { name: 'Чехия', size: 'mid', opacity: 0.8 },
      { name: 'США', size: 'mid', opacity: 0.8 },
      { name: 'Оман', size: 'mid', opacity: 0.8 },
      { name: 'Германия', size: 'mid', opacity: 0.8 },
      { name: 'Франция', size: 'mid', opacity: 0.8 },
      { name: 'Латвия', size: 'mid', opacity: 0.8 },
      { name: 'Италия', size: 'mid', opacity: 0.8 },
      { name: 'Тунис', size: 'mid', opacity: 0.8 },
      { name: 'Литва', size: 'mid', opacity: 0.8 },
      { name: 'Великобритания', size: 'mid', opacity: 0.8 },
      { name: 'Эстония', size: 'mid', opacity: 0.8 },
      { name: 'Швеция', size: 'small', opacity: 0.7 },
      { name: 'Австрия', size: 'small', opacity: 0.7 },
      { name: 'Дания', size: 'small', opacity: 0.7 },
      { name: 'Кения', size: 'small', opacity: 0.7 },
      { name: 'Шри-Ланка', size: 'small', opacity: 0.7 },
      { name: 'Кот-д’Ивуар', size: 'small', opacity: 0.7 },
      { name: 'Аргентина', size: 'small', opacity: 0.7 },
      { name: 'Австралия', size: 'small', opacity: 0.7 },
      { name: 'Йемен', size: 'small', opacity: 0.7 },
      { name: 'Бангладеш', size: 'small', opacity: 0.7 },
      { name: 'Бельгия', size: 'small', opacity: 0.7 },
      { name: 'Эквадор', size: 'small', opacity: 0.7 },
      { name: 'Катар', size: 'small', opacity: 0.7 },
      { name: 'Нидерланды', size: 'small', opacity: 0.7 },
      { name: 'Швейцария', size: 'small', opacity: 0.7 },
      { name: 'Марокко', size: 'small', opacity: 0.7 },
      { name: 'Португалия', size: 'small', opacity: 0.7 },
      { name: 'Венгрия', size: 'small', opacity: 0.7 },
      { name: 'Бразилия', size: 'small', opacity: 0.7 },
      { name: 'Сингапур', size: 'small', opacity: 0.7 },
      { name: 'Словакия', size: 'small', opacity: 0.7 },
      { name: 'Греция', size: 'small', opacity: 0.7 },
      { name: 'Болгария', size: 'small', opacity: 0.7 },
      { name: 'Словения', size: 'small', opacity: 0.7 },
      { name: 'Саудовская Аравия', size: 'small', opacity: 0.7 },
      { name: 'Нигерия', size: 'extraSmall', opacity: 0.5 },
      { name: 'Новая Зеландия', size: 'extraSmall', opacity: 0.5 },
      { name: 'Папуа — Новая Гвинея', size: 'extraSmall', opacity: 0.5 },
      { name: 'Чили', size: 'extraSmall', opacity: 0.5 },
      { name: 'Бахрейн', size: 'extraSmall', opacity: 0.5 },
      { name: 'Нигер', size: 'extraSmall', opacity: 0.5 },
      { name: 'Норвегия', size: 'extraSmall', opacity: 0.5 },
      { name: 'Маврикий', size: 'extraSmall', opacity: 0.5 },
      { name: 'Мальта', size: 'extraSmall', opacity: 0.5 },
      { name: 'Перу', size: 'extraSmall', opacity: 0.5 },
      { name: 'Сьерра-Леоне', size: 'extraSmall', opacity: 0.5 },
      { name: 'Непал', size: 'extraSmall', opacity: 0.5 },
      { name: 'Бруней', size: 'extraSmall', opacity: 0.5 },
      { name: 'Ангола', size: 'extraSmall', opacity: 0.5 },
      { name: 'Гана', size: 'extraSmall', opacity: 0.5 },
      { name: 'Сирия', size: 'extraSmall', opacity: 0.5 },
      { name: 'Доминиканка', size: 'extraSmall', opacity: 0.5 },
      { name: 'Мадагаскар', size: 'extraSmall', opacity: 0.5 },
      { name: 'Ливия', size: 'extraSmall', opacity: 0.5 },
      { name: 'Венесуэла', size: 'extraSmall', opacity: 0.5 },
      { name: 'Ливан', size: 'extraSmall', opacity: 0.5 },
      { name: 'Кипр Иордания', size: 'extraSmall', opacity: 0.5 },
      { name: 'Филиппины', size: 'extraSmall', opacity: 0.5 },
      { name: 'Панама', size: 'extraSmall', opacity: 0.5 },
      { name: 'Эфиопия', size: 'extraSmall', opacity: 0.5 },
      { name: 'Лаос', size: 'extraSmall', opacity: 0.5 },
      { name: 'Гватемала', size: 'extraSmall', opacity: 0.5 },
      { name: 'Уругвай', size: 'extraSmall', opacity: 0.5 },
      { name: 'Ирландия', size: 'extraSmall', opacity: 0.5 },
      { name: 'Гвинея', size: 'extraSmall', opacity: 0.5 },
      { name: 'Танзания', size: 'extraSmall', opacity: 0.5 },
      { name: 'Камерун', size: 'extraSmall', opacity: 0.5 },
      { name: 'Кувейт', size: 'extraSmall', opacity: 0.5 },
    ];

    if (document.getElementById('tagCloud')) {
      // Объект для хранения данных о движении тегов
      const tagMovements = {};

      function createTagCloud() {
        const cloud = document.getElementById('tagCloud');
        cloud.innerHTML = '';

        const cloudWidth = cloud.offsetWidth;
        const cloudHeight = cloud.offsetHeight;

        // Сортируем теги по размеру (от больших к маленьким)
        const sortedTags = [...map].sort((a, b) => {
          const sizes = { 'extraBig': 4, 'big': 3, 'mid': 2, 'small': 1, 'extraSmall': 0 };
          return sizes[b.size] - sizes[a.size];
        });

        // Массив для хранения размещенных тегов
        const placedTags = [];

        // Создаем элементы тегов
        sortedTags.forEach(tag => {
          const tagElement = document.createElement('div');
          tagElement.className = `tag ${tag.size}`;
          tagElement.textContent = tag.name;
          tagElement.style.opacity = tag.opacity;

          // Временно добавляем элемент для измерения его размеров
          tagElement.style.visibility = 'hidden';
          cloud.appendChild(tagElement);

          const tagRect = tagElement.getBoundingClientRect();
          const tagWidth = tagRect.width;
          const tagHeight = tagRect.height;

          cloud.removeChild(tagElement);

          // Пытаемся разместить тег без пересечений
          let placed = false;
          let attempts = 0;
          const maxAttempts = 200;

          let tagWidthPercent = 0;
          let tagHeightPercent = 0;

          while (!placed && attempts < maxAttempts) {
            attempts++;

            // Генерируем случайные координаты в процентах
            let leftPercent, topPercent;

            // Для первых 20 тегов используем более точное размещение
            if (attempts < 20) {
              const angle = (attempts / 20) * 2 * Math.PI;
              const distance = 0.3 + (attempts % 10) * 0.05;

              leftPercent = 50 + distance * Math.cos(angle) * 50;
              topPercent = 50 + distance * Math.sin(angle) * 50;
            } else {
              // Случайное размещение для остальных попыток
              leftPercent = 10 + Math.random() * 80;
              topPercent = 10 + Math.random() * 80;
            }

            // Корректируем позицию, чтобы тег полностью помещался в облако
            tagWidthPercent = (tagWidth / cloudWidth) * 100;
            tagHeightPercent = (tagHeight / cloudHeight) * 100;

            leftPercent = Math.max(tagWidthPercent / 2, Math.min(100 - tagWidthPercent / 2, leftPercent));
            topPercent = Math.max(tagHeightPercent / 2, Math.min(100 - tagHeightPercent / 2, topPercent));

            // Проверяем пересечения с другими тегами
            const collision = checkCollision(placedTags, {
              left: leftPercent,
              top: topPercent,
              width: tagWidthPercent,
              height: tagHeightPercent
            });

            if (!collision) {
              placed = true;
              tagElement.style.left = `${leftPercent}%`;
              tagElement.style.top = `${topPercent}%`;
              tagElement.style.visibility = 'visible';
              cloud.appendChild(tagElement);

              // Добавляем тег в массив размещенных
              placedTags.push({
                left: leftPercent,
                top: topPercent,
                width: tagWidthPercent,
                height: tagHeightPercent,
                element: tagElement
              });

              console.log(tagWidthPercent);
              console.log(tagHeightPercent);

              // Инициализируем движение для этого тега
              initTagMovement(tagElement, tagWidthPercent, tagHeightPercent);
            }
          }

          // Если тег не поместился после всех попыток, размещаем его в любом случае
          if (!placed) {

            // Находим наименее плотную область
            const bestPosition = findBestPosition(placedTags, tagWidthPercent, tagHeightPercent);

            tagElement.style.left = `${bestPosition.left}%`;
            tagElement.style.top = `${bestPosition.top}%`;
            tagElement.style.visibility = 'visible';
            cloud.appendChild(tagElement);

            placedTags.push({
              left: bestPosition.left,
              top: bestPosition.top,
              width: tagWidthPercent,
              height: tagHeightPercent,
              element: tagElement
            });

            // Инициализируем движение для этого тега
            initTagMovement(tagElement, tagWidthPercent, tagHeightPercent);
          }
        });

        console.log(`Размещено тегов: ${placedTags.length} из ${sortedTags.length}`);
      }

      function initTagMovement(tagElement, tagWidthPercent, tagHeightPercent) {
        // Генерируем случайное направление и скорость
        const angle = Math.random() * 2 * Math.PI;
        const speed = 0.02 + Math.random() * 0.03; // Скорость движения (0.02-0.05% за кадр)

        // Сохраняем данные о движении
        tagMovements[tagElement.textContent] = {
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          widthPercent: tagWidthPercent,
          heightPercent: tagHeightPercent,
          element: tagElement
        };
      }

      function animateTags() {
        const cloud = document.getElementById('tagCloud');
        const cloudWidth = cloud.offsetWidth;
        const cloudHeight = cloud.offsetHeight;

        for (const tagName in tagMovements) {
          const movement = tagMovements[tagName];
          const tagElement = movement.element;

          // Получаем текущие координаты
          let currentLeft = parseFloat(tagElement.style.left);
          let currentTop = parseFloat(tagElement.style.top);

          // Вычисляем новые координаты
          let newLeft = currentLeft + movement.dx;
          let newTop = currentTop + movement.dy;

          // Проверяем границы облака с учетом размера тега
          const halfWidth = movement.widthPercent / 2;
          const halfHeight = movement.heightPercent / 2;

          // Проверка левой и правой границы
          if (newLeft - halfWidth < 0) {
            newLeft = halfWidth;
            movement.dx = -movement.dx; // Рикошет
          } else if (newLeft + halfWidth > 100) {
            newLeft = 100 - halfWidth;
            movement.dx = -movement.dx; // Рикошет
          }

          // Проверка верхней и нижней границы
          if (newTop - halfHeight < 0) {
            newTop = halfHeight;
            movement.dy = -movement.dy; // Рикошет
          } else if (newTop + halfHeight > 100) {
            newTop = 100 - halfHeight;
            movement.dy = -movement.dy; // Рикошет
          }

          // Обновляем позицию тега
          tagElement.style.left = `${newLeft}%`;
          tagElement.style.top = `${newTop}%`;
        }

        // Продолжаем анимацию
        requestAnimationFrame(animateTags);
      }

      function checkCollision(placedTags, newTag) {
        // Увеличиваем зону проверки для лучшего разделения тегов
        const padding = 1.5; // 1.5% от размера облака

        for (const tag of placedTags) {
          // Проверяем пересечение прямоугольников с учетом padding
          if (!(newTag.left + newTag.width / 2 + padding < tag.left - tag.width / 2 - padding ||
            newTag.left - newTag.width / 2 - padding > tag.left + tag.width / 2 + padding ||
            newTag.top + newTag.height / 2 + padding < tag.top - tag.height / 2 - padding ||
            newTag.top - newTag.height / 2 - padding > tag.top + tag.height / 2 + padding)) {
            return true; // Найдено пересечение
          }
        }
        return false; // Пересечений нет
      }

      function findBestPosition(placedTags, tagWidthPercent, tagHeightPercent) {
        // Если нет размещенных тегов, размещаем в центре
        if (placedTags.length === 0) {
          return { left: 50, top: 50 };
        }

        // Ищем позицию с минимальным пересечением
        let bestPosition = { left: 10, top: 10 };
        let minCollisions = Infinity;

        // Проверяем несколько возможных позиций
        for (let left = 10; left <= 90; left += 10) {
          for (let top = 10; top <= 90; top += 10) {
            let collisions = 0;

            for (const tag of placedTags) {
              if (!(left + tagWidthPercent / 2 < tag.left - tag.width / 2 ||
                left - tagWidthPercent / 2 > tag.left + tag.width / 2 ||
                top + tagHeightPercent / 2 < tag.top - tag.height / 2 ||
                top - tagHeightPercent / 2 > tag.top + tag.height / 2)) {
                collisions++;
              }
            }

            if (collisions < minCollisions) {
              minCollisions = collisions;
              bestPosition = { left, top };
            }
          }
        }

        return bestPosition;
      }

      // Инициализируем облако тегов после загрузки страницы
      window.addEventListener('load', () => {
        createTagCloud();
        // Запускаем анимацию движения тегов
        requestAnimationFrame(animateTags);
      });

      // Оптимизированная обработка изменения размера окна
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          createTagCloud();
        }, 200);
      });
    }


  });
})();