let tags = [];

document.addEventListener('DOMContentLoaded', function() {
  if (!requireLogin()) return;
  initMockData();
  renderNavbar();
  initPublishForm();
});

function renderNavbar() {
  const user = getCurrentUser();
  const navLinks = document.getElementById('navLinks');
  
  navLinks.innerHTML = `
    <a href="index.html" class="nav-link">首页</a>
    <a href="list.html" class="nav-link">发现</a>
    <a href="center.html" class="nav-link">个人中心</a>
    ${user.role === 'admin' ? '<a href="admin/index.html" class="nav-link">管理后台</a>' : ''}
    <a href="#" class="nav-link" onclick="logout()">退出</a>
  `;
}

function logout() {
  clearCurrentUser();
  showToast('已退出登录', 'success');
  setTimeout(() => window.location.href = 'index.html', 500);
}

function initPublishForm() {
  const tagInput = document.getElementById('tagInput');
  const tagContainer = document.getElementById('tagsContainer');
  
  tagInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(this.value.trim());
      this.value = '';
    }
  });
  
  document.getElementById('publishForm').addEventListener('submit', handlePublish);
}

function addTag(tag) {
  if (!tag || tags.includes(tag)) return;
  if (tags.length >= 5) {
    showToast('最多添加5个标签', 'warning');
    return;
  }
  
  tags.push(tag);
  renderTags();
}

function removeTag(tag) {
  tags = tags.filter(t => t !== tag);
  renderTags();
}

function renderTags() {
  const container = document.getElementById('tagsContainer');
  const tagInput = document.getElementById('tagInput');
  
  container.innerHTML = tags.map(tag => `
    <span class="tag-item">
      ${escapeHtml(tag)}
      <span class="tag-remove" onclick="removeTag('${escapeHtml(tag)}')">×</span>
    </span>
  `).join('');
  
  container.appendChild(tagInput);
}

function handlePublish(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value.trim();
  const type = document.getElementById('type').value;
  const category = document.getElementById('category').value;
  const year = parseInt(document.getElementById('year').value);
  const rating = parseFloat(document.getElementById('rating').value);
  const description = document.getElementById('description').value.trim();
  const director = document.getElementById('director').value.trim();
  const actors = document.getElementById('actors').value.split(',').map(a => a.trim()).filter(a => a);
  const duration = document.getElementById('duration').value.trim();
  const poster = document.getElementById('poster').value.trim() || 
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop';
  
  if (!title) {
    showToast('请输入标题', 'error');
    return;
  }
  if (!category) {
    showToast('请选择分类', 'error');
    return;
  }
  if (!description) {
    showToast('请输入描述', 'error');
    return;
  }
  if (tags.length === 0) {
    showToast('请至少添加一个标签', 'error');
    return;
  }
  
  const user = getCurrentUser();
  const newContent = {
    id: generateId(),
    title,
    type,
    category,
    year: year || new Date().getFullYear(),
    rating: rating || 8.0,
    poster,
    description,
    director: director || '未知',
    actors: actors.length > 0 ? actors : ['未知'],
    duration: duration || '未知',
    tags,
    views: 0,
    createdAt: new Date().toISOString().split('T')[0],
    createdBy: user.id
  };
  
  const contents = getContents();
  contents.unshift(newContent);
  saveContents(contents);
  
  showToast('发布成功！', 'success');
  setTimeout(() => window.location.href = 'list.html', 800);
}
