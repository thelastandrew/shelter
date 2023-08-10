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

//Pop up
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup-close');
let name = document.querySelector('.popup-title');
let img = document.querySelector('.popup-pic');
let animalType = document.querySelector('.animalType');
let breed = document.querySelector('.breed');
let description = document.querySelector('.popup-info');
let age = document.querySelector('.popup-age');
let inoculations = document.querySelector('.popup-inoculations');
let diseases = document.querySelector('.popup-diseases');
let parasites = document.querySelector('.popup-parasites');

closePopupBtn.addEventListener('click', () => {
  popup.classList.remove('active');
  body.classList.remove('blocked');
});

popup.addEventListener('click', (e) => {
  if (e.target.classList.contains('active')) {
    popup.classList.remove('active');
    body.classList.remove('blocked');
  }
});

async function fillPopup() {
  const res = await fetch('../../js/pets.json');
  const pets = await res.json();
  let petID = this.id;
  showPopup(pets, petID);
}

function showPopup(data, myID) {
  let petIndex;
  for (let i = 0; i < data.length; i++) {
    if (data[i].name.toLowerCase() === myID) {
      petIndex = i;
    }
  }

  let petObj = data[petIndex];

  name.innerHTML = petObj.name;
  img.src = petObj.img;
  animalType.innerHTML = petObj.type;
  breed.innerHTML = petObj.breed;
  description.innerHTML = petObj.description;
  age.innerHTML = petObj.age;
  inoculations.innerHTML = petObj.inoculations.join(', ');
  diseases.innerHTML = petObj.diseases.join(', ');
  parasites.innerHTML = petObj.parasites.join(', ');
  popup.classList.add('active');
  body.classList.add('blocked');
}

popup.onmouseover = (e) => {
  if (e.target === e.currentTarget) closePopupBtn.classList.add('hovered');
};

popup.onmouseout = (e) => {
  if (e.target === e.currentTarget) closePopupBtn.classList.remove('hovered');
};
