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
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
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



    // let children = [
    //   {
    //     label: 'Dev Blog',
    //     url: 'http://niklasknaack.blogspot.de/',
    //     target: '_top',
    //     tooltip: 'Lorem ipsum',
    //   },
    //   {
    //     label: 'Flashforum',
    //     url: 'http://www.flashforum.de/',
    //     target: '_top',
    //     tooltip: 'Dolor sit amet',
    //   },
    //   {
    //     label: 'jQueryScript',
    //     url: 'http://www.jqueryscript.net/',
    //     target: '_top',
    //     tooltip: 'Consetetur sadipscing',
    //   },
    //   {
    //     label: 'Javascript-Forum',
    //     url: 'http://forum.jswelt.de/',
    //     target: '_top',
    //     tooltip: 'Sed diam',
    //   },
    //   { label: 'JSFiddle', url: 'https://jsfiddle.net/user/NiklasKnaack/fiddles/', target: '_top' },
    //   { label: 'CodePen', url: 'http://codepen.io/', target: '_top', tooltip: 'At vero' },
    //   { label: 'three.js', url: 'http://threejs.org/', target: '_top', tooltip: 'Nonumy eirmod' },
    //   {
    //     label: 'WebGLStudio.js',
    //     url: 'http://webglstudio.org/',
    //     target: '_top',
    //     tooltip: 'Stet clita',
    //   },
    //   { label: 'JS Compress', url: 'http://jscompress.com/', target: '_top', tooltip: 'Justo duo' },
    //   { label: 'TinyPNG', url: 'https://tinypng.com/', target: '_top', tooltip: 'Ut wisi enim' },
    //   { label: 'Can I Use', url: 'http://caniuse.com/', target: '_top', tooltip: 'Minim veniam' },
    //   { label: 'URL shortener', url: 'https://goo.gl/', target: '_top', tooltip: 'Quis nostrud' },
    //   {
    //     label: 'HTML Encoder',
    //     url: 'http://www.opinionatedgeek.com/DotNet/Tools/HTMLEncode/Encode.aspx',
    //     target: '_top',
    //   },
    //   {
    //     label: 'Twitter',
    //     url: 'https://twitter.com/niklaswebdev',
    //     target: '_top',
    //     tooltip: 'Veniam isictus',
    //   },
    //   {
    //     label: 'deviantART',
    //     url: 'http://nkunited.deviantart.com/',
    //     target: '_top',
    //     tooltip: 'Autem insto',
    //   },
    //   { label: 'Gulp', url: 'http://gulpjs.com/', target: '_top', tooltip: 'Officia dolor' },
    //   {
    //     label: 'Browsersync',
    //     url: 'https://www.browsersync.io/',
    //     target: '_top',
    //     tooltip: 'Digi tal',
    //   },
    //   { label: 'GitHub', url: 'https://github.com/', target: '_top', tooltip: 'Amet et quam' },
    //   {
    //     label: 'Shadertoy',
    //     url: 'https://www.shadertoy.com/',
    //     target: '_top',
    //     tooltip: 'Meno equox',
    //   },
    //   {
    //     label: 'Starling',
    //     url: 'http://gamua.com/starling/',
    //     target: '_top',
    //     tooltip: 'Duis autem',
    //   },
    //   { label: 'jsPerf', url: 'http://jsperf.com/', target: '_top', tooltip: 'Soluta nobis' },
    //   {
    //     label: 'Foundation',
    //     url: 'http://foundation.zurb.com/',
    //     target: '_top',
    //     tooltip: 'Blandit praesent',
    //   },
    //   { label: 'CreateJS', url: 'http://createjs.com/', target: '_top', tooltip: 'Dignissim qui' },
    //   {
    //     label: 'Velocity.js',
    //     url: 'http://julian.com/research/velocity/',
    //     target: '_top',
    //     tooltip: 'Et iusto odio',
    //   },
    //   {
    //     label: 'TweenLite',
    //     url: 'https://greensock.com/docs/#/HTML5/GSAP/TweenLite/',
    //     target: '_top',
    //     tooltip: 'Facilisis at vero',
    //   },
    //   { label: 'jQuery', url: 'https://jquery.com/', target: '_top', tooltip: 'Dolore eu' },
    //   {
    //     label: 'jQuery Rain',
    //     url: 'http://www.jqueryrain.com/',
    //     target: '_top',
    //     tooltip: 'In vulputate',
    //   },
    //   {
    //     label: 'jQuery Plugins',
    //     url: 'http://jquery-plugins.net/',
    //     target: '_top',
    //     tooltip: 'In vulputate',
    //   },
    // ];

    // let settings1 = {
    //   children: children,
    //   width: 960,
    //   height: 640,
    //   radius: '65%',
    //   radiusMin: 75,
    //   isDrawSvgBg: true,
    //   svgBgColor: 'linear-gradient(#e66465, #9198e5)',
    //   opacityOver: 1.0,
    //   opacityOut: 0.3,
    //   opacitySpeed: 6,
    //   fov: 800,
    //   speed: 0.1,
    //   fontFamily: 'Oswald, Arial, sans-serif',
    //   fontSize: '15',
    //   fontColor: '#fff',
    //   fontWeight: 'normal', //bold
    //   fontStyle: 'normal', //italic
    //   fontStretch: 'narrower', //wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    //   fontToUpperCase: true,
    //   tooltipFontFamily: 'Oswald, Arial, sans-serif',
    //   tooltipFontSize: '12',
    //   tooltipFontColor: '#fff',
    //   tooltipFontWeight: 'normal', //bold
    //   tooltipFontStyle: 'italic', //italic
    //   tooltipFontStretch: 'normal', //wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    //   tooltipFontToUpperCase: false,
    //   tooltipTextAnchor: 'left',
    //   tooltipDiffX: 10,
    //   tooltipDiffY: 10,
    //   animatingSpeed: 0.01,
    //   animatingRadiusLimit: 1.3,
    // };

    // new SVG3DTagCloud(document.getElementById('#textcloud'), settings1).build();






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