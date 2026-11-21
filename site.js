// Hero date bar (desktop): glide down to the Lodgify box and open its real calendar, so guests
// pick from actual availability. Without JavaScript the links simply jump to #book.
(function () {
  var links = document.querySelectorAll('[data-open-calendar]');
  if (!links.length) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var box = document.getElementById('lodgify-book-now-box');
      var book = document.getElementById('book');
      if (!box || !book) return;
      e.preventDefault();
      var done = false;
      function open() {
        if (done) return;
        done = true;
        var trigger = box.querySelector('[data-testid="book-now-box.date-picker.trigger"]');
        if (trigger) { trigger.click(); trigger.focus({ preventScroll: true }); }
      }
      if ('onscrollend' in window) window.addEventListener('scrollend', open, { once: true });
      setTimeout(open, reduce ? 50 : 1100);
      box.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      if (history.replaceState) history.replaceState(null, '', '#book');
    });
  });
})();

// Phones and tablets: a small "Book now" button that waits at the bottom of the screen
// once you've scrolled past the top of the page, and steps aside when the page's own
// booking section is in view.
(function () {
  var btn = document.querySelector('.sticky-book');
  if (!btn) return;
  var top = document.querySelector('.hero') || document.querySelector('header.top');
  var book = document.getElementById('book') || document.querySelector('.g-cta');
  if (!('IntersectionObserver' in window) || !top) { btn.classList.add('show'); return; }
  var pastTop = false, atBook = false;
  function update() { btn.classList.toggle('show', pastTop && !atBook); }
  new IntersectionObserver(function (e) { pastTop = !e[0].isIntersecting; update(); }).observe(top);
  if (book) new IntersectionObserver(function (e) { atBook = e[0].isIntersecting; update(); }).observe(book);
})();
