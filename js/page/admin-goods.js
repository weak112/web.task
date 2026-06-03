document.addEventListener('DOMContentLoaded', function() {
  if (!requireAdmin()) return;
  initMockData();
  renderGoodsTable();
});

function renderGoodsTable() {
  const contents = getContents();
  const tbody = document.getElementById('goodsTableBody');
  
  tbody.innerHTML = contents.map(content => `
    <tr>
      <td>
        <img src="${content.poster}" class="table-poster" alt="${content.title}">
      </td>
      <td>${escapeHtml(content.title)}</td>
      <td><span class="badge ${content.type === 'movie' ? 'badge-primary' : 'badge-secondary'}">${content.type === 'movie' ? '电影' : '音乐'}</span></td>
      <td>${content.category}</td>
      <td>⭐ ${content.rating}</td>
      <td>${content.year}</td>
      <td>${content.views.toLocaleString()}</td>
      <td>
        <div class="table-actions">
          <button class="table-btn edit" onclick="editContent('${content.id}')">编辑</button>
          <button class="table-btn delete" onclick="deleteContent('${content.id}')">删除</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function editContent(id) {
  showToast('编辑功能开发中', 'info');
}

function deleteContent(id) {
  if (!confirm('确定要删除这个内容吗？')) return;
  
  const contents = getContents().filter(c => c.id !== id);
  saveContents(contents);
  
  showToast('删除成功', 'success');
  renderGoodsTable();
}
