const navItem = document.querySelectorAll('.nav-item');
let activeNavItem = document.querySelector('.active-nav');

navItem.forEach((element) => {
  element.addEventListener('click', function (e) {
    if (!element.classList.contains('active-nav')) {
      activeNavItem.classList.remove('active-nav');
      element.classList.add('active-nav');
      activeNavItem = element;
    }
  });
});

// async function getPets() {
//   const res = await fetch('pets.json');
//   const data = await res.json();
//   console.log(data);
// }

// getPets();
