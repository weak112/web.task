let filteredContents = [];
let currentPage = 1;
const pageSize = 8;

document.addEventListener('DOMContentLoaded', function() {
  initMockData();
  renderNavbar();
  initFilters();
  applyFilters();
});

function renderNavbar() {
  const user = getCurrentUser();
  const navLinks = document.getElementById('navLinks');
  
  if (user) {
    navLinks.innerHTML = `
      <a href="index.html" class="nav-link">首页</a>
      <a href="list.html" class="nav-link active">发现</a>
      <a href="center.html" class="nav-link">个人中心</a>
      ${user.role === 'admin' ? '<a href="admin/index.html" class="nav-link">管理后台</a>' : ''}
      <a href="#" class="nav-link" onclick="logout()">退出</a>
    `;
  } else {
    navLinks.innerHTML = `
      <a href="index.html" class="nav-link">首页</a>
      <a href="list.html" class="nav-link active">发现</a>
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

function initFilters() {
  const searchInput = document.getElementById('searchInput');
  const typeSelect = document.getElementById('typeSelect');
  const categorySelect = document.getElementById('categorySelect');
  const sortSelect = document.getElementById('sortSelect');
  
  const filterHandler = debounce(applyFilters, 300);
  
  searchInput.addEventListener('input', filterHandler);
  typeSelect.addEventListener('change', applyFilters);
  categorySelect.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
}

function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const type = document.getElementById('typeSelect').value;
  const category = document.getElementById('categorySelect').value;
  const sort = document.getElementById('sortSelect').value;
  
  let contents = getContents();
  
  if (search) {
    contents = contents.filter(c => 
      c.title.toLowerCase().includes(search) ||
      c.description.toLowerCase().includes(search) ||
      c.tags.some(t => t.toLowerCase().includes(search))
    );
  }
  
  if (type) {
    contents = contents.filter(c => c.type === type);
  }
  
  if (category) {
    contents = contents.filter(c => c.category === category);
  }
  
  switch (sort) {
    case 'rating':
      contents.sort((a, b) => b.rating - a.rating);
      break;
    case 'views':
      contents.sort((a, b) => b.views - a.views);
      break;
    case 'newest':
      contents.sort((a, b) => b.year - a.year);
      break;
    default:
      contents.sort((a, b) => b.rating - a.rating);
  }
  
  filteredContents = contents;
  currentPage = 1;
  renderList();
}

function renderList() {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageContents = filteredContents.slice(start, end);
  
  const grid = document.getElementById('contentGrid');
  const countEl = document.getElementById('resultsCount');
  
  countEl.textContent = `共 ${filteredContents.length} 个结果`;
  
  if (pageContents.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">🎬</div>
        <h3 class="empty-text">暂无内容</h3>
        <p class="empty-description">试试其他筛选条件吧</p>
      </div>
    `;
  } else {
    grid.innerHTML = pageContents.map(content => createContentCard(content)).join('');
  }
  
  renderPagination();
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
          <span>👁 ${(content.views / 1000).toFixed(1)}k</span>
        </div>
        <div class="content-tags">
          ${content.tags.slice(0, 2).map(tag => `<span class="content-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderPagination() {
  const totalPages = Math.ceil(filteredContents.length / pageSize);
  const pagination = document.getElementById('pagination');
  
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }
  
  let html = `
    <button class="page-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>‹</button>
  `;
  
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += `<span style="padding: 0 8px;">...</span>`;
    }
  }
  
  html += `
    <button class="page-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>›</button>
  `;
  
  pagination.innerHTML = html;
}

function goToPage(page) {
  const totalPages = Math.ceil(filteredContents.length / pageSize);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}
