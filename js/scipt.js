const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbarMenu');
const navLogo = document.querySelector('#navbar-logo');
const navbarLinks = document.querySelectorAll('.navbarLinks');

// Display mobile menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
}
menu.addEventListener('click', mobileMenu);
navbarLinks.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
    const aboutMenu = document.querySelector('#about-page');
    const projectsMenu = document.querySelector('#projects-page');
    const contactMenu = document.querySelector('#contact-page');

    let scrollPos = window.scrollY;

    // Adds highlight class to the menu item that is active
    if (window.innerWidth > 960 && scrollPos  < 600) {
        homeMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos > 600 && scrollPos < 1600) {
        aboutMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        projectsMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos > 1600 && scrollPos < 2400) {
        projectsMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        aboutMenu.classList.remove('highlight');
        contactMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos > 2400) {
        contactMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        aboutMenu.classList.remove('highlight');
        projectsMenu.classList.remove('highlight');
        return;
    }

    if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
        elem.classList.remove('highlight');
      }
}

window.addEventListener('scroll', highlightMenu);
