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
        offset: -200,
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



    addEventListener('scroll', function () {
      const scrollPosition = window.scrollY;
      const head = this.document.querySelector('.head');
      const h = document.getElementById('first-section').offsetHeight;
      const plate = document.querySelector('.plate');

      if (scrollPosition > 0 && scrollPosition !== 0) {
        head.classList.add('fixed');
      } else {
        head.classList.remove('fixed');
      }

      if (scrollPosition > h && scrollPosition !== h) {
        plate.classList.add('show');
      } else {
        plate.classList.remove('show');
      }
    });



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
            Counter: $(this).text()
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
            Counter: $(this).text()
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
            Counter: $(this).text()
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
      trigger: '.numberFraction',
      onEnter: scrolled1,
    });

    ScrollTrigger.create({
      trigger: '.numberFraction',
      onEnter: scrolled2,
    });

    ScrollTrigger.create({
      trigger: '.partner__head',
      onEnter: scrolled3,
    });

    function asdd() {
      const char = document.querySelectorAll('.char');
      char.forEach(element => {
        element.classList.add('animate');
      });
    }

    ScrollTrigger.create({
      trigger: '.section__head',
      onEnter: asdd(),
    });




    const faqItems = document.querySelectorAll(".faq__item");
    const serviceItems = document.querySelectorAll(".service__item");
    const calcItems = document.querySelectorAll(".calc__block");
    const aboutItem = document.querySelector(".about__img");
    const bannerItem = document.querySelector(".banner");

    // for (let i = 0; i < titleItems.length; i++) {
    //   gsap.from(titleItems[i], {
    //     opacity: 0,
    //     x: -50,
    //     duration: 0.5,
    //     scrollTrigger: {
    //       trigger: titleItems[i],
    //       start: "top 80%",
    //       end: "bottom 20%",
    //       toggleActions: "play none none reverse",
    //     }
    //   });
    // }

    for (let i = 0; i < faqItems.length; i++) {
      gsap.from(faqItems[i], {
        opacity: 0,
        x: -50,
        duration: 0.3,
        scrollTrigger: {
          trigger: faqItems[i],
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });
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
          toggleActions: "play none none reverse",
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
          toggleActions: "play none none reverse",
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
        toggleActions: "play none none reverse",
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
        toggleActions: "play none none reverse",
      }
    });



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
          toggleActions: "play none none reverse",
        }
      })
    }



    const itemsContainer = document.querySelector('.work__items');
    const items = document.querySelectorAll('.work__item');
    const itemsActive = document.getElementsByClassName('work__item-active');

    function scrollItems() {

      const containerRect = itemsContainer.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const scrollRight = itemsContainer.scrollLeft + containerRect.width;

      const isEndPos = Math.abs(scrollRight - itemsContainer.scrollWidth) < 1;
      const isStartPos = itemsContainer.scrollLeft < 1;

      if (isStartPos) {
        items.forEach(item => item.classList.remove('work__item-active'));
        items[0].classList.add('work__item-active');
      } else if (isEndPos) {
        items.forEach(item => item.classList.remove('work__item-active'));
        items[items.length - 1].classList.add('work__item-active');
      } else {

        let closestItem = null;
        let minimalPos = Infinity;

        items.forEach(item => {

          const itemRect = item.getBoundingClientRect();
          const itemCenter = itemRect.left + itemRect.width / 2;
          const itemPos = Math.abs(itemCenter - containerCenter);

          if (itemPos < minimalPos) {
            minimalPos = itemPos;
            closestItem = item;
          }

          item.classList.remove('work__item-active');
        });

        if (closestItem) {
          closestItem.classList.add('work__item-active');
        }
      }
    }



    const case__acc = document.querySelectorAll('.case__acc');
    const tabsPanelActive = document.querySelector('.tabs__panel--active');
    const tabsPanelFirst = document.querySelector('.tabs__panel--first');

    if (case__acc) {
      window.addEventListener('resize', function (event) {
        if (window.innerWidth < 769) {
          itemsContainer.addEventListener('scroll', scrollItems);

          for (let i = 0; i < case__acc.length; i++) {
            case__acc[i].classList.add('accordion');
            case__acc[i].classList.remove('tabs__panel');
            if (tabsPanelFirst) {
              tabsPanelFirst.classList.remove('tabs__panel--active');
            }
          }
        } else {
          items.forEach(element => {
            element.addEventListener('mouseover', function () {
              if (itemsActive.length > 0 && itemsActive[0] !== this) {
                itemsActive[0].classList.remove('work__item-active');
              }
              this.classList.add('work__item-active');
            });
          });

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



    const map = [
      {
        name: 'Россия',
        size: 'extraBig',
        opacity: 1
      },



      {
        name: 'ОАЭ',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Турция',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Иран',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Израиль',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Япония',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Гонконг',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Малайзия',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Индонезия',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Китай',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Индия',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'ЮАР',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Польша',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Египет',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Таиланд',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Вьетнам',
        size: 'big',
        opacity: 1,
      },
      {
        name: 'Корея',
        size: 'big',
        opacity: 1,
      },



      {
        name: 'Сербия',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Мьянма',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Мексика',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Камбоджа',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Канада',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Испания',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Чехия',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'США',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Оман',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Германия',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Франция',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Латвия',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Италия',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Тунис',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Литва',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Великобритания',
        size: 'mid',
        opacity: 0.8,
      },
      {
        name: 'Эстония',
        size: 'mid',
        opacity: 0.8,
      },



      {
        name: 'Швеция',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Австрия',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Дания',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Кения',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Шри-Ланка',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Кот-д’Ивуар',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Аргентина',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Австралия',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Йемен',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Бангладеш',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Бельгия',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Эквадор',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Катар',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Нидерланды',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Швейцария',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Марокко',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Португалия',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Венгрия',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Бразилия',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Сингапур',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Словакия',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Тунис',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Греция',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Болгария',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Словения',
        size: 'small',
        opacity: 0.7,
      },
      {
        name: 'Саудовская Аравия',
        size: 'small',
        opacity: 0.7,
      },



      {
        name: 'Нигерия',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Новая Зеландия',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Папуа — Новая Гвинея',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Чили',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Бахрейн',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Нигер',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Норвегия',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Маврикий',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Мальта',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Перу',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Сьерра-Леоне',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Непал',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Бруней',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Ангола',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Гана',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Сирия',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Доминиканка',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Мадагаскар',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Ливия',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Венесуэла,',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Ливан',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Кипр Иордания',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Филиппины',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Панама',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Эфиопия',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Лаос',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Гватемала',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Уругвай',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Ирландия',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Гвинея',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Ливия',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Танзания',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Камерун',
        size: 'extraSmall',
        opacity: 0.5,
      },
      {
        name: 'Кувейт',
        size: 'extraSmall',
        opacity: 0.5,
      },
    ]



    /**
     * trash
     */
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