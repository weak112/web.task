let currentCategory = 'all';
let currentSlide = 0;
let slideInterval;

document.addEventListener('DOMContentLoaded', function() {
  initMockData();
  renderNavbar();
  renderHeroSlides();
  renderContent();
  startSlideShow();
  initCategoryTabs();
});

function renderNavbar() {
  const user = getCurrentUser();
  const navLinks = document.getElementById('navLinks');
  
  if (user) {
    navLinks.innerHTML = `
      <a href="index.html" class="nav-link active">首页</a>
      <a href="list.html" class="nav-link">发现</a>
      <a href="center.html" class="nav-link">个人中心</a>
      ${user.role === 'admin' ? '<a href="admin/index.html" class="nav-link">管理后台</a>' : ''}
      <a href="#" class="nav-link" onclick="logout()">退出</a>
    `;
  } else {
    navLinks.innerHTML = `
      <a href="index.html" class="nav-link active">首页</a>
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

function renderHeroSlides() {
  const contents = getContents().slice(0, 3);
  const heroContainer = document.getElementById('heroSlides');
  const dotsContainer = document.getElementById('heroDots');
  
  heroContainer.innerHTML = contents.map((content, index) => `
    <div class="hero-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
      <img src="${content.poster}" alt="${content.title}" class="hero-bg">
      <div class="hero-overlay"></div>
      <div class="container" style="position: relative; z-index: 10; height: 100%; display: flex; align-items: center;">
        <div style="max-width: 600px;">
          <span class="badge badge-secondary">${content.type === 'movie' ? '电影' : '音乐'}</span>
          <h1 class="hero-title" style="margin-top: 20px;">${content.title}</h1>
          <p class="hero-description">${content.description}</p>
          <div class="hero-buttons">
            <button class="btn btn-primary" onclick="goToDetail('${content.id}')">查看详情</button>
            <button class="btn btn-outline" onclick="goToList()">浏览更多</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  dotsContainer.innerHTML = contents.map((_, index) => `
    <div class="hero-dot ${index === 0 ? 'active' : ''}" data-index="${index}" onclick="goToSlide(${index})"></div>
  `).join('');
}

function goToSlide(index) {
  currentSlide = index;
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function startSlideShow() {
  slideInterval = setInterval(() => {
    const contents = getContents().slice(0, 3);
    currentSlide = (currentSlide + 1) % contents.length;
    goToSlide(currentSlide);
  }, 5000);
}

function initCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      renderContent();
    });
  });
}

function renderContent() {
  let contents = getContents();
  
  if (currentCategory !== 'all') {
    contents = contents.filter(c => c.type === currentCategory);
  }
  
  const grid = document.getElementById('contentGrid');
  grid.innerHTML = contents.map(content => createContentCard(content)).join('');
}

function createContentCard(content) {
  return `
    <div class="card content-card" onclick="goToDetail('${content.id}')">
      <div class="content-poster">
        <img src="${content.poster}" alt="${content.title}">
        <div class="content-poster-overlay">
          <span style="color: white; font-weight: 600;">查看详情</span>
        </div>
        <span class="badge ${content.type === 'movie' ? 'badge-primary' : 'badge-secondary'} content-badge">
          ${content.type === 'movie' ? '电影' : '音乐'}
        </span>
      </div>
      <div class="content-info">
        <h3 class="content-title">${escapeHtml(content.title)}</h3>
        <div class="content-meta">
          <span class="rating">⭐ ${content.rating}</span>
          <span>${content.year}</span>
        </div>
        <div class="content-tags">
          ${content.tags.slice(0, 2).map(tag => `<span class="content-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function goToDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

function goToList() {
  window.location.href = 'list.html';
}
