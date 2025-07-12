// Toggle Password Visibility
const toggleSignupPassword = document.getElementById('toggleSignupPassword');
const passwordInput = document.getElementById('password');

toggleSignupPassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  toggleSignupPassword.textContent = type === 'password' ? '👁️' : '🙈';
});

// Handle Sign Up (dummy)
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Account created!');
});
