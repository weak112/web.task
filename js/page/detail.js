let currentContent = null;

document.addEventListener('DOMContentLoaded', function() {
  initMockData();
  renderNavbar();
  loadContentDetail();
});

function renderNavbar() {
  const user = getCurrentUser();
  const navLinks = document.getElementById('navLinks');
  
  if (user) {
    navLinks.innerHTML = `
      <a href="index.html" class="nav-link">首页</a>
      <a href="list.html" class="nav-link">发现</a>
      <a href="center.html" class="nav-link">个人中心</a>
      ${user.role === 'admin' ? '<a href="admin/index.html" class="nav-link">管理后台</a>' : ''}
      <a href="#" class="nav-link" onclick="logout()">退出</a>
    `;
  } else {
    navLinks.innerHTML = `
      <a href="index.html" class="nav-link">首页</a>
      <a href="list.html" class="nav-link">发现</a>
      <a href="login.html" class="nav-link">登录</a>
      <a href="register.html" class="nav-link">注册</a>
    `;
  }
}

function logout() {
  clearCurrentUser();
  showToast('已退出登录', 'success');
  setTimeout(() => window.location.href = 'index.html', 500);
}

function loadContentDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  
  if (!id) {
    window.location.href = 'index.html';
    return;
  }
  
  const contents = getContents();
  const content = contents.find(c => c.id === id);
  
  if (!content) {
    showToast('内容不存在', 'error');
    window.location.href = 'index.html';
    return;
  }
  
  currentContent = content;
  incrementViews(id);
  renderDetail(content);
  renderRelated(content);
}

function incrementViews(id) {
  const contents = getContents();
  const content = contents.find(c => c.id === id);
  if (content) {
    content.views++;
    saveContents(contents);
  }
}

function renderDetail(content) {
  document.getElementById('detailBg').src = content.poster;
  document.getElementById('detailPoster').src = content.poster;
  document.getElementById('detailTitle').textContent = content.title;
  document.getElementById('detailRating').textContent = '⭐ ' + content.rating;
  document.getElementById('detailYear').textContent = content.year;
  document.getElementById('detailDuration').textContent = content.duration;
  document.getElementById('detailCategory').textContent = content.category;
  document.getElementById('detailDescription').textContent = content.description;
  document.getElementById('detailDirector').textContent = content.director;
  document.getElementById('detailViews').textContent = (content.views / 1000).toFixed(1) + 'k';
  
  const genresContainer = document.getElementById('detailGenres');
  genresContainer.innerHTML = content.tags.map(tag => 
    `<span class="detail-genre">${tag}</span>`
  ).join('');
  
  const castContainer = document.getElementById('castList');
  castContainer.innerHTML = content.actors.map(actor => `
    <div class="cast-item">
      <div class="cast-avatar" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
        ${actor.charAt(0)}
      </div>
      <div class="cast-name">${actor}</div>
      <div class="cast-role">演员</div>
    </div>
  `).join('');
  
  updateFavoriteButton();
}

function updateFavoriteButton() {
  const user = getCurrentUser();
  const btn = document.getElementById('favoriteBtn');
  
  if (!user) {
    btn.innerHTML = '❤ 收藏';
    btn.onclick = () => {
      showToast('请先登录', 'warning');
      window.location.href = 'login.html';
    };
    return;
  }
  
  const isFavorited = user.favorites && user.favorites.includes(currentContent.id);
  
  if (isFavorited) {
    btn.innerHTML = '💖 已收藏';
    btn.className = 'btn btn-primary';
    btn.onclick = removeFavorite;
  } else {
    btn.innerHTML = '❤ 收藏';
    btn.className = 'btn btn-outline';
    btn.onclick = addFavorite;
  }
}

function addFavorite() {
  const user = getCurrentUser();
  if (!user) return;
  
  if (!user.favorites) user.favorites = [];
  user.favorites.push(currentContent.id);
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === user.id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], favorites: user.favorites };
    saveUsers(users);
  }
  
  setCurrentUser(user);
  
  showToast('已添加到收藏', 'success');
  updateFavoriteButton();
}

function removeFavorite() {
  const user = getCurrentUser();
  if (!user) return;
  
  user.favorites = user.favorites.filter(id => id !== currentContent.id);
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === user.id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], favorites: user.favorites };
    saveUsers(users);
  }
  
  setCurrentUser(user);
  
  showToast('已取消收藏', 'success');
  updateFavoriteButton();
}

function renderRelated(content) {
  const contents = getContents();
  const related = contents
    .filter(c => c.id !== content.id && c.type === content.type)
    .slice(0, 4);
  
  const grid = document.getElementById('relatedGrid');
  grid.innerHTML = related.map(c => `
    <div class="card content-card" onclick="window.location.href='detail.html?id=${c.id}'">
      <div class="content-poster">
        <img src="${c.poster}" alt="${c.title}">
        <div class="content-poster-overlay">
          <span style="color: white; font-weight: 600;">查看详情</span>
        </div>
      </div>
      <div class="content-info">
        <h3 class="content-title">${escapeHtml(c.title)}</h3>
        <div class="content-meta">
          <span class="rating">⭐ ${c.rating}</span>
          <span>${c.year}</span>
        </div>
      </div>
    </div>
  `).join('');
}
