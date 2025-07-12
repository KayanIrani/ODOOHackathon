function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


document.addEventListener("DOMContentLoaded", function () {
  const dummyuser = {
    username:"DummyName",
    Password: "Pass@123"}

  const loginForm = document.getElementById("loginForm");
  if(loginForm){
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
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  errorMsg.style.display = "none";

  if (!username || !password) {
    errorMsg.textContent = "Both username and password are required.";
    errorMsg.style.display = "block";
    return;
  }

  // Send login POST to Django
  fetch("/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken")
    },
    body: JSON.stringify({ username: username, password: password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success && data.match) {
      window.location.href = "/";  // Redirect to homepage
    } else {
      errorMsg.textContent = data.message || "Invalid credentials.";
      errorMsg.style.display = "block";
    }
  })
  .catch(err => {
    console.error(err);
    errorMsg.textContent = "Something went wrong during login.";
    errorMsg.style.display = "block";
  });
});




  //password visibility toggler
  togglePassword.addEventListener("click", function () {
    const isHidden = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isHidden ? "text" : "password");
  });
}

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
      console.log("First Name:", nameVal);
      console.log("Surname:", surnameVal);
      console.log("Username:", usernameVal);
      console.log("Email:", emailVal);
      console.log("Password:", passwordVal);


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

      if (passwordVal.length < 7) {
        e.preventDefault();
        signupError.textContent = "Password must be at least 7 characters.";
        signupError.style.display = "block";
        return;
      }

      const uppercase = (passwordVal.match(/[A-Z]/g) || []).length;
      const lowercase = (passwordVal.match(/[a-z]/g) || []).length;
      const digits = (passwordVal.match(/[0-9]/g) || []).length;
      const specialChars = (passwordVal.match(/[^A-Za-z0-9]/g) || []).length;

      if (uppercase < 2 || lowercase < 2 || digits < 2 || specialChars < 1) {
        e.preventDefault();
        signupError.textContent = "Password must have at least 2 uppercase, 2 lowercase, 2 numbers, and 1 special character.";
        signupError.style.display = "block";
        return;
      }

      const signupData = {
        UserFirstName: nameVal,
        UserLastName: surnameVal,
        UserEmail: emailVal,
        Username: usernameVal,
        UserPassword: passwordVal,
        UserImage: "default",
      };

      fetch("/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken")  
        },
        body: JSON.stringify(signupData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Signup successful!");
          window.location.href = "/login/";  //redirection on creation of account
        } else {
          signupError.textContent = data.data || "Signup failed.";
          signupError.style.display = "block";
        }
      })
      .catch(error => {
        signupError.textContent = "An error occurred during signup. Please retry.";
        signupError.style.display = "block";
        console.error(error);
      });


    });
    //eye toggler thing for sign up form
    toggleSignupPassword.addEventListener("click", function () {
      const isHidden = password.getAttribute("type") === "password";
      password.setAttribute("type", isHidden ? "text" : "password");
    });
  }
});
