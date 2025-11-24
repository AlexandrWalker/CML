(() => {
  document.addEventListener('DOMContentLoaded', () => {

    /**
     * Инициализация Lenis для плавного скрола
     */
    const lenis = new Lenis({
      anchors: {
        duration: 1.8,
        offset: -150,
      },
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    // lenis.on('scroll', ScrollTrigger.update);
    // gsap.ticker.add((time) => {
    //   lenis.raf(time * 1000);
    // });
    // gsap.ticker.lagSmoothing(0);



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
        dynamicBullets: true,
        dynamicMainBullets: 4
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
        dynamicBullets: true,
        dynamicMainBullets: 4
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
        dynamicBullets: true,
        dynamicMainBullets: 4
      },
      navigation: {
        nextEl: ".cases-button-next",
        prevEl: ".cases-button-prev",
      },
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

        const menuItems = document.querySelectorAll('.menu__body ul li.menu__list-item');
        for (let i = 0; menuItems.length != i; i++) {
          const menuItem = menuItems[i].querySelector('[data-transform="menuFade"]');
          gsap.fromTo(menuItem,
            {
              y: '200',
              opacity: 0,
            },
            {
              y: '0',
              opacity: 1,
              duration: 0.5,
              delay: 0.1 * i,
              ease: "none",
              scrollTrigger: {
                trigger: '.mobile-menu--opened .menu__list',
                start: 'top 100%',
                end: 'bottom top',
              }
            }
          );
        }

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
    // function modalFunc() {
    //   var modal__btn = document.querySelector('.modal__btn');

    //   if (!modal__btn) {
    //     return;
    //   } else {
    //     var close = document.querySelectorAll('.modal__close-btn');
    //     var openBtn = document.querySelectorAll('.modal__btn');

    //     Array.from(openBtn, openButton => {
    //       openButton.addEventListener('click', e => {

    //         let open = document.getElementsByClassName('open');

    //         if (open.length > 0 && open[0] !== this) {
    //           open[0].classList.remove('open');
    //         }

    //         let modalId = e.target.getAttribute('data-id');
    //         let modalValue = e.target.getAttribute('data-value');

    //         if (modalId) {
    //           document.getElementById(modalId).classList.add('open');

    //           if (openButton.hasAttribute('data-value')) {
    //             document.getElementById(modalId).querySelector('.dropdown--js').classList.add('check');
    //             document.getElementById(modalId).querySelector('.dropdown__selected--js span').innerHTML = modalValue;
    //             document.getElementById(modalId).querySelector('.dropdown__value').dataset.value = modalValue;
    //             const dropdownRadios = document.getElementById(modalId).querySelectorAll('.dropdown__radio');
    //             dropdownRadios.forEach(dropdownRadio => {
    //               if (dropdownRadio.value == modalValue) {
    //                 dropdownRadio.checked = true;
    //               }
    //             });
    //           }

    //           document.body.classList.add('no-scroll');
    //         } else {
    //           return
    //         }

    //         Array.from(close, closeButton => {
    //           closeButton.addEventListener('click', e => {
    //             document.getElementById(modalId).classList.remove("open");
    //             document.body.classList.remove('no-scroll');
    //           });

    //           window.addEventListener('keydown', (e) => {
    //             if (e.key === "Escape") {
    //               document.getElementById(modalId).classList.remove("open")
    //               document.body.classList.remove('no-scroll');
    //             }
    //           });

    //           document.querySelector(".modal.open .modal__box").addEventListener('click', event => {
    //             event._isClickWithInModal = true;
    //           });

    //           document.getElementById(modalId).addEventListener('click', event => {
    //             if (event._isClickWithInModal) return;
    //             event.currentTarget.classList.remove('open');
    //             document.body.classList.remove('no-scroll');
    //           });
    //         });
    //       });
    //     });
    //   }
    // };
    // modalFunc();
    // модальные окна
    // бутстрап 3
    // бутстрап 5

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
          });
        });

        close.forEach((closeButton, i) => {
          const modalId = closeButton.closest('.modal').getAttribute('id');

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

          document.getElementById(modalId).addEventListener('click', event => {

            if (event.target.closest('.modal__box')) return;

            event.currentTarget.classList.remove('open');
            document.body.classList.remove('no-scroll');
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

    $(window).on('resize load', function () {
      if (headerItem.length != 0) {
        Array.from(headerItem).forEach(function (hItem, i, headerItem) {
          if (window.innerWidth <= 768 || hItem.classList.contains('onlyClick')) {
            hItem.addEventListener('click', function (e) {
              e.stopPropagation();
              if (headerActive.length > 0 && headerActive[0] !== this) {
                headerActive[0].classList.remove('header__btn-active');
                // document.querySelector('.menu__body').classList.remove('down');
              }
              this.classList.add('header__btn-active');
              // document.querySelector('.menu__body').classList.add('down');

              window.addEventListener('keydown', (e) => {
                if (e.key === "Escape") {
                  this.classList.remove("header__btn-active")
                }
              });

              // Закрытие меню при клике вне области
              document.addEventListener('click', (event) => {
                if (!hItem.querySelector('.header__dropdown').contains(event.target)) {
                  hItem.classList.remove("header__btn-active");

                  // const menuBody = document.querySelector('.menu__body');
                  // if (menuBody.classList.contains('down')) {
                  //   menuBody.classList.remove('down')
                  // }
                }
              });

              hItem.querySelector('.header__btn-icon').addEventListener('click', (e) => {
                e.stopPropagation();

                hItem.classList.remove("header__btn-active");

                // const menuBody = document.querySelector('.menu__body');
                // if (menuBody.classList.contains('down')) {
                //   menuBody.classList.remove('down')
                // }
              });

            });
          } else {
            hItem.addEventListener('mousemove', function (e) {

              e.stopPropagation();

              if (headerActive.length > 0 && headerActive[0] !== this) {
                headerActive[0].classList.remove('header__btn-active');
                // document.querySelector('.menu__body').classList.remove('down');
              }

              this.classList.add('header__btn-active');
              // document.querySelector('.menu__body').classList.add('down');

              // Закрытие меню при клике вне области
              this.addEventListener('mouseleave', (event) => {
                if (!hItem.querySelector('.header__dropdown').contains(event.target)) {
                  hItem.classList.remove("header__btn-active");

                  // const menuBody = document.querySelector('.menu__body');
                  // if (menuBody.classList.contains('down')) {
                  //   menuBody.classList.remove('down')
                  // }
                }
              });

              hItem.querySelector('.header__btn-icon').addEventListener('click', (e) => {
                e.stopPropagation();

                hItem.classList.remove("header__btn-active");

                // const menuBody = document.querySelector('.menu__body');
                // if (menuBody.classList.contains('down')) {
                //   menuBody.classList.remove('down')
                // }
              });

            });
          }
        });
      }
    });



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

        $('resize load', function (event) {
          if (window.innerWidth < 769 && window.innerWidth !== 769) {
            infoPlate.style.bottom = '8rem';
          }
        });
      } else {
        plate.classList.remove(classToAdd);

        $('resize load', function (event) {
          if (window.innerWidth < 769 && window.innerWidth !== 769) {
            infoPlate.style.bottom = '1.5rem';
          }
        });
      }
    });



    /**
     * Управляет поведением хедером.
     */
    function headerFunc() {
      const header = document.querySelector('header');
      const firstSection = document.querySelector('section');
      let lastScrollTop = 1;
      const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

      window.addEventListener('scroll', () => {
        if (scrollPosition() > lastScrollTop && scrollPosition() > firstSection.offsetHeight) {
          header.classList.add('out');
        } else {
          header.classList.remove('out');
        }
        lastScrollTop = scrollPosition() + 0.13;
      })
    }
    headerFunc();



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
    const accordionParents = document.querySelectorAll('.accordion-parent');

    if (accordionParents.length > 0) {
      accordionParents.forEach((accordionContainer) => {

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
    }



    const fixedBtn = document.getElementById('fixed-btn');
    fixedBtn.addEventListener('click', function () {
      fixedBtn.parentNode.classList.toggle('fixed-btns--active');
    });

    const infoPlate = document.getElementById('info-plate');
    if (infoPlate) {
      const infoPlateClose = document.getElementById('info-close');
      const infoPlateClassName = 'show';
      const delay = 3000;

      const hasSeenPlate = localStorage.getItem('infoPlateSeen');

      if (!hasSeenPlate) {
        setTimeout(() => {
          infoPlate.classList.add(infoPlateClassName);

          localStorage.setItem('infoPlateSeen', 'true');
        }, delay);
      }

      infoPlateClose.addEventListener('click', e => {
        infoPlate.classList.remove(infoPlateClassName);
      });
    }

    // const tgPlate = document.getElementById('telegram-plate');
    // if (tgPlate) {
    //   const tgPlateClose = document.getElementById('telegram-close');
    //   const tgPlateClassName = 'show';
    //   const delay = 3000;

    //   const hasSeenPlate = localStorage.getItem('tgPlateSeen');

    //   if (!hasSeenPlate) {
    //     setTimeout(() => {
    //       tgPlate.classList.add(tgPlateClassName);

    //       localStorage.setItem('tgPlateSeen', 'true');
    //     }, delay);
    //   }

    //   tgPlateClose.addEventListener('click', e => {
    //     tgPlate.classList.remove(tgPlateClassName);
    //   });
    // }



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



    /**
     * Таймлайн
     */
    const TimelineScroll = {

      defaultConfig: {
        breakpoint: 768,
        selectors: {
          placeholder: '.timeline-placeholder',
          container: '.timeline-container',
          timeline: '.timeline',
          wrapper: '.timeline-wrapper',
          items: '.timeline-item',
          btnPrev: '.timeline-button-prev',
          btnNext: '.timeline-button-next'
        }
      },

      init(placeholderSelector = '.timeline-placeholder', customSelectors = {}) {

        this.config = {
          ...this.defaultConfig,
          selectors: { ...this.defaultConfig.selectors, ...customSelectors }
        };

        this.state = {
          rootElement: null,
          timelinePlaceholder: null,
          timelineContainer: null,
          timeline: null,
          timelineWrapper: null,
          timelineItems: null,
          btnPrev: null,
          btnNext: null,

          itemWidth: 0,
          containerWidth: 0,
          totalWidth: 0,
          maxScroll: 0,
          placeholderHeight: 0,
          containerHeight: 0,
          scrollDistance: 0,

          timelineProgress: 0,
          currentIndex: 0,
          isAnimating: false,
          startX: 0,
          startY: 0,
          currentX: 0,
          isDragging: false,
          startScroll: 0,
          xSwipe: false,

          scrollTimeout: null,
          isScrolling: false,

          buttonHoldInterval: null,
          buttonHoldDirection: null,
          buttonHoldDelay: 300,
          buttonHoldSpeed: 100,
          initialButtonPress: true
        };

        this.setRootElement(placeholderSelector);

        this.cacheElements();
        this.calculatePlaceholderHeight();
        this.bindEvents();
        this.updateButtons();
        this.updateActiveItem(0);
        return this;
      },

      setRootElement(selector) {
        const element = typeof selector === 'string'
          ? document.querySelector(selector)
          : selector;

        if (!element) {
          console.warn(`TimelineScroll: Root element not found with selector "${selector}"`);
        }

        this.state.rootElement = element;
      },

      destroy() {
        window.removeEventListener('resize', this.onResize.bind(this));
        this.stopButtonHold();
      },

      next() {
        this.goToIndex(this.state.currentIndex + 1);
      },

      prev() {
        this.goToIndex(this.state.currentIndex - 1);
      },

      goTo(index) {
        this.goToIndex(index);
      },

      getCurrentIndex() {
        return this.state.currentIndex;
      },

      startButtonHold(direction) {
        const s = this.state;

        if (s.buttonHoldInterval) {
          clearInterval(s.buttonHoldInterval);
        }

        s.buttonHoldDirection = direction;
        s.initialButtonPress = true;

        if (direction === 'next') {
          this.next();
        } else {
          this.prev();
        }

        s.buttonHoldInterval = setTimeout(() => {
          s.initialButtonPress = false;
          s.buttonHoldInterval = setInterval(() => {
            if (s.buttonHoldDirection === 'next') {
              this.next();
            } else {
              this.prev();
            }
          }, s.buttonHoldSpeed);
        }, s.buttonHoldDelay);
      },

      stopButtonHold() {
        const s = this.state;

        if (s.buttonHoldInterval) {
          clearTimeout(s.buttonHoldInterval);
          clearInterval(s.buttonHoldInterval);
          s.buttonHoldInterval = null;
          s.buttonHoldDirection = null;
        }
      },

      cacheElements() {
        const s = this.state;
        const selectors = this.config.selectors;

        s.timelinePlaceholder = s.rootElement;
        s.timelineContainer = this.findElement(selectors.container);
        s.timeline = this.findElement(selectors.timeline);
        s.timelineWrapper = this.findElement(selectors.wrapper);
        s.timelineItems = this.findElement(selectors.items, true);
        s.btnPrev = this.findElement(selectors.btnPrev);
        s.btnNext = this.findElement(selectors.btnNext);

        this.validateRequiredElements();
      },

      findElement(selector, all = false) {
        if (all) {
          return this.state.rootElement.querySelectorAll(selector);
        }
        return this.state.rootElement.querySelector(selector);
      },

      validateRequiredElements() {
        const s = this.state;
        const required = [
          { element: s.timelineContainer, name: 'container' },
          { element: s.timeline, name: 'timeline' },
          { element: s.timelineWrapper, name: 'wrapper' },
          { element: s.timelineItems, name: 'items' }
        ];

        required.forEach(({ element, name }) => {
          if (!element || (Array.isArray(element) && element.length === 0)) {
            console.warn(`TimelineScroll: Required element "${name}" not found with selector "${this.config.selectors[name]}"`)
          }
        });
      },

      isMobileDevice() {
        return window.innerWidth <= this.config.breakpoint;
      },

      calculatePlaceholderHeight() {
        const s = this.state;

        if (this.isMobileDevice()) {
          s.timelinePlaceholder.style.height = 'auto';
          return;
        }

        s.containerHeight = s.timelineContainer.offsetHeight;
        s.itemWidth = s.timelineItems[0].offsetWidth;
        s.containerWidth = s.timeline.offsetWidth;
        s.totalWidth = s.itemWidth * s.timelineItems.length;
        s.maxScroll = Math.max(0, s.totalWidth - s.containerWidth);
        s.scrollDistance = s.maxScroll;
        s.placeholderHeight = s.containerHeight + s.scrollDistance;

        s.timelinePlaceholder.style.height = `${s.placeholderHeight}px`;
      },

      updateButtons() {
        const s = this.state;
        if (this.isMobileDevice() || !s.btnPrev || !s.btnNext) return;

        s.btnPrev.disabled = s.currentIndex === 0;
        s.btnNext.disabled = s.currentIndex === s.timelineItems.length - 1;
      },

      goToIndex(index) {
        if (this.isMobileDevice()) {
          return this.goToIndexMobile(index);
        }

        const s = this.state;
        if (s.isAnimating) return;

        index = Math.max(0, Math.min(index, s.timelineItems.length - 1));
        if (index === s.currentIndex) return;

        s.isAnimating = true;

        const maxIndex = s.timelineItems.length - 1;
        const targetProgress = index / maxIndex;
        const containerTop = s.timelinePlaceholder.offsetTop;
        const targetScroll = containerTop + (targetProgress * s.scrollDistance);

        lenis.scrollTo(targetScroll, {
          duration: 0.4, // Было 0.7, стало 0.4
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            s.isAnimating = false;
          }
        });
      },

      goToIndexMobile(index) {
        const s = this.state;
        index = Math.max(0, Math.min(index, s.timelineItems.length - 1));
        const item = s.timelineItems[index];
        const itemLeft = item.offsetLeft;
        const itemWidth = item.offsetWidth;
        const containerWidth = s.timeline.offsetWidth;

        const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);

        s.timeline.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });

        this.updateActiveItemMobile(index);
      },

      updateTimeline(scrollY) {
        const s = this.state;
        if (this.isMobileDevice()) return;

        const containerTop = s.timelinePlaceholder.offsetTop;

        let scrollProgress = (scrollY - containerTop) / s.scrollDistance;
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));

        if (scrollY >= containerTop && scrollY <= containerTop + s.scrollDistance) {
          s.timelineProgress = scrollProgress;

          const translateX = -s.timelineProgress * s.maxScroll;
          s.timelineWrapper.style.transform = `translateX(${translateX}px)`;

          this.updateActiveItem(s.timelineProgress);

        } else {
          if (scrollY < containerTop) {
            s.timelineProgress = 0;
            s.timelineWrapper.style.transform = 'translateX(0px)';
            this.updateActiveItem(0);
          } else if (scrollY > containerTop + s.scrollDistance) {
            s.timelineProgress = 1;
            s.timelineWrapper.style.transform = `translateX(${-s.maxScroll}px)`;
            this.updateActiveItem(1);
          }
        }
      },

      updateActiveItem(progress) {
        const s = this.state;
        const maxIndex = s.timelineItems.length - 1;
        const newIndex = Math.min(
          maxIndex,
          Math.round(progress * maxIndex)
        );

        if (newIndex !== s.currentIndex) {
          s.currentIndex = newIndex;

          s.timelineItems.forEach((item, index) => {
            item.classList.toggle('timeline-active', index === s.currentIndex);
          });

          this.updateButtons();
        }
      },

      updateActiveItemMobile(index) {
        const s = this.state;
        if (index !== s.currentIndex) {
          s.currentIndex = index;

          s.timelineItems.forEach((item, i) => {
            item.classList.toggle('timeline-active', i === s.currentIndex);
          });
        }
      },

      handleMobileScroll() {
        const s = this.state;
        if (!this.isMobileDevice()) return;

        clearTimeout(s.scrollTimeout);
        s.isScrolling = true;

        const scrollLeft = s.timeline.scrollLeft;
        const containerWidth = s.timeline.offsetWidth;
        const itemWidth = s.timelineItems[0].offsetWidth;

        const center = scrollLeft + (containerWidth / 2);

        let closestIndex = 0;
        let minDistance = Infinity;

        s.timelineItems.forEach((item, index) => {
          const itemLeft = item.offsetLeft;
          const itemCenter = itemLeft + (itemWidth / 2);
          const distance = Math.abs(center - itemCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        this.updateActiveItemMobile(closestIndex);

        s.scrollTimeout = setTimeout(() => {
          s.isScrolling = false;

          if (!s.isScrolling) {
            this.goToIndex(closestIndex);
          }
        }, 100);
      },

      handleTouchStart(e) {
        const s = this.state;
        if (s.isAnimating) return;

        s.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        s.startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        s.currentX = parseInt(getComputedStyle(s.timelineWrapper).transform.split(',')[4] || 0, 10);
        s.startScroll = lenis.scroll;
        s.isDragging = true;
        s.xSwipe = false;
        s.timelineWrapper.classList.add('grabbing');
      },

      handleTouchMove(e) {
        const s = this.state;
        if (!s.isDragging) return;
        e.preventDefault();

        const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        if (!s.xSwipe) {
          const diffX = Math.abs(x - s.startX);
          const diffY = Math.abs(y - s.startY);

          if (diffY > diffX && diffY > 10) {
            s.isDragging = false;
            s.timelineWrapper.classList.remove('grabbing');
            return;
          }

          if (diffX > 10) {
            s.xSwipe = true;
            e.preventDefault();
          }
        }

        if (s.xSwipe) {
          const diff = x - s.startX;

          let newX = s.currentX + diff;

          newX = Math.min(Math.max(newX, -s.maxScroll), 0);

          s.timelineWrapper.style.transform = `translateX(${newX}px)`;

          lenis.scrollTo(s.startScroll, { immediate: true });
        }
      },

      handleTouchEnd(e) {
        const s = this.state;
        if (!s.isDragging) return;
        s.isDragging = false;
        s.timelineWrapper.classList.remove('grabbing');

        const x = e.type === 'touchend' ? (e.changedTouches ? e.changedTouches[0].clientX : 0) : e.clientX;
        const diff = x - s.startX;
        const velocity = diff / 100;

        if (Math.abs(diff) > 50 || Math.abs(velocity) > 0.5) {
          if (diff > 0) {
            this.goToIndex(s.currentIndex - 1);
          } else {
            this.goToIndex(s.currentIndex + 1);
          }
        } else {
          this.goToIndex(s.currentIndex);
        }
      },

      onLenisScroll({ scroll }) {
        if (!this.state.isDragging) {
          this.updateTimeline(scroll);
        }
      },

      onResize() {
        this.calculatePlaceholderHeight();
        this.updateTimeline(lenis.scroll);
        this.updateButtons();
      },

      bindEvents() {
        const s = this.state;

        if (s.btnPrev) {
          s.btnPrev.addEventListener('click', () => {
            this.goToIndex(s.currentIndex - 1);
          });

          s.btnPrev.addEventListener('mousedown', () => {
            this.startButtonHold('prev');
          });

          s.btnPrev.addEventListener('touchstart', () => {
            this.startButtonHold('prev');
          });

          s.btnPrev.addEventListener('mouseup', () => {
            this.stopButtonHold();
          });

          s.btnPrev.addEventListener('touchend', () => {
            this.stopButtonHold();
          });

          s.btnPrev.addEventListener('mouseleave', () => {
            this.stopButtonHold();
          });
        }

        if (s.btnNext) {
          s.btnNext.addEventListener('click', () => {
            this.goToIndex(s.currentIndex + 1);
          });

          s.btnNext.addEventListener('mousedown', () => {
            this.startButtonHold('next');
          });

          s.btnNext.addEventListener('touchstart', () => {
            this.startButtonHold('next');
          });

          s.btnNext.addEventListener('mouseup', () => {
            this.stopButtonHold();
          });

          s.btnNext.addEventListener('touchend', () => {
            this.stopButtonHold();
          });

          s.btnNext.addEventListener('mouseleave', () => {
            this.stopButtonHold();
          });
        }

        document.addEventListener('mouseup', () => {
          this.stopButtonHold();
        });

        document.addEventListener('touchend', () => {
          this.stopButtonHold();
        });

        if (!this.isMobileDevice()) {
          s.timelineWrapper.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
          s.timelineWrapper.addEventListener('mousedown', this.handleTouchStart.bind(this));

          s.timelineWrapper.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
          s.timelineWrapper.addEventListener('mousemove', this.handleTouchMove.bind(this));

          s.timelineWrapper.addEventListener('touchend', this.handleTouchEnd.bind(this));
          s.timelineWrapper.addEventListener('mouseup', this.handleTouchEnd.bind(this));
          s.timelineWrapper.addEventListener('mouseleave', this.handleTouchEnd.bind(this));
        }

        s.timeline.addEventListener('scroll', this.handleMobileScroll.bind(this));

        lenis.on('scroll', this.onLenisScroll.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
      }
    };

    TimelineScroll.create = function (placeholderSelector = '.timeline-placeholder', customSelectors = {}) {
      const instance = Object.create(this);
      return instance.init(placeholderSelector, customSelectors);
    };
    // можно вынести в отдельный файл - КОНЕЦ

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (document.getElementById('timelinePlaceholder')) {
      const timeline = TimelineScroll.create('#timelinePlaceholder');
    }



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