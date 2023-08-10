//Pets info
const petPics = document.querySelectorAll('.pet-pic');
const petNames = document.querySelectorAll('.pet-name');

async function getPets() {
  const res = await fetch('../../js/pets.json');
  const pets = await res.json();
  pets.sort(makeRandomArr);
  fillCard(pets);
}

function fillCard(data) {
  for (let i = 0; i < data.length; i++) {
    petPics[i].src = data[i].img;
    petNames[i].innerHTML = data[i].name;
    cardArray[i].setAttribute('id', data[i].name.toLowerCase());
    cardArray[i].addEventListener('click', fillPopup);
  }
}

function makeRandomArr(a, b) {
  return Math.random() - 0.5;
}

getPets();

//Carousel
const cards = document.querySelector('.slider-cards');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const frame = document.querySelector('.slider-frame');
let cardArray = document.querySelectorAll('.card');

const moveLeft = () => {
  cards.classList.add('transition-left');
  leftBtn.removeEventListener('click', moveLeft);
  rightBtn.removeEventListener('click', moveRight);
};
const moveRight = () => {
  addCard();
  cards.classList.add('transition-right');
  leftBtn.removeEventListener('click', moveLeft);
  rightBtn.removeEventListener('click', moveRight);
};

function addCard() {
  if (frame.clientWidth === 1020) {
    let firstCardClone = cardArray[0].cloneNode(true);
    cards.style.width = `${cards.clientWidth + 360}px`;
    cards.appendChild(firstCardClone);
  }
}

function shiftCards(direction, step) {
  if (direction === 'left') {
    for (let i = 0; i < step; i++) {
      cards.insertBefore(cardArray[cardArray.length - 1 - i], cardArray[0]);
    }
  } else {
    if (frame.clientWidth === 1020) {
      cards.removeAttribute('style');
      cards.removeChild(cards.lastChild);
    }
    for (let i = 0; i < step; i++) {
      cards.appendChild(cardArray[i]);
    }
  }
  cardArray = document.querySelectorAll('.card');
}

leftBtn.addEventListener('click', moveLeft);
rightBtn.addEventListener('click', moveRight);

cards.addEventListener('animationend', (animationEvent) => {
  let dir;
  let shownCards = Math.floor(frame.clientWidth / 270);
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
