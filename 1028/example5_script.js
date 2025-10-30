// example5_script.js
// 勾選「我已閱讀並同意」時跳出條款視窗，關閉後才能送出

const form = document.getElementById('full-form');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const agreeCheckbox = document.getElementById('agree');
const closePolicyBtn = document.getElementById('closePolicy');
const policyModal = new bootstrap.Modal(document.getElementById('policyModal'));

let hasReadPolicy = false; // 是否已閱讀條款

// 當勾選「我已閱讀並同意」時，先顯示條款視窗
agreeCheckbox.addEventListener('change', (e) => {
  if (e.target.checked && !hasReadPolicy) {
    e.preventDefault();
    e.target.checked = false; // 暫時取消勾選
    policyModal.show();
  }
});

// 使用者關閉條款視窗後，設為已閱讀並自動勾選
closePolicyBtn.addEventListener('click', () => {
  hasReadPolicy = true;
  agreeCheckbox.checked = true;
  agreeCheckbox.classList.remove('is-invalid');
});

// 驗證所有欄位
function validateAllInputs(formElement) {
  let firstInvalid = null;
  const controls = Array.from(formElement.querySelectorAll('input, select, textarea'));
  controls.forEach((control) => {
    control.classList.remove('is-invalid');
    if (!control.checkValidity()) {
      control.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = control;
    }
  });
  return firstInvalid;
}

// 攔截送出
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';

  // 若未看過條款則中斷送出
  if (!hasReadPolicy) {
    policyModal.show();
    submitBtn.disabled = false;
    submitBtn.textContent = '送出';
    return;
  }

  const firstInvalid = validateAllInputs(form);
  if (firstInvalid) {
    submitBtn.disabled = false;
    submitBtn.textContent = '送出';
    firstInvalid.focus();
    return;
  }

  // 模擬送出流程
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert('資料已送出，感謝您的聯絡！');
  form.reset();
  hasReadPolicy = false;
  submitBtn.disabled = false;
  submitBtn.textContent = '送出';
});

// 清除表單
resetBtn.addEventListener('click', () => {
  form.reset();
  hasReadPolicy = false;
  Array.from(form.elements).forEach((element) => {
    element.classList.remove('is-invalid');
  });
});

// 即時驗證（輸入中移除錯誤樣式）
form.addEventListener('input', (event) => {
  const target = event.target;
  if (target.classList.contains('is-invalid') && target.checkValidity()) {
    target.classList.remove('is-invalid');
  }
});