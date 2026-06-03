const STORAGE_KEYS = {
  USERS: 'movieapp_users',
  CONTENTS: 'movieapp_contents',
  CURRENT_USER: 'movieapp_current_user'
};

function getStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function setStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function removeStorage(key) {
  localStorage.removeItem(key);
}

function getUsers() {
  return getStorage(STORAGE_KEYS.USERS) || [];
}

function saveUsers(users) {
  setStorage(STORAGE_KEYS.USERS, users);
}

function getContents() {
  return getStorage(STORAGE_KEYS.CONTENTS) || [];
}

function saveContents(contents) {
  setStorage(STORAGE_KEYS.CONTENTS, contents);
}

function getCurrentUser() {
  return getStorage(STORAGE_KEYS.CURRENT_USER);
}

function setCurrentUser(user) {
  setStorage(STORAGE_KEYS.CURRENT_USER, user);
}

function clearCurrentUser() {
  removeStorage(STORAGE_KEYS.CURRENT_USER);
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

function requireLogin() {
  if (!isLoggedIn()) {
    showToast('请先登录', 'warning');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function requireAdmin() {
  if (!isAdmin()) {
    showToast('没有权限', 'error');
    window.location.href = 'index.html';
    return false;
  }
  return true;
}
