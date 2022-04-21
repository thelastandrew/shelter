const navItem = document.querySelectorAll('.nav-item');
const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav');
const body = document.querySelector('body');
let activeNavItem = document.querySelector('.active-nav');

navItem.forEach((element) => {
  element.addEventListener('click', function (e) {
    if (!element.classList.contains('active-nav')) {
      activeNavItem.classList.remove('active-nav');
      element.classList.add('active-nav');
      activeNavItem = element;
    }

    if (body.classList.contains('blocked')) {
      body.classList.remove('blocked');
      burgerMenu.classList.remove('active');
      nav.classList.remove('show');
    }
  });
});

burgerMenu.addEventListener('click', (el) => {
  burgerMenu.classList.toggle('active');
  body.classList.toggle('blocked');
  nav.classList.toggle('show');
});

nav.addEventListener('click', (e) => {
  if (e.target.classList.contains('show')) {
    body.classList.remove('blocked');
    burgerMenu.classList.remove('active');
    nav.classList.remove('show');
  }
});
