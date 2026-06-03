function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    ${type === 'success' ? 'background: #10b981;' : ''}
    ${type === 'error' ? 'background: #ef4444;' : ''}
    ${type === 'warning' ? 'background: #f59e0b;' : ''}
    ${type === 'info' ? 'background: #3b82f6;' : ''}
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}



function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  
  if (navLinks && mobileMenuBtn) {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  }
}

document.addEventListener('click', function(event) {
  const navLinks = document.getElementById('navLinks');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  
  if (window.innerWidth <= 768) {
    if (navLinks && mobileMenuBtn) {
      if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    }
  }
});

window.addEventListener('resize', function() {
  const navLinks = document.getElementById('navLinks');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  
  if (window.innerWidth > 768) {
    if (navLinks && mobileMenuBtn) {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    }
  }
});
