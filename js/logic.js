var userNameInput = document.getElementById("userNameInput");
var newUserInput = document.getElementById("newUser");
var userMailInput = document.getElementById("userMailInput");
var userPasswordInput = document.getElementById("userPasswordInput");
var btnLogin = document.getElementById("btnLogin");
var btnSignIn = document.getElementById("btnSignIn");
var btnSignUp = document.getElementById("btnSignUp");

var users = [];
// "users", JSON.stringify(users)
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  signIn();
}

btnLogin.addEventListener("click", function (e) {
  login();
});
btnSignIn.addEventListener("click", function (e) {
  signIn();
});
btnSignUp.addEventListener("click", function (e) {
  signUp();
});

function login() {
  if (makeSure(true)) {
    console.log("true");
  } else {
    console.log("false");
  }
  clear();
}

function makeSure() {
  var gmailForMakeSure = userMailInput.value;
  var PasswordForMakeSure = userPasswordInput.value;
  for (var i = 0; i < localStorage.length; i++) {
    if (
      gmailForMakeSure == users[i].email &&
      PasswordForMakeSure == users[i].pass
    ) {
      return true;
    } else {
      return false;
    }
  }

  //   for (var i = 0; i < users.length; i++) {
  //     if (
  //       users[i].email.toLowerCase().includes(gmail.value.toLowerCase()) &&
  //       users[i].pass.toLowerCase().includes(Password.value.toLowerCase())
  //     ) {
  //       console.log("yes");
  //     } else {
  //       console.log("no");
  //     }
  //   }
  //   clear();
}

function signIn() {
  transition();
}
function signUp() {
  if (btnLogin.classList.contains("d-none")) {
    addUser();
    console.log("tee");
    transition();
  } else {
    transition();
  }
}

function transition() {
  btnLogin.classList.toggle("d-none");
  btnLogin.nextElementSibling.classList.toggle("mt-3");
  btnLogin.nextElementSibling.nextElementSibling.classList.toggle("d-none");
  newUserInput.classList.toggle("d-none");
}

function addUser() {
  var User = {
    fullName: userNameInput.value,
    email: userMailInput.value,
    pass: userPasswordInput.value,
  };
  users.push(User);
  localStorage.setItem("users", JSON.stringify(users));
  clear();
  console.log(users);
}

function clear() {
  userNameInput.value = "";
  userMailInput.value = "";
  userPasswordInput.value = "";
}

function regex(element) {
  var regex = {
    fullName: /^[A-Za-z]+(\s[A-Za-z]+)*$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pass: / ^(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*\d){2})(?=(.*[!@#$%^&*()_+={}|\[\]\\:";'<>?,./]){2}).{12,}$/,
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.contains("d-none")
      ? ""
      : element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
