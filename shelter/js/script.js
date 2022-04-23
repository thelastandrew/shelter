//Navbar and burger menu
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
let cardArray = document.querySelectorAll('.card');

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

function shiftCards(direction, step) {
  for (let i = 0; i < step; i++) {
    if (direction === 'left') {
      cards.insertBefore(cardArray[cardArray.length - 1 - i], cardArray[0]);
    } else {
      cards.appendChild(cardArray[i]);
    }
  }
  cardArray = document.querySelectorAll('.card');
}

leftBtn.addEventListener('click', moveLeft);
rightBtn.addEventListener('click', moveRight);

cards.addEventListener('animationend', (animationEvent) => {
  let dir;
  let shownCards = Math.floor(
    document.querySelector('.slider-frame').clientWidth / 270
  );
  if (animationEvent.animationName === 'move-left') {
    dir = 'left';
    cards.classList.remove('transition-left');
  } else {
    dir = 'right';
    cards.classList.remove('transition-right');
  }
  shiftCards(dir, shownCards);
  leftBtn.addEventListener('click', moveLeft);
  rightBtn.addEventListener('click', moveRight);
});
