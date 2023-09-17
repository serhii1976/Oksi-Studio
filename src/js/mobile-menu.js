(() => {
  const refs = {
    openMenuButton: document.querySelector('.header__burger'),
    closeMenuButton: document.querySelector('.menu-mob__btn'),
    mobileMenu: document.querySelector('.backdrop'),
    mobileNavigation: document.querySelector('.navigation_list'),
    mobileBody: document.querySelector('body'),
  };

  refs.openMenuButton.addEventListener('click', toggleMenu);
  refs.closeMenuButton.addEventListener('click', toggleMenu);
  refs.mobileNavigation.addEventListener('click', toggleMenu);

  function toggleMenu() {
    refs.mobileMenu.classList.toggle('is-hidden');
    refs.mobileBody.classList.toggle('overflowHidden');
  }
})();
