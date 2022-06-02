//Adding cards
async function getPets() {
  const res = await fetch('../../js/pets.json');
  const pets = await res.json();
  pets.sort(makeRandomArr);
  fillCard(pets);
}

function makeRandomArr(a, b) {
  return Math.random() - 0.5;
}

const cards = document.querySelector('.slider-cards');
const CARDS_NUMBER = 48;
for (let i = 0; i < CARDS_NUMBER; i++) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML =
    '<img class="pet-pic" src alt="pet-pic"><h3 class="pet-name"></h3><button class="button transp-btn">Learn more</button>';
  cards.append(card);
}

let cardArray = document.querySelectorAll('.card');
let petPics = document.querySelectorAll('.pet-pic');
let petNames = document.querySelectorAll('.pet-name');

function fillCard(data) {
  let ratio = cardArray.length / data.length;

  for (let i = 0; i < ratio; i++) {
    for (let j = 0; j < data.length; j++) {
      petPics[j + data.length * i].src = data[j].img;
      petNames[j + data.length * i].innerHTML = data[j].name;
      cardArray[j + data.length * i].setAttribute(
        'id',
        data[j].name.toLowerCase()
      );
      cardArray[j + data.length * i].addEventListener('click', fillPopup);
    }
  }
}

getPets();

//Pagination
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const begBtn = document.querySelector('.beginning-btn');
const endBtn = document.querySelector('.ending-btn');
let pgIndicator = document.querySelector('.page-num');
const frame = document.querySelector('.slider-frame');
let colShown = Math.floor(frame.clientWidth / 270);
let pagesAvail = Math.floor(cards.scrollWidth / frame.clientWidth);
let curPage = 1;
let position = 0;

rightBtn.addEventListener('click', moveRight);
endBtn.addEventListener('click', moveToEnd);

function moveRight() {
  if (curPage === 1) {
    activateBtn(leftBtn, moveLeft);
    activateBtn(begBtn, moveToStart);
  }
  cards.style.left = `${position - colShown * 310}px`;
  position -= colShown * 310;
  curPage += 1;
  pgIndicator.innerHTML = curPage;
  rightCheck(curPage);
}

function moveToEnd() {
  if (curPage === 1) {
    activateBtn(leftBtn, moveLeft);
    activateBtn(begBtn, moveToStart);
  }
  position = -colShown * 310 * (pagesAvail - 1);
  cards.style.left = `${position}px`;
  curPage = pagesAvail;
  pgIndicator.innerHTML = curPage;
  deActivateBtn(rightBtn, moveRight);
  deActivateBtn(endBtn, moveToEnd);
}

function moveLeft() {
  if (curPage === pagesAvail) {
    activateBtn(rightBtn, moveRight);
    activateBtn(endBtn, moveToEnd);
  }
  cards.style.left = `${position + colShown * 310}px`;
  position += colShown * 310;
  curPage -= 1;
  pgIndicator.innerHTML = curPage;
  leftCheck(curPage);
}

function moveToStart() {
  if (curPage === pagesAvail) {
    activateBtn(rightBtn, moveRight);
    activateBtn(endBtn, moveToEnd);
  }
  position = 0;
  cards.style.left = '0px';
  curPage = 1;
  pgIndicator.innerHTML = 1;
  deActivateBtn(leftBtn, moveLeft);
  deActivateBtn(begBtn, moveToStart);
}

function rightCheck(page) {
  if (page === pagesAvail) {
    deActivateBtn(rightBtn, moveRight);
    deActivateBtn(endBtn, moveToEnd);
  }
}

function leftCheck(page) {
  if (page === 1) {
    deActivateBtn(leftBtn, moveLeft);
    deActivateBtn(begBtn, moveToStart);
  }
}

function activateBtn(button, move) {
  button.classList.remove('inactive');
  button.classList.add('active');
  button.addEventListener('click', move);
}

function deActivateBtn(button, move) {
  button.classList.remove('active');
  button.classList.add('inactive');
  button.removeEventListener('click', move);
}
