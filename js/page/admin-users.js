document.addEventListener('DOMContentLoaded', function() {
  if (!requireAdmin()) return;
  initMockData();
  renderUsersTable();
});

function renderUsersTable() {
  const users = getUsers();
  const tbody = document.getElementById('usersTableBody');
  
  tbody.innerHTML = users.map(user => `
    <tr>
      <td>
        <img src="${user.avatar}" class="user-avatar-small" alt="${user.username}">
      </td>
      <td>${escapeHtml(user.username)}</td>
      <td>${escapeHtml(user.email)}</td>
      <td><span class="badge ${user.role === 'admin' ? 'badge-secondary' : 'badge-primary'}">${user.role === 'admin' ? '管理员' : '普通用户'}</span></td>
      <td>${user.createdAt}</td>
      <td>
        <div class="table-actions">
          ${user.role !== 'admin' ? `
            <button class="table-btn delete" onclick="deleteUser('${user.id}')">删除</button>
          ` : '-'}
        </div>
      </td>
    </tr>
  `).join('');
}

function deleteUser(id) {
  if (!confirm('确定要删除这个用户吗？')) return;
  
  const users = getUsers().filter(u => u.id !== id);
  saveUsers(users);
  
  showToast('删除成功', 'success');
  renderUsersTable();
}
