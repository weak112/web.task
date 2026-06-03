function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password && password.length >= 6;
}

function validateUsername(username) {
  return username && username.length >= 2;
}

function checkPasswordStrength(password) {
  let strength = 0;
  if (!password) return { level: 0, text: '', class: '' };
  
  if (password.length >= 6) strength++;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 1) return { level: 1, text: '弱', class: 'strength-weak' };
  if (strength <= 2) return { level: 2, text: '一般', class: 'strength-fair' };
  if (strength <= 3) return { level: 3, text: '良好', class: 'strength-good' };
  return { level: 4, text: '强', class: 'strength-strong' };
}

function showFieldError(input, message) {
  input.classList.add('error');
  const parent = input.closest('.form-group');
  let errorEl = parent.querySelector('.error-message');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    parent.appendChild(errorEl);
  }
  errorEl.textContent = message;
}

function clearFieldError(input) {
  input.classList.remove('error');
  const parent = input.closest('.form-group');
  const errorEl = parent.querySelector('.error-message');
  if (errorEl) errorEl.remove();
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('.form-input, .textarea-input');
  
  inputs.forEach(input => {
    clearFieldError(input);
    
    if (input.hasAttribute('required') && !input.value.trim()) {
      showFieldError(input, '此项为必填');
      isValid = false;
    } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
      showFieldError(input, '请输入有效的邮箱地址');
      isValid = false;
    }
  });
  
  return isValid;
}
