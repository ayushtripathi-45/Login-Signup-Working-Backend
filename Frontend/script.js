const API = "http://localhost:5000";

function getActiveMessage() {
  if (document.getElementById("toggle").checked) {
    return document.querySelector(".signup .message");
  } else {
    return document.querySelector(".login .message");
  }
}

// SIGNUP
function signup() {
  const msg = getActiveMessage();

  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => res.text())
    .then(data => {
      msg.innerText = data;
      msg.style.color = "lightgreen";
    })
    .catch(() => {
      msg.innerText = "Signup failed";
      msg.style.color = "red";
    });
}

// LOGIN
function login() {
  const msg = getActiveMessage();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.text())
    .then(data => {
      msg.innerText = data;
      msg.style.color = "lightgreen";
    })
    .catch(() => {
      msg.innerText = "Login failed";
      msg.style.color = "red";
    });
}
