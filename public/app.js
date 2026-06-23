/* ============================================
   IBON GLOBAL — app.js
   Mobile Menu + Theme Toggle
============================================ */

/* ========================
   MOBILE MENU TOGGLE
======================== */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('active');
}

// Close when clicking outside
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobileMenu');
  const btn  = document.querySelector('.mobile-btn');
  if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('active');
  }
});

/* ========================
   DARK / LIGHT THEME
======================== */
function toggleTheme() {
  document.body.classList.toggle('light');
  const btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.innerHTML = document.body.classList.contains('light') ? '☀️' : '🌙';
  }
}