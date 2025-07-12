document.addEventListener("DOMContentLoaded", function () {
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
});
