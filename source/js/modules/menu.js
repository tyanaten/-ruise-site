const OPEN_STATE = 'open';
const CLOSE_STATE = 'closed';

const scrollButtons = document.querySelectorAll('[data-scroll-button]');

const navToggle = document.querySelector('.main-header__toggler');
const changedHeaderElements = document.querySelectorAll('[data-header-state="no-js"]');

const menu = document.querySelector('.main-header__wrapper');

const breakpoint = window.matchMedia('(min-width:768px)');

const setHeaderState = (state) => {
  changedHeaderElements.forEach((element) => {
    element.setAttribute('data-header-state', state);
  });
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    setHeaderState(CLOSE_STATE);
  }
};

breakpoint.addListener(breakpointChecker);
breakpointChecker();

scrollButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (menu.getAttribute('data-header-state') === 'open') {
      setHeaderState(CLOSE_STATE);
    }

    let scrollView = document.querySelector(button.getAttribute('data-sroll-view'));
    scrollView.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

document.addEventListener('click', (e) => {
  const withinBoundaries = e.composedPath().includes(menu);

  if (!withinBoundaries) {
    setHeaderState(CLOSE_STATE);
  }
});

document.addEventListener('keydown', function (e) {
  if (e.keyCode === 27) {
    setHeaderState(CLOSE_STATE);
  }
});

setHeaderState(CLOSE_STATE);

navToggle.addEventListener('click', () => {
  if (navToggle.getAttribute('data-header-state') === 'closed') {
    setHeaderState(OPEN_STATE);
  } else {
    setHeaderState(CLOSE_STATE);
  }
});
