document.addEventListener('DOMContentLoaded', function() {
  if (!requireLogin()) return;
  initMockData();
  renderNavbar();
  renderProfile();
  initTabs();
  renderSettings();
  renderFavorites();
});

function renderNavbar() {
  const user = getCurrentUser();
  const navLinks = document.getElementById('navLinks');
  
  navLinks.innerHTML = `
    <a href="index.html" class="nav-link">首页</a>
    <a href="list.html" class="nav-link">发现</a>
    <a href="center.html" class="nav-link active">个人中心</a>
    ${user.role === 'admin' ? '<a href="admin/index.html" class="nav-link">管理后台</a>' : ''}
    <a href="#" class="nav-link" onclick="logout()">退出</a>
  `;
}

function logout() {
  clearCurrentUser();
  showToast('已退出登录', 'success');
  setTimeout(() => window.location.href = 'index.html', 500);
}

function renderProfile() {
  const user = getCurrentUser();
  document.getElementById('profileAvatar').src = user.avatar;
  document.getElementById('profileName').textContent = user.username;
  document.getElementById('profileEmail').textContent = user.email;
  
  const favoriteCount = user.favorites ? user.favorites.length : 0;
  document.getElementById('statFavorites').textContent = favoriteCount;
}

function initTabs() {
  const tabs = document.querySelectorAll('.center-tab');
  const contents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      contents.forEach(c => c.classList.remove('active'));
      document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
  });
}

function renderSettings() {
  const user = getCurrentUser();
  document.getElementById('settingsUsername').value = user.username;
  document.getElementById('settingsEmail').value = user.email;
  
  document.getElementById('settingsForm').addEventListener('submit', handleSaveSettings);
  document.getElementById('passwordForm').addEventListener('submit', handleChangePassword);
}

function handleSaveSettings(e) {
  e.preventDefault();
  
  const username = document.getElementById('settingsUsername').value.trim();
  
  if (!validateUsername(username)) {
    showToast('用户名至少2个字符', 'error');
    return;
  }
  
  const user = getCurrentUser();
  user.username = username;
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === user.id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], username };
    saveUsers(users);
  }
  
  setCurrentUser(user);
  
  showToast('保存成功', 'success');
  renderProfile();
}

function handleChangePassword(e) {
  e.preventDefault();
  
  const oldPassword = document.getElementById('oldPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmNewPassword').value;
  
  const users = getUsers();
  const user = getCurrentUser();
  const fullUser = users.find(u => u.id === user.id);
  
  if (!fullUser || fullUser.password !== oldPassword) {
    showToast('原密码错误', 'error');
    return;
  }
  
  if (!validatePassword(newPassword)) {
    showToast('新密码至少6位', 'error');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    showToast('两次密码不一致', 'error');
    return;
  }
  
  const userIndex = users.findIndex(u => u.id === user.id);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    saveUsers(users);
  }
  
  document.getElementById('oldPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmNewPassword').value = '';
  
  showToast('密码修改成功', 'success');
}

function renderFavorites() {
  const user = getCurrentUser();
  const contents = getContents();
  const favorites = user.favorites || [];
  const favoriteContents = contents.filter(c => favorites.includes(c.id));
  
  const grid = document.getElementById('favoritesGrid');
  
  if (favoriteContents.length === 0) {
    grid.innerHTML = `
      <div class="empty-favorites" style="grid-column: 1 / -1;">
        <div style="font-size: 64px; margin-bottom: 20px;">💔</div>
        <h3 style="color: var(--text-muted);">暂无收藏</h3>
        <p style="color: var(--text-muted); margin-top: 10px;">
          去<a href="list.html" style="color: var(--secondary-color);">发现</a>页面看看吧
        </p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = favoriteContents.map(content => `
    <div class="card favorite-card">
      <button class="favorite-remove" onclick="removeFavorite('${content.id}')">
        ✕
      </button>
      <div class="content-card" style="cursor: pointer;" onclick="window.location.href='detail.html?id=${content.id}'">
        <div class="content-poster">
          <img src="${content.poster}" alt="${content.title}">
        </div>
        <div class="content-info">
          <h3 class="content-title">${escapeHtml(content.title)}</h3>
          <div class="content-meta">
            <span class="rating">⭐ ${content.rating}</span>
            <span>${content.year}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function removeFavorite(id) {
  const user = getCurrentUser();
  user.favorites = user.favorites.filter(fid => fid !== id);
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === user.id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], favorites: user.favorites };
    saveUsers(users);
  }
  
  setCurrentUser(user);
  
  showToast('已取消收藏', 'success');
  renderFavorites();
  renderProfile();
}
