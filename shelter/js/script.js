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

//Carousel
const cards = document.querySelector('.slider-cards');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

const moveLeft = () => {
  cards.classList.add('transition-left');
  leftBtn.removeEventListener('click', moveLeft);
  rightBtn.removeEventListener('click', moveRight);
};
const moveRight = () => {
  cards.classList.add('transition-right');
  leftBtn.removeEventListener('click', moveLeft);
  rightBtn.removeEventListener('click', moveRight);
};

leftBtn.addEventListener('click', moveLeft);
rightBtn.addEventListener('click', moveRight);

cards.addEventListener('animationend', (animationEvent) => {
  if (animationEvent.animationName === 'move-left') {
    cards.classList.remove('transition-left');
  } else {
    cards.classList.remove('transition-right');
  }
  leftBtn.addEventListener('click', moveLeft);
  rightBtn.addEventListener('click', moveRight);
});
