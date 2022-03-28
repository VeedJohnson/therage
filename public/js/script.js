//preloader
window.addEventListener('load',function(){
  document.querySelector('body').classList.add("loaded");
});

window.addEventListener('scroll', function(){
  const header = this.document.querySelector("header");
  const head = this.document.querySelector(".head");
  header.classList.toggle ("sticky", window.scrollY > 0);
  head.classList.toggle ("sticky", window.scrollY > 0);
})

//mobile menu
const menuBtn = document.querySelector(".menu-btn");
const hamburger = document.querySelector(".menu-btn_burger");
const nav = document.querySelector(".nav");
const menuNav = document.querySelector(".menu-nav");
const navItems = document.querySelectorAll(".menu-nav_item");
const useMe1 = document.getElementById("use-me-1");
const useMe2 = document.getElementById("use-me-2");
const useMe3 = document.getElementById("use-me-3");
const header = document.querySelector("header");

const sectionOneOptions = {
    rootMargin: "-200px 0px 0px 0px"
  };
  
  const sectionOneObserver = new IntersectionObserver(function(
    entries,
    sectionOneObserver
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        header.classList.add("nav-scrolled");
      } else {
        header.classList.remove("nav-scrolled");
      }
    });
  },
  sectionOneOptions);
  

let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);
useMe1.addEventListener("click", toggleMenu);
useMe2.addEventListener("click", toggleMenu);
useMe3.addEventListener("click", toggleMenu);


function toggleMenu(){
    if(!showMenu) {
        hamburger.classList.add("open");
        nav.classList.add("open");
        menuNav.classList.add("open");
        navItems.forEach(item => item.classList.add("open"));

        showMenu =true;
    } else {
        hamburger.classList.remove("open");
        nav.classList.remove("open");
        menuNav.classList.remove("open");
        navItems.forEach(item => item.classList.remove("open"));

        showMenu =false;
    }
}

//modal babyyy
const modal = document.querySelector('.modal');
const modalCtn = document.querySelector('.modal-container');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.reg');

const openModal = function () {
  modalCtn.style.display = "flex";
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  modalCtn.style.display = "none";
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const spans = document.querySelectorAll('.home-name span');

spans.forEach((span, idx) => {
	span.addEventListener('click', (e) => {
		e.target.classList.add('active');
	});
	span.addEventListener('animationend', (e) => {
		e.target.classList.remove('active');
	});
	
	// Initial animation
	setTimeout(() => {
		span.classList.add('active');
	}, 750 * (idx+1))
});