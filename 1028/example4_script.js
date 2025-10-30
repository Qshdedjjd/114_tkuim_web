// example4_script.js
// 顯示錯誤後自動聚焦欄位，並透過 aria-live 提示助讀器

const form = document.getElementById('access-form');
const fields = [
  { input: document.getElementById('name'), error: document.getElementById('name-error') },
  { input: document.getElementById('age'), error: document.getElementById('age-error') }
];

function validateField(field) {
  const { input, error } = field;
  let message = '';
  if (input.validity.valueMissing) {
    message = '此欄位為必填。';
  }else if (input.id === 'age' && input.value) {
    const age = Number(input.value);
    if (age < 18) {
      message = '您必須年滿 18 歲才能填寫此表單。';
    } else if (age > 110) {
      message = '請輸入合理的年齡（不超過 110 歲）。';
    }
  }
  input.setCustomValidity(message);
  error.textContent = message;
  return !message;
}

fields.forEach((field) => {
  field.input.addEventListener('input', () => {
    if (field.input.validationMessage) {
      validateField(field);
    }
  });
  field.input.addEventListener('blur', () => {
    validateField(field);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let firstInvalid = null;
  fields.forEach((field) => {
    const isValid = validateField(field);
    if (!isValid && !firstInvalid) {
      firstInvalid = field.input;
    }
  });
  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }
  alert('表單送出成功');
  form.reset();
  fields.forEach(({ error }) => {
    error.textContent = '';
  });
});
