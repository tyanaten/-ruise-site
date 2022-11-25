const OPEN_STATE = 'open';
const CLOSE_STATE = 'closed';

const navToggle = document.querySelector('.main-header__toggler');
const changedHeaderElements = document.querySelectorAll('[data-header-state="no-js"]');

const setHeaderState = (state) => {
  changedHeaderElements.forEach((element) => {
    element.setAttribute('data-header-state', state);
  });
};

setHeaderState(CLOSE_STATE);

navToggle.addEventListener('click', () => {
  if (navToggle.getAttribute('data-header-state') === 'closed') {
    setHeaderState(OPEN_STATE);
  } else {
    setHeaderState(CLOSE_STATE);
  }
});
