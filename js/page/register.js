document.addEventListener('DOMContentLoaded', function() {
  initMockData();
  initRegisterForm();
});

function initRegisterForm() {
  const form = document.getElementById('registerForm');
  const passwordInput = document.getElementById('password');
  
  form.addEventListener('submit', handleRegister);
  
  passwordInput.addEventListener('input', function() {
    const strength = checkPasswordStrength(this.value);
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (strengthFill) {
      strengthFill.className = 'strength-fill ' + strength.class;
    }
    if (strengthText) {
      strengthText.textContent = this.value ? `密码强度: ${strength.text}` : '';
    }
  });
}

function handleRegister(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;
  
  if (!validateUsername(username)) {
    showToast('用户名至少2个字符', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showToast('请输入有效的邮箱', 'error');
    return;
  }
  
  if (!validatePassword(password)) {
    showToast('密码至少6位', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showToast('两次密码不一致', 'error');
    return;
  }
  
  if (!terms) {
    showToast('请同意用户协议', 'error');
    return;
  }
  
  const users = getUsers();
  
  if (users.find(u => u.email === email)) {
    showToast('该邮箱已注册', 'error');
    return;
  }
  
  const newUser = {
    id: generateId(),
    email,
    username,
    password,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    role: 'user',
    createdAt: new Date().toISOString().split('T')[0],
    favorites: []
  };
  
  users.push(newUser);
  saveUsers(users);
  
  showToast('注册成功！请登录', 'success');
  setTimeout(() => window.location.href = 'login.html', 800);
}
