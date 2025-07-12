document.addEventListener("DOMContentLoaded", function () {
  const dummyuser = {
    username:"DummyName",
    Password: "Pass@123"}

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");

  //helps display errors
  let errorMsg = document.createElement("p");
  errorMsg.style.color = "red";
  errorMsg.style.marginTop = "10px";
  errorMsg.style.display = "none";
  loginForm.appendChild(errorMsg);

  //login form validation
  loginForm.addEventListener("submit", function (e) {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    errorMsg.style.display = "none";

    if (!username || !password) {
      e.preventDefault();
      errorMsg.textContent = "Both username and password are required.";
      errorMsg.style.display = "block";
    }
  });

  //password visibility toggler
  togglePassword.addEventListener("click", function () {
    const isHidden = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isHidden ? "text" : "password");
  });

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    const firstName = document.getElementById("firstName");
    const surname = document.getElementById("surname");
    const username = document.getElementById("signupUsername"); 
    const email = document.getElementById("email");
    const password = document.getElementById("signupPassword");
    const toggleSignupPassword = document.getElementById("toggleSignupPassword");

    let signupError = document.createElement("p");
    signupError.style.color = "red";
    signupError.style.marginTop = "10px";
    signupError.style.display = "none";
    signupForm.appendChild(signupError);

    signupForm.addEventListener("submit", function (e) {
      signupError.style.display = "none";

      const nameVal = firstName.value.trim();
      const surnameVal = surname.value.trim();
      const usernameVal = username.value.trim();
      const emailVal = email.value.trim();
      const passwordVal = password.value;

      //Login page validation
      if (!nameVal || !surnameVal || !usernameVal || !emailVal || !passwordVal) {
        e.preventDefault();
        signupError.textContent = "All fields are required.";
        signupError.style.display = "block";
        return;
      }

      if (usernameVal.length < 6) {
        e.preventDefault();
        signupError.textContent = "Username must be at least 6 characters.";
        signupError.style.display = "block";
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailVal)) {
        e.preventDefault();
        signupError.textContent = "Invalid email address.";
        signupError.style.display = "block";
        return;
      }

      if (passwordVal.length < 8) {
        e.preventDefault();
        signupError.textContent = "Password must be at least 8 characters.";
        signupError.style.display = "block";
        return;
      }

      const uppercase = (passwordVal.match(/[A-Z]/g) || []).length;
      const lowercase = (passwordVal.match(/[a-z]/g) || []).length;
      const digits = (passwordVal.match(/[0-9]/g) || []).length;
      const specialChars = (passwordVal.match(/[^A-Za-z0-9]/g) || []).length;

      if (uppercase < 2 || lowercase < 2 || digits < 1 || specialChars < 1) {
        e.preventDefault();
        signupError.textContent = "Password must have at least 2 uppercase, 2 lowercase, 1 number, and 1 special character.";
        signupError.style.display = "block";
        return;
      }

    });

    toggleSignupPassword.addEventListener("click", function () {
      const isHidden = password.getAttribute("type") === "password";
      password.setAttribute("type", isHidden ? "text" : "password");
    });
  }
});
