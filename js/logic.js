var userNameInput = document.getElementById("userNameInput");
var newUserInput = document.getElementById("newUser");
var userMailInput = document.getElementById("userMailInput");
var userPasswordInput = document.getElementById("userPasswordInput");
var btnLogin = document.getElementById("btnLogin");
var btnSignIn = document.getElementById("btnSignIn");
var btnSignUp = document.getElementById("btnSignUp");
var btnLogout = document.getElementById("btnLogout");
var rowData = document.getElementById("rowData");
var mainContainer = document.getElementById("mainContainer");

var users = [];
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
  display(users[0].fullName);
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
    display(userNameInput.value);
  } else {
    alert("Incorrect email or password. Please try again.");
  }
  clear();
}

function display(fullName) {
  mainContainer.parentElement.classList.add("d-none", "vh-40");
  mainContainer.parentElement.classList.remove("vh-100");
  mainContainer.classList.add("d-none");
  var print = `<div class="container text-center">
            <p class="fs-2">
                welcome
                <span
                    class="text-success fs-1 fw-bold text-decoration-underline text-capitalize"
                    >${users[0].fullName}</span>
                </p>
                <button  class="w-25 topButton btn btn-danger btn-sm">
            Logout
                </button>
</div>`;
  rowData.innerHTML = print;
}

function logout() {
  rowData.innerHTML = ``;
  mainContainer.parentElement.classList.remove("d-none", "vh-40");
  mainContainer.parentElement.classList.add("vh-100");
  mainContainer.classList.remove("d-none");
  users.splice(0, 1);
  localStorage.clear();
  signIn();
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
}

function signIn() {
  transition();
}

function signUp() {
  if (btnLogin.classList.contains("d-none")) {
    addUser();
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
  if (
    regex(userNameInput) &&
    regex(userMailInput) &&
    regex(userPasswordInput)
  ) {
    var User = {
      fullName: userNameInput.value,
      email: userMailInput.value,
      pass: userPasswordInput.value,
    };
    users.push(User);
    localStorage.setItem("users", JSON.stringify(users));
    clear();
  } else {
    alert(
      "The form is incomplete. Please fill in all required fields and correct any errors."
    );
  }
}

function clear() {
  userNameInput.value = "";
  userMailInput.value = "";
  userPasswordInput.value = "";
}

function regex(element) {
  var regex = {
    userNameInput: /^(?=[A-Za-z-' ]{3,}$)[A-Za-z]+(?:[-' ]?[A-Za-z]+)*$/,
    userMailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    userPasswordInput:
      /^(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*\d){2})(?=(.*[!@#$%^&*()_+={}|\[\]\\:";'<>?,./]){2}).{12,}$/,
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
