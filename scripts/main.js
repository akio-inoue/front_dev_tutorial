document.addEventListener('DOMContentLoaded', function () {
  const hero = new HeroSlider('.swiper');
  hero.start();

  const cb = function(el, isIntersecting) {
    if(isIntersecting) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

  const so = new ScrollObserver('.tween-animate-title', cb);
});
