document.addEventListener('DOMContentLoaded', function() {
  initMockData();
  initLoginForm();
});

function initLoginForm() {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', handleLogin);
}

function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  if (!validateEmail(email)) {
    showToast('请输入有效的邮箱', 'error');
    return;
  }
  
  if (!validatePassword(password)) {
    showToast('密码至少6位', 'error');
    return;
  }
  
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    showToast('邮箱或密码错误', 'error');
    return;
  }
  
  const { password: _, ...userWithoutPassword } = user;
  setCurrentUser(userWithoutPassword);
  
  showToast('登录成功！', 'success');
  setTimeout(() => window.location.href = 'index.html', 800);
}
