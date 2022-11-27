import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

const OPEN_STATE = 'open';
const CLOSE_STATE = 'closed';

const navToggle = document.querySelector('.main-header__toggler');
const changedHeaderElements = document.querySelectorAll('[data-header-state="no-js"]');

const menu = document.querySelector('.main-header__wrapper');

const setHeaderState = (state) => {
  changedHeaderElements.forEach((element) => {
    element.setAttribute('data-header-state', state);
  });
};

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

// ________________________

const scrollButtons = document.querySelectorAll('[data-scroll-button]');

scrollButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();

    let scrollView = document.querySelector(button.getAttribute('data-sroll-view'));
    scrollView.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

// __________________

const submitButton = document.querySelector('button[data-form-submit]');

const nameError = submitButton.closest('form').querySelector('div[data-error-message="name"]');
const nameInput = submitButton.closest('form').querySelector('input[name="name"]');

const telError = submitButton.closest('form').querySelector('div[data-error-message="tel"]');
let telInput = submitButton.closest('form').querySelector('input[type="tel"]');

const emailError = submitButton.closest('form').querySelector('div[data-error-message="email"]');
const emailInput = submitButton.closest('form').querySelector('input[type="email"]');

const checkbox = submitButton.closest('form').querySelector('input[type="checkbox"]');
const checkboxMark = submitButton.closest('form').querySelector('.custom-checkbox__mark');

const prefixNumber = (str) => {
  if (str === '7') {
    return '7 (';
  }
  if (str === '8') {
    return '8 (';
  }
  if (str === '9') {
    return '7 (9';
  }
  return '7 (';
};

const hideValidationMessage = (func) => {
  setTimeout(() => {
    func();
  }, 2000);
};

const hideContent = (element, action) => {
  element.classList[action]('visually-hidden');
};


telInput.addEventListener('input', () => {
  const value = telInput.value.replace(/\D+/g, '');
  const numberLength = 11;

  let result;
  if (telInput.value.includes('+8') || telInput.value[0] === '8') {
    result = '';
  } else {
    result = '+';
  }

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;
      case 4:
        result += ') ';
        break;
      case 7:
        result += '-';
        break;
      case 9:
        result += '-';
        break;
      default:
        break;
    }
    result += value[i];
  }

  telInput.value = result;
});

submitButton.addEventListener('click', () => {
  let telValue = telInput.value.replace(/\D+/g, '');
  let nameValue = nameInput.value.replace(/[\-\s]/g, '');
  let emailValue = emailInput.value;

  if (telValue.replace(/[^0-9]/g, '').length < 11) {
    telInput.setCustomValidity('Invalid field.');
    hideContent(telError, 'remove');
    hideValidationMessage(() => {
      hideContent(telError, 'add');
    });
  } else {
    telInput.setCustomValidity('');
    hideContent(telError, 'add');
  }

  if (!(nameValue.match(/^[а-яёА-ЯЁ]+$/))) {
    nameInput.setCustomValidity('Invalid field.');
    hideContent(nameError, 'remove');
    hideValidationMessage(() => {
      hideContent(nameError, 'add');
    });
  } else {
    nameInput.setCustomValidity('');
    hideContent(nameError, 'add');
  }

  if (!(emailValue.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))) {
    emailInput.setCustomValidity('Invalid field.');
    hideContent(emailError, 'remove');
    hideValidationMessage(() => {
      hideContent(emailError, 'add');
    });
  } else {
    emailInput.setCustomValidity('');
    hideContent(emailError, 'add');
  }

  if (!(checkbox.checked)) {
    checkboxMark.style.outline = '1px solid #ff1553';
    hideValidationMessage(() => {
      checkboxMark.style.outline = 'none';
    });
  }
});

// ____________________
const ymaps = window.ymaps;
const map = document.querySelector('[data-map-state="no-js"]');

map.setAttribute('data-map-state', 'with-js');

ymaps.ready(function () {
  let myMap = new ymaps.Map('map', {
    center: [59.9387561, 30.323106],
    zoom: 16,
  }, {
    searchControlProvider: 'yandex#search',
  });

  let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    hintContent: 'Метка',
    balloonContent: 'г. Санкт Петербург, ул. Большая Конюшенная, 19/8',
  }, {
    iconLayout: 'default#image',
    iconImageHref: '../img/sprite/map-pin.svg',
    iconImageSize: [18, 22],
    iconImageOffset: [-9, -22],
  });

  myMap.geoObjects.add(myPlacemark);
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
