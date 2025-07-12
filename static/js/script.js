// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function () {
  const password = document.getElementById('password');
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  this.textContent = type === 'password' ? '👁️' : '🙈';
});

// Dummy form handling
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user && pass) {
    alert(`Welcome, ${user}`);
  } else {
    alert("Please fill both fields.");
  }
});
