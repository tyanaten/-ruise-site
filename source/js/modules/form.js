const submitButton = document.querySelector('button[data-form-submit]');

const nameError = submitButton.closest('form').querySelector('div[data-error-message="name"]');
const nameInput = submitButton.closest('form').querySelector('input[name="name"]');

const telError = submitButton.closest('form').querySelector('div[data-error-message="tel"]');
const telInput = submitButton.closest('form').querySelector('input[type="tel"]');

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

  if (!(nameValue.match(/^[a-zA-Zа-яёА-ЯЁ]+$/))) {
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
