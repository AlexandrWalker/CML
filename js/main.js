(() => {
  document.addEventListener('DOMContentLoaded', () => {
    /**
     * Инициализация слайдеров swiper
     */
    const hero__slider = new Swiper(".hero__slider-init", {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      init: false,
      speed: 600,
      effect: "fade",
      fadeEffecct: {
        crossFade: true
      },
      mousewheel: {
        forceToAxis: true,
      },
      autoplay: {
        delay: 8000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    const work__items = new Swiper(".work__items", {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      // width: 'auto',
      // slideClass: 'work__slide',
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      breakpoints: {
        600: {
          slidesPerView: 6,
        }
      }
    });

    // const managementSlider = new Swiper(".management__slider", {
    //   slidesPerView: 'auto',
    //   slidesPerGroup: 1,
    //   spaceBetween: 10,
    //   speed: 600,
    //   loop: true,
    //   grid: false,
    //   mousewheel: {
    //     forceToAxis: true,
    //   },
    //   breakpoints: {
    //     601: {
    //       slidesPerView: 2,
    //       spaceBetween: 10,
    //       grid: {
    //         rows: 2,
    //         fill: "row"
    //       },
    //     },
    //     769: {
    //       slidesPerView: 3,
    //       spaceBetween: 20,
    //     },
    //   },
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    //   },
    // });

    const reviewsSlider = new Swiper(".reviews__slider", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      speed: 600,
      loop: true,
      mousewheel: {
        forceToAxis: true,
      },
      breakpoints: {
        381: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        769: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1441: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".reviews-button-next",
        prevEl: ".reviews-button-prev",
      },
    });

    const articlesSlider = new Swiper(".articles__slider", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      speed: 600,
      loop: true,
      mousewheel: {
        forceToAxis: true,
      },
      breakpoints: {
        381: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        769: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1441: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".articles-button-next",
        prevEl: ".articles-button-prev",
      },
    });

    const casesSlider = new Swiper(".cases__slider", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      speed: 600,
      loop: true,
      // loopAdditionalSlides: 6,
      mousewheel: {
        forceToAxis: true,
      },
      breakpoints: {
        361: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        769: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".cases-button-next",
        prevEl: ".cases-button-prev",
      },
    });

    const storySlider = new Swiper(".story__slider", {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      spaceBetween: 10,
      speed: 600,
      direction: 'horizontal',
      init: false,
      mousewheel: {
        forceToAxis: true,
      },
      breakpoints: {
        600: {
          slidesPerView: 'auto',
          spaceBetween: 20,
        },
      },
      on: {
        reachEnd: function () {
          this.snapGrid = [...this.slidesGrid];
        },
      }
    });

    const cargofeatSlider = new Swiper(".cargo-feat__slider", {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      spaceBetween: 10,
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      breakpoints: {
        601: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        769: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
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
     * Инициализация Lenis для плавного скрола
     */
    const lenis = new Lenis({
      anchors: {
        duration: 1.8,
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
      const headerBtn = document.querySelector('.header__btn');
      const menuBody = document.querySelector('.menu__body');
      const menuListItem = document.querySelector('.menu__list-item accordion accordion-active');
      var menuAccordionActive = document.getElementsByClassName('accordion-active');
      const burger = document.getElementById('burger');
      const burgerText = document.getElementById('burgerText');
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
        if (headerBtn.classList.contains('header__btn-active')) {
          headerBtn.classList.remove('header__btn-active')
        }
        if (menuBody.classList.contains('down')) {
          menuBody.classList.remove('down')
        }
        if (menuAccordionActive.length > 0 && menuAccordionActive[0] !== this) {
          menuAccordionActive[0].classList.remove('accordion-active');
        }
        const isOpened = burger.classList.toggle('burger--opened');
        menu.classList.toggle('mobile-menu--opened', isOpened);
        head.classList.toggle('head--active');
        lenis.stop();

        if (window.innerWidth < 769 && window.innerWidth !== 769) {
          const burgerOpened = document.querySelector('.burger.burger--opened');
          if (burgerOpened) {
            burgerText.innerHTML = 'Закрыть';
            lenis.stop();
          } else {
            burgerText.innerHTML = 'Меню';
            lenis.start();
          }
        }

        const burgerOpened = document.querySelector('.burger.burger--opened');
        if (burgerOpened) {
          lenis.stop();
        } else {
          lenis.start();
        }
      };

      /**
       * Закрывает меню.
       */
      const closeMenu = () => {
        burger.classList.remove('burger--opened');
        menu.classList.remove('mobile-menu--opened');
        head.classList.remove('head--active');

        lenis.start();
      };

      // Открытие/закрытие меню по клику на бургер
      burger.addEventListener('click', toggleMenu);

      [closeButton, overlay].forEach((element) => element.addEventListener('click', closeMenu));

      // Закрытие меню при клике вне области меню и бургера
      document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !burger.contains(event.target)) {
          closeMenu();
          lenis.start();
        }
      });

      // Закрытие меню по клику на пункты меню
      elements.forEach((element) => element.addEventListener('click', closeMenu));
    };
    burgerNav();



    /**
     * Установка dropdown
     */
    const dropdownJs = document.querySelector('.dropdown--js');
    if (dropdownJs) {
      let dropdowns = document.querySelectorAll('.dropdown--js');
      dropdowns.forEach(dropdown => {

        function updateSelected() {
          let selectedValue = dropdown.querySelector('.dropdown__value');
          let selectedOption = dropdown.querySelector('.dropdown__radio:checked');
          let selectedLabel = selectedOption.parentElement.querySelector('.dropdown__label');
          let text = selectedLabel.textContent;
          let selectedDropdown = dropdown.querySelector('.dropdown__selected--js');
          selectedDropdown.querySelector('span').textContent = text;
          selectedValue.dataset.value = text;

          if (selectedValue.dataset.value.length != 0) {
            dropdown.classList.add('check');
          } else {
            dropdown.classList.remove('check');
          }
        }

        function toggleClass(el, className, add) {
          let addClass = add;
          if (typeof addClass === 'undefined') {
            addClass = !el.classList.contains(className);
          }
          if (addClass) {
            el.classList.add(className);
          } else {
            el.classList.remove(className);
          }
        }

        let radios = dropdown.querySelectorAll('.dropdown__radio');
        let root = dropdown;

        for (let i = 0; i < radios.length; ++i) {
          let radio = radios[i];
          radio.addEventListener('change', function () {
            updateSelected();
          });
          radio.addEventListener('click', function () {
            toggleClass(root, 'is-active', false);
          });
        }

        let selectedLabel = dropdown.querySelector('.dropdown__selected--js');
        selectedLabel.addEventListener('click', function () {
          toggleClass(root, 'is-active');
        });

        document.addEventListener('click', (event) => {
          if (!dropdown.querySelector('.dropdown__container').contains(event.target) && !dropdown.querySelector('.dropdown__selected').contains(event.target)) {
            toggleClass(root, 'is-active', false);
          }
        });

        // updateSelected();
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
            let modalValue = e.target.getAttribute('data-value');

            if (modalId) {
              document.getElementById(modalId).classList.add('open');

              if (openButton.hasAttribute('data-value')) {
                document.getElementById(modalId).querySelector('.dropdown--js').classList.add('check');
                document.getElementById(modalId).querySelector('.dropdown__selected--js span').innerHTML = modalValue;
                document.getElementById(modalId).querySelector('.dropdown__value').dataset.value = modalValue;
                const dropdownRadios = document.getElementById(modalId).querySelectorAll('.dropdown__radio');
                dropdownRadios.forEach(dropdownRadio => {
                  if (dropdownRadio.value == modalValue) {
                    dropdownRadio.checked = true;
                  }
                });
              }

              document.body.classList.add('no-scroll');
            } else {
              return
            }

            Array.from(close, closeButton => {
              closeButton.addEventListener('click', e => {
                document.getElementById(modalId).classList.remove("open");
                document.body.classList.remove('no-scroll');
              });

              window.addEventListener('keydown', (e) => {
                if (e.key === "Escape") {
                  document.getElementById(modalId).classList.remove("open")
                  document.body.classList.remove('no-scroll');
                }
              });

              document.querySelector(".modal.open .modal__box").addEventListener('click', event => {
                event._isClickWithInModal = true;
              });

              document.getElementById(modalId).addEventListener('click', event => {
                if (event._isClickWithInModal) return;
                event.currentTarget.classList.remove('open');
                document.body.classList.remove('no-scroll');
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

          if (tabsBtn.getAttribute('data-tab') === 'all') {
            tabsPanels.forEach((panel) => {
              if (panel.closest('.tabs') === currentTabsContainer) {
                panel.classList.add('tabs__panel--active');
              }
            });
          }
        });
      });
    };
    tabsFunc();



    var headerItem = document.querySelectorAll('.header__btn'),
      headerActive = document.getElementsByClassName('header__btn-active');

    if (headerItem.length != 0) {
      Array.from(headerItem).forEach(function (hItem, i, headerItem) {
        hItem.addEventListener('click', function (e) {
          e.stopPropagation();
          if (headerActive.length > 0 && headerActive[0] !== this) {
            headerActive[0].classList.remove('header__btn-active');
            document.querySelector('.menu__body').classList.remove('down');
          }
          this.classList.toggle('header__btn-active');
          document.querySelector('.menu__body').classList.toggle('down');

          window.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
              this.classList.remove("header__btn-active")
            }
          });

          document.addEventListener('click', (e) => {
            const withinBoundaries = e.composedPath().includes(hItem.querySelector('.header__dropdown'));

            if (!withinBoundaries) {
              hItem.classList.remove("header__btn-active");

              const menuBody = document.querySelector('.menu__body');
              if (menuBody.classList.contains('down')) {
                menuBody.classList.remove('down')
              }
            }
          })
        });
      });
    }



    /**
     * Кнопка куки
     */
    if (('; ' + document.cookie).split(`; COOKIE_ACCEPT=`).pop().split(';')[0] !== '1') {
      const cookiesNotify = document.getElementById('warning-plate');

      if (cookiesNotify) {
        cookiesNotify.style.display = 'block';
      }
    }
    // document.getElementById('warning-btn').addEventListener('click', event => {
    //   document.getElementById('warning-plate').style.display = 'none';
    // });



    /**
     *  Copyboard
     */
    const contacts__copy = document.querySelector(".contacts__copy");
    if (contacts__copy) {
      const copyButtons = document.querySelectorAll(".contacts__copy");
      copyButtons.forEach(copyButton => {
        copyButton.addEventListener("click", function () {
          navigator.clipboard.writeText(copyButton.parentNode.innerText).then(function () {
            console.log('Text copied to clipboard');
          }).catch(function (error) {
            console.error('Error:', error);
          });
        });
      });
    }



    gsap.registerPlugin(ScrollTrigger);

    // $(window).on('resize load', function () {
      // if (window.innerWidth > '768' && window.innerWidth != '768') {
        const parallaxItem = document.querySelector('[data-animation="parallax-img"]');
        if (parallaxItem) {
          const parallaxImgContainers = document.querySelectorAll('[data-animation="parallax-img"]');
          parallaxImgContainers.forEach(parallaxImgContainer => {
            const image = parallaxImgContainer.querySelector('img');
            gsap.fromTo(image,
              { y: '-7%' },
              {
                y: '7%',
                scrollTrigger: {
                  trigger: parallaxImgContainer,
                  start: 'top 60%',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          });
        }
      // }
    // });

    // function counter(array, time = 2000) {
    //   let n = 0;
    //   const num = Number(array.dataset.val);
    //   array.style.minWidth = (num).toString().length + 'ch';
    //   let interval = setInterval(() => {
    //     n < num ? (n += num / (time / 10)) : clearInterval(interval);
    //     array.classList.contains('frac')
    //       ? (array.innerHTML = n.toFixed(1))
    //       : (array.innerHTML = Math.round(n));
    //   }, 10);
    // }

    function counter(array, time = 2000) {
      let n = 0;
      const num = Number(array.dataset.val);
      const isFractional = array.classList.contains('frac');
      const isYearType = array.dataset.type === 'year';

      const interval = setInterval(() => {
        n += num / (time / 10);

        if (n >= num) {
          n = num;
          clearInterval(interval);
        }

        let formattedValue;
        if (isFractional) {
          formattedValue = n.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          array.style.minWidth = ((num).toString().length - 1) + 'ch';
        } else {
          formattedValue = Math.round(n).toLocaleString();
          array.style.minWidth = (num).toString().length + 'ch';
        }

        array.innerHTML = formattedValue;

        if (isYearType) {
          const currentValue = isFractional ? parseFloat(n.toFixed(1)) : Math.round(n);
          array.innerHTML = formattedValue + getYearText(currentValue);
        }
      }, 10);
    }

    function getYearText(value) {
      const lastDigit = value % 10;
      const lastTwoDigits = value % 100;

      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return ` лет`;
      }

      switch (lastDigit) {
        case 1:
          return ` год`;
        case 2:
        case 3:
        case 4:
          return ` года`;
        default:
          return ` лет`;
      }
    }

    const numbBoxes = document.querySelectorAll('.numbs');
    numbBoxes.forEach((numbBox) => {
      const numbs = numbBox.querySelectorAll('.number');
      numbs.forEach((numb) => {
        gsap.to(numb, {
          scrollTrigger: {
            trigger: numbBox,
            start: `top 95%`,
          },
          onStart: () => counter(numb),
        });
      });
    });

    $(window).on('resize load', function () {
      // window.addEventListener('resize load', function () {

      if (window.innerWidth <= '768') {
        storySlider.init();
      } else {
        /* story animation */
        const panelsContainers = document.getElementById("story_slider");

        if (panelsContainers) {
          let panelsContainer = document.querySelector("#story_slider"), tween;
          const panels = gsap.utils.toArray("#story_slider .story__slide");

          tween = gsap.to(panels, {
            x: () => -1 * (panelsContainer.scrollWidth - (innerWidth / 3)),
            ease: "none",
            scrollTrigger: {
              trigger: "#story__inner",
              pin: true,
              start: "top 20%",
              scrub: 1,
              end: () => "+=" + (panelsContainer.scrollWidth - innerWidth),
              // markers: true,
            }
          });
        }

        $(window).on('scroll', function () {

          const story__slides = document.querySelectorAll('.story__slide');

          story__slides.forEach(story__slide => {
            if (story__slide.getBoundingClientRect().left < window.innerWidth / 3 && story__slide.getBoundingClientRect().right > window.innerWidth / 3) {
              story__slide.classList.add('swiper-slide-active');
            } else {
              story__slide.classList.remove('swiper-slide-active');
            }
          });
        });
      }
    });



    const faqItems = document.querySelectorAll(".faq__item");
    const serviceItems = document.querySelectorAll(".service__item");
    const calcItems = document.querySelectorAll(".calc__block");
    const aboutItem = document.querySelector(".about__img");
    const bannerItem = document.querySelector(".banner");
    const titleItems = document.querySelectorAll(".section__head");
    const target = document.querySelectorAll('.section__head h2');
    const generalTitleItems = document.querySelectorAll(".general__head");
    const generalTarget = document.querySelectorAll('.general__head h1');



    for (let i = 0; i < faqItems.length; i++) {
      gsap.from(faqItems[i], {
        opacity: 0,
        x: -50,
        duration: 0.3,
        scrollTrigger: {
          trigger: faqItems[i],
          start: "top 95%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          preventOverlaps: true,
          // markers: true,
        }
      })
    }

    for (let i = 0; i < calcItems.length; i++) {
      gsap.from(calcItems[i], {
        opacity: 0,
        y: 50,
        duration: 0.3,
        scrollTrigger: {
          trigger: calcItems[i],
          start: "top 95%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          preventOverlaps: true,
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
          start: "top 95%",
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
        start: "top 95%",
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
        start: "top 95%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        preventOverlaps: true,
      }
    });

    for (let i = 0; i < target.length; i++) {

      const text = new SplitType(target[i], { types: 'lines, words' })

      gsap.from(text.words, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        stagger: { amount: 0.2 },
        scrollTrigger: {
          trigger: titleItems[i],
          start: "top 95%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          preventOverlaps: true,
        },
      })
    }

    for (let i = 0; i < generalTarget.length; i++) {

      const text = new SplitType(generalTarget[i], { types: 'lines, words' })

      gsap.from(text.words, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        stagger: { amount: 0.2 },
        scrollTrigger: {
          trigger: generalTitleItems[i],
          start: "top 95%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          preventOverlaps: true,
        },
      })
    }






    const head = this.document.querySelector('.head');
    const hFirstSection = document.getElementById('first-section');
    const hCalc = document.getElementById('calc');
    const hFooter = document.getElementById('footer');
    const h = hFirstSection.offsetHeight;
    if (hCalc) {
      const h = hFirstSection.offsetHeight + hCalc.offsetHeight;
    }
    const plate = document.getElementById('plate');
    const classToAdd = 'show';

    window.addEventListener('scroll', function () {
      const verticalScrollPosition = window.pageYOffset;
      const bottomScrollPosition = document.body.offsetHeight - hFooter.offsetHeight - window.innerHeight;
      const isActive = plate.classList.contains(classToAdd);

      if (verticalScrollPosition > 0 && verticalScrollPosition !== 0) {
        head.classList.add('fixed');
      } else {
        head.classList.remove('fixed');
      }

      if (verticalScrollPosition > h && verticalScrollPosition < bottomScrollPosition) {
        plate.classList.add(classToAdd);
      } else {
        plate.classList.remove(classToAdd);
      }
    });



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



    const caseAcc = document.querySelector('.case__acc');
    const case__acc = document.querySelectorAll('.case__acc');
    const tabsPanelActive = document.querySelector('.tabs__panel--active');
    const tabsPanelFirst = document.querySelector('.tabs__panel--first');

    // if (tabsPanelFirst) {
    //   tabsPanelFirst.click();
    // }

    if (caseAcc) {
      window.addEventListener('resize', function (event) {
        if (window.innerWidth < 769 && window.innerWidth !== 769) {

          case__acc[0].classList.add('accordion-active');

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



    /**
     * Инициализация аккордеона
     */
    // function accordionFunc() {

    // }
    // accordionFunc();

    document.querySelectorAll('.accordion-parent').forEach((accordionContainer) => {

      var accordionHead = accordionContainer.querySelectorAll('.accordion'),
        accordionActive = accordionContainer.getElementsByClassName('accordion-active');

      Array.from(accordionHead).forEach(function (accordionItem, i, accordionHead) {
        accordionItem.addEventListener('click', function (e) {

          if (accordionActive.length > 0 && accordionActive[0] !== this) {
            accordionActive[0].classList.remove('accordion-active');
          }
          this.classList.toggle('accordion-active');

          ScrollTrigger.refresh();
        });
      });

    });

    var preAccordionHead = document.querySelectorAll('.pre-accordion'),
      preAccordionActive = document.getElementsByClassName('pre-accordion-active');

    Array.from(preAccordionHead).forEach(function (preAccordionItem, i, preAccordionHead) {
      preAccordionItem.addEventListener('click', function (e) {

        if (preAccordionActive.length > 0 && preAccordionActive[0] !== this) {
          preAccordionActive[0].classList.remove('pre-accordion-active');
        }
        this.classList.toggle('pre-accordion-active');

        ScrollTrigger.refresh();
      });
    });



    const fixedBtn = document.getElementById('fixed-btn');
    fixedBtn.addEventListener('click', function () {
      fixedBtn.parentNode.classList.toggle('fixed-btns--active');
    });



    /**
     * Карта
     */
    if (document.getElementById('tagCloud')) {
      const map = [
        { name: 'Россия', size: 'extraBig', opacity: 1, static: true },
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

      class TagCloud {
        constructor() {

          this.cloud = document.getElementById('tagCloud');
          this.tags = [];
          this.animationId = null;
          this.lastTime = 0;
          this.center = { x: 50, y: 50 };
          this.speedFactor = 0.12;
          this.collisionCheckInterval = 10;
          this.frameCount = 0;
          this.fadeStartDistance = 14;
          this.fadeEndDistance = 2;

          this.init();
        }

        init() {
          this.createTags();
          this.startAnimation();
          window.addEventListener('resize', this.handleResize.bind(this));
        }

        createTags() {
          this.cloud.innerHTML = '';
          this.tags = [];

          const staticTag = map.find(tag => tag.static);
          if (staticTag) {
            const staticElement = document.createElement('div');
            staticElement.className = `tag ${staticTag.size}`;
            staticElement.textContent = staticTag.name;
            staticElement.style.opacity = staticTag.opacity;
            staticElement.style.left = `${this.center.x}%`;
            staticElement.style.top = `${this.center.y}%`;
            staticElement.style.transform = 'translate(-50%, -50%)';
            this.cloud.appendChild(staticElement);

            this.staticTag = {
              element: staticElement,
              x: this.center.x,
              y: this.center.y,
              size: 1,
              opacity: staticTag.opacity
            };
          }

          const sortedTags = map.filter(tag => !tag.static).sort((a, b) => {
            const sizes = { 'extraBig': 4, 'big': 3, 'mid': 2, 'small': 1, 'extraSmall': 0 };
            return sizes[b.size] - sizes[a.size];
          });

          sortedTags.forEach((tag, index) => {
            const tagElement = document.createElement('div');
            tagElement.className = `tag ${tag.size}`;
            tagElement.textContent = tag.name;
            tagElement.style.opacity = tag.opacity;

            tagElement.style.visibility = 'hidden';
            this.cloud.appendChild(tagElement);

            const tagRect = tagElement.getBoundingClientRect();
            const tagWidth = tagRect.width;
            const tagHeight = tagRect.height;

            this.cloud.removeChild(tagElement);

            const angle = Math.random() * Math.PI * 2;
            const distance = 0.7 + Math.random() * 0.2;
            const left = this.center.x + Math.cos(angle) * distance * 50;
            const top = this.center.y + Math.sin(angle) * distance * 50;

            tagElement.style.left = `${left}%`;
            tagElement.style.top = `${top}%`;
            tagElement.style.visibility = 'visible';
            tagElement.style.animation = `floatIn ${0.3 + Math.random() * 0.4}s ease-out forwards`;

            this.cloud.appendChild(tagElement);

            // Уменьшил время затухания до 0.5-1 секунды
            const fadeDuration = 500 + Math.random() * 500;

            this.tags.push({
              element: tagElement,
              originalSize: tag.size,
              x: left,
              y: top,
              speed: (0.3 + Math.random() * 0.45) * this.speedFactor,
              size: 1,
              opacity: tag.opacity,
              width: tagWidth,
              height: tagHeight,
              sizeValue: this.getSizeValue(tag.size),
              fadeDuration: fadeDuration,
              fadeStartTime: 0,
              isFading: false
            });
          });
        }

        getSizeValue(size) {
          const sizes = { 'extraBig': 4, 'big': 3, 'mid': 2, 'small': 1, 'extraSmall': 0 };
          return sizes[size];
        }

        startAnimation() {
          if (this.animationId) {
            cancelAnimationFrame(this.animationId);
          }

          const animate = (time) => {
            if (!this.lastTime) this.lastTime = time;
            const deltaTime = Math.min(time - this.lastTime, 100) / 1000;
            this.lastTime = time;

            this.updateTags(deltaTime, time);

            this.frameCount++;
            if (this.frameCount % this.collisionCheckInterval === 0) {
              this.checkCollisions();
            }

            this.animationId = requestAnimationFrame(animate);
          };

          this.animationId = requestAnimationFrame(animate);
        }

        updateTags(deltaTime, currentTime) {
          this.tags.forEach(tag => {
            const dx = this.center.x - tag.x;
            const dy = this.center.y - tag.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Сначала затухание
            if (distance < this.fadeStartDistance && !tag.isFading) {
              tag.isFading = true;
              tag.fadeStartTime = currentTime;
            }

            if (tag.isFading) {
              const fadeProgress = Math.min((currentTime - tag.fadeStartTime) / tag.fadeDuration, 1);
              tag.opacity = 1 - fadeProgress;
              tag.element.style.opacity = tag.opacity;
            }

            // Затем движение (если ещё виден)
            if (tag.opacity > 0.01) {
              const directionX = dx / distance;
              const directionY = dy / distance;

              tag.x += directionX * tag.speed * 50 * deltaTime;
              tag.y += directionY * tag.speed * 50 * deltaTime;

              const progress = distance / 50;
              tag.size = progress * 0.8 + 0.2;

              tag.element.style.left = `${tag.x}%`;
              tag.element.style.top = `${tag.y}%`;
              tag.element.style.transform = `translate(-50%, -50%) scale(${tag.size})`;
            }

            if (tag.opacity <= 0.01 || distance < this.fadeEndDistance) {
              this.resetTag(tag, currentTime);
            }
          });
        }

        checkCollisions() {
          const sortedTags = [...this.tags].sort((a, b) => a.sizeValue - b.sizeValue);

          sortedTags.forEach(tag => {
            tag.element.classList.remove('hidden');
          });

          for (let i = 0; i < sortedTags.length; i++) {
            for (let j = i + 1; j < sortedTags.length; j++) {
              const tag1 = sortedTags[i];
              const tag2 = sortedTags[j];

              if (this.isColliding(tag1, tag2)) {
                const smallerTag = tag1.sizeValue < tag2.sizeValue ? tag1 : tag2;
                smallerTag.element.classList.add('hidden');
              }
            }
          }
        }

        isColliding(tag1, tag2) {
          const rect1 = tag1.element.getBoundingClientRect();
          const rect2 = tag2.element.getBoundingClientRect();

          return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
          );
        }

        resetTag(tag, currentTime) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 0.7 + Math.random() * 0.2;

          tag.x = this.center.x + Math.cos(angle) * distance * 50;
          tag.y = this.center.y + Math.sin(angle) * distance * 50;
          tag.size = 1;
          tag.opacity = 1;
          tag.isFading = false;
          tag.fadeStartTime = 0;

          tag.element.style.left = `${tag.x}%`;
          tag.element.style.top = `${tag.y}%`;
          tag.element.style.transform = `translate(-50%, -50%) scale(1)`;
          tag.element.style.opacity = 1;
          tag.element.classList.remove('hidden');

          tag.element.style.animation = 'none';
          tag.element.style.animation = `floatIn ${0.3 + Math.random() * 0.3}s ease-out forwards`;
        }

        handleResize() {
          clearTimeout(this.resizeTimeout);
          this.resizeTimeout = setTimeout(() => {
            this.createTags();
          }, 200);
        }
      }

      window.addEventListener('load', () => {
        new TagCloud();
      });
    }



    /**
     * Анимация блока задач
     */
    window.addEventListener('scroll', function () {
      const reasons = document.querySelector('.reasons');
      if (reasons) {
        const reasonsItems = document.querySelectorAll('.task__item');
        const reasonsRect = reasons.getBoundingClientRect();
        // Проверяем, достиг ли блок reasons верхнего края окна
        if (reasonsRect.top <= 0) {
          reasons.classList.add('fixed'); // Закрепляем блок
          // Уменьшаем и перекрываем блоки reasons__items при прокрутке
          reasonsItems.forEach((item, index) => {
            const offset = window.scrollY - reasons.offsetHeight;
            const scale = Math.max(0.5, 1 - (offset / 500) + (index * 0.1)); // Уменьшаем размер
            item.style.transform = `scale(${scale}) translateY(${index * 20}px)`; // Перекрытие
          });
        } else {
          reasons.classList.remove('fixed'); // Сбрасываем закрепление
          reasonsItems.forEach(item => {
            item.style.transform = 'scale(1) translateY(0)'; // Возвращаем в исходное состояние
          });
        }
      }
    });



    window.addEventListener('resize', function () { ScrollTrigger.refresh() });

  });
})();

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('warning-plate').remove();
}

/*=================Скрипт для блока со скролом=====================*/
const reasons = document.querySelector('.reasons');

if (reasons) {
  var len = $('.reasons__item').length;
  $(window).on('resize load', function () {

    if (window.innerWidth < "767") {
      scroll = 0;
      inc = 0.06; // speed down
      inc2 = 0.06; // speed up
      scale = 1;
      var wH = document.documentElement.clientWidth


      $(window).on('scroll', function () {
        // Find the active element
        var $activeBlock = $('.active');
        var element = document.querySelector('.active');
        var h = element.clientHeight / 200;
        var distanceToTop = $activeBlock.offset().top - $(window).scrollTop();
        var top = window.pageYOffset;

        // Scroll direction checks
        if (scroll > top) {
          // Scrolling up
          if ($activeBlock.attr('data-index') != 1) {
            h = h * 200;
            if (distanceToTop > h) {
              var $prevBlock = $activeBlock.prev();
              $activeBlock.removeClass('active');
              $prevBlock.addClass('active');
              $($prevBlock).css('transform', 'scale(1)');
              scale = 0.90; // set initial scale
            }
          }
        } else if (scroll < top) {
          // Scrolling down

          if (distanceToTop < 200 && $activeBlock.attr('data-index') != len) {
            var $nextBlock = $activeBlock.next();
            $activeBlock.removeClass('active');
            $nextBlock.addClass('active');
          }

          if ($activeBlock.attr('data-index') == len && distanceToTop <= 0) {
            var $prevBlock = $activeBlock.prev();
            $($prevBlock).css('transform', 'scale(0.90)');
            scale = 0.90;
          }
        }

        // Scaling effect
        if (scroll > top) {
          // Scrolling up
          if (distanceToTop > 50) {
            var $activeBlock = $('.active');
            var prevCurrentBlock = $($activeBlock).prev();

            scale += inc2 / 0.006; // Increase scale on scroll up
            scale = Math.min(scale, 1); // Ensure max scale is 1

            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(1, scale) + ')');

            // Adjust opacity of the over block
            var $overBlock = $(prevCurrentBlock).find('.over');
            var newOpacity = Math.max(0, 1 - (distanceToTop / h)); // Calculate new opacity
            $overBlock.css('opacity', newOpacity);
          }
        } else if (scroll < top) {
          // Scrolling down
          var $activeBlock = $('.active');
          var prevCurrentBlock = $($activeBlock).prev();

          scale -= inc * 0.06; // Decrease scale on scroll down
          if ($(prevCurrentBlock).attr('data-index') == 1) {
            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.83, scale) + ')');
          }
          if ($(prevCurrentBlock).attr('data-index') == 2) {
            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.86, scale) + ')');
          }
          if ($(prevCurrentBlock).attr('data-index') == 3) {
            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.89, scale) + ')');
          }
          if ($(prevCurrentBlock).attr('data-index') == 4) {
            $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.92, scale) + ')');
          }

          // Adjust opacity of the over block
          var $overBlock = $(prevCurrentBlock).find('.over');
          var newOpacity = Math.min(0.6, (distanceToTop / h + 0.02)); // Calculate new opacity
          $overBlock.css('opacity', newOpacity);
        }

        if (distanceToTop < 0) {
          var $prevBlock = $activeBlock.prev();
          $($prevBlock).css('transform', 'scale(0.90)');
          scale = 0.90;
        }

        scroll = top; // Update scroll position
      });
    } else {

      scroll = 0;
      inc = 0.006; // speed down
      inc2 = 0.008; // speed up
      scale = 1;
      var wH = document.documentElement.clientWidth

      $(window).on('scroll', function () {
        // Find the active element
        var $activeBlock = $('.active');
        var element = reasons.querySelector('.active');
        var h = element.clientHeight / 200;
        var distanceToTop = $activeBlock.offset().top - $(window).scrollTop() - 160;
        var top = window.pageYOffset;

        const reasonsHead = $('.reasons__head');

        if (reasonsHead) {

          const dataIndex = $activeBlock.attr('data-index');

          setTimeout(() => {
            reasonsHead.find('span').html(dataIndex < 10 ? `0${dataIndex}` : dataIndex); // Изменяем текст
          }, 200); // Задержка должна соответствовать длительности transition

        }

        // Scroll direction checks
        if (scroll > top) {
          // Scrolling up
          if ($activeBlock.attr('data-index') != 1) {
            h = h * 200;
            if (distanceToTop > h) {
              var $prevBlock = $activeBlock.prev();
              $activeBlock.removeClass('active');
              $prevBlock.addClass('active');
              $($prevBlock).css('transform', 'scale(1)');
              scale = 0.92; // set initial scale
            }
          }
        } else if (scroll < top) {

          // Scrolling down
          if (distanceToTop < h && $activeBlock.attr('data-index') != len) {
            var $nextBlock = $activeBlock.next();
            $activeBlock.removeClass('active');
            $nextBlock.addClass('active');
            if (scale !== 1) {
              scale = 1; // set to 1 when scrolling down
            }
          }

          if ($activeBlock.attr('data-index') == len && distanceToTop <= 0) {
            var $prevBlock = $activeBlock.prev();
            $($prevBlock).css('transform', 'scale(0.92)');
            scale = 0.92;
          }
        }

        // Scaling effect
        if (scroll > top) {
          // Scrolling up
          var $activeBlock = $('.active');
          var prevCurrentBlock = $($activeBlock).prev();

          scale += inc2; // Increase scale on scroll up
          scale = Math.min(scale, 1); // Ensure max scale is 1

          $(prevCurrentBlock).css('transform', 'scale(' + Math.max(1, scale) + ')');

          // Adjust opacity of the over block
          var $overBlock = $(prevCurrentBlock).find('.over');
          var newOpacity = Math.max(0, 1 - (distanceToTop / h)); // Calculate new opacity
          $overBlock.css('opacity', newOpacity);
        } else if (scroll < top) {
          // Scrolling down
          var $activeBlock = $('.active');
          var prevCurrentBlock = $($activeBlock).prev();

          scale -= inc; // Decrease scale on scroll down

          $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.90, scale) + ')');

          // Adjust opacity of the over block
          var $overBlock = $(prevCurrentBlock).find('.over');
          var newOpacity = Math.min(0.6, (distanceToTop / h)); // Calculate new opacity
          $overBlock.css('opacity', newOpacity);
        }

        if (distanceToTop < 0) {
          var $prevBlock = $activeBlock.prev();
          $($prevBlock).css('transform', 'scale(0.92)');
          scale = 0.92;
        }

        scroll = top; // Update scroll position
      });

    }
  });
}