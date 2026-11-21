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
