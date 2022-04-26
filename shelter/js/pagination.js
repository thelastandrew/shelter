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

const paginationBoard = document.querySelector('.pagination-cards');
const CARDS_NUMBER = 48;
for (let i = 0; i < CARDS_NUMBER; i++) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML =
    '<img class="pet-pic" src alt="pet-pic"><h3 class="pet-name"></h3><button class="button transp-btn">Learn more</button>';
  paginationBoard.append(card);
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
    }
  }
}

getPets();
