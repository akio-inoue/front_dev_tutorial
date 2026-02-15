import '../styles/vendors/css-reset.css';
import '../styles/vendors/swiper-bundle.min.css';
import '../styles/style.css';
import Pace from 'pace-js';
Pace.start();

import { HeroSlider } from './libs/hero-slider';
import { ScrollObserver } from './libs/scroll';
import { MobileMenu } from './libs/mobile-menu';
import { TweenTextAnimation } from './libs/text-animation';

class Main {
  #observers;

  constructor() {
    this.header = document.querySelector('.header');
    this.hero = new HeroSlider('.swiper');
    this.sides = document.querySelectorAll('.side');
    this.#observers = [];
    this.#init();
  }

  #init() {
    new MobileMenu();
    Pace.on('done', this.#scrollInit.bind(this));
  }

  destroy = () => {
    this.#observers.forEach((so) => so.destroy());
  };

  #scrollInit = () => {
    this.#observers.push(
      new ScrollObserver('#main-content', this.#sideAnimation, {
        once: false,
        rootMargin: '-300px 0px',
      }),
      new ScrollObserver('.swiper', this.#toggleSlideAnimation, {
        once: false,
      }),
      new ScrollObserver('.tween-animate-title', this.#textAnimation),
      new ScrollObserver('.nav-trigger', this.#navAnimation, {
        once: false,
      }),
      new ScrollObserver('.cover-slide', this.#inviewAnimation),
      new ScrollObserver('.appear', this.#inviewAnimation),
    );
  };

  #toggleSlideAnimation = (el, inview) => {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  };

  #textAnimation = (el, inview) => {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  };

  #navAnimation = (el, inview) => {
    if (inview) {
      this.header.classList.remove('triggered');
    } else {
      this.header.classList.add('triggered');
    }
  };

  #sideAnimation = (el, inview) => {
    if (inview) {
      this.sides.forEach((side) => side.classList.add('inview'));
    } else {
      this.sides.forEach((side) => side.classList.remove('inview'));
    }
  };

  #inviewAnimation = (el, inview) => {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove('inview');
    }
  };
}

new Main();
