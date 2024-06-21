const loginForm = `
          <input type="text" placeholder="username" id="usernameLogin" />
          <input type="password" placeholder="password" id="passwordLogin" />
          <div class="remember-me">
            <input type="checkbox" id="rememberMeLogin" />
            <label for="rememberMeLogin">Remember me</label>
          </div>
          <button>Login</button>`;

const signUpForm = `
          <input type="text" placeholder="username" id="usernameSignUP" />
          <input type="password" placeholder="password" id="passwordSignUP" />
          <input type="text" placeholder="email" id="emailSignUP" />
          <button>SignUp</button>`;

const signInBtn = document.querySelectorAll(".signInBtn");
const registerBtn = document.querySelectorAll(".registerBtn");
const signFormModal = document.getElementById("signForm");
const loginsignUpForm = document.querySelector(".login-signUp-Form");
const forgotPassword = document.querySelector(".forgot-password");
const notMember = document.querySelector(".not-member");
const signupBtn = document.querySelector(".SignupBtn");
const loginBtn = document.querySelector(".LoginBtn");
const crossSign = signFormModal.querySelector(".cross");

crossSign.addEventListener("click", () => {
  document.querySelector("body").classList.remove("no-scroll");
  signFormModal.style.display = "none";
  signFormModal.close();
});

signFormModal.addEventListener("click", (e) => {
  const rect = signFormModal.getBoundingClientRect();
  if (
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom
  ) {
    document.querySelector("body").classList.remove("no-scroll");
    signFormModal.style.display = "none";
    signFormModal.close();
  }
});

const displayLoginForm = () => {
  loginsignUpForm.innerHTML = loginForm;
  forgotPassword.style.display = "block";
  notMember.style.display = "block";
  signupBtn.classList.remove("active-red");
  loginBtn.classList.add("active-red");
  const signupBtns = document.querySelectorAll(".SignupBtnM");
  signupBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      displaySignupForm();
    });
  });
  signFormModal.removeEventListener("submit", signFormForSignUp);
  signFormModal.addEventListener("submit", signFormForLogin);
};

const displaySignupForm = () => {
  loginsignUpForm.innerHTML = signUpForm;
  forgotPassword.style.display = "none";
  notMember.style.display = "none";
  signupBtn.classList.add("active-red");
  loginBtn.classList.remove("active-red");
  const loginBtns = document.querySelector(".LoginBtnM");
  loginBtns.addEventListener("click", () => {
    displayLoginForm();
  });
  signFormModal.removeEventListener("submit", signFormForLogin);
  signFormModal.addEventListener("submit", signFormForSignUp);
};

signInBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    displayLoginForm();
    signFormModal.style.display = "flex";
    signFormModal.showModal();
    document.querySelector("body").classList.add("no-scroll");
  });
});

registerBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    displaySignupForm();
    signFormModal.style.display = "flex";
    signFormModal.showModal();
    document.querySelector("body").classList.add("no-scroll");
  });
});

// modif pour + tard si jms
const signFormForSignUp = (e) => {
  e.preventDefault();
  let inputs = document.querySelectorAll(".login-signUp-Form input");
  let username = document.getElementById("usernameSignUP");
  let password = document.getElementById("passwordSignUP");
  let email = document.getElementById("emailSignUP");
  const regex = /^[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(,|$)/;
  if (!username.value) {
    username.style.border = "1px solid red";
  } else if (!password.value) {
    password.style.border = "1px solid red";
  } else if (!email.value.match(regex)) {
    email.style.border = "1px solid red";
  } else {
    inputs.forEach((i) => {
      i.style.border = "2px solid green";
    });
    console.log(username.value, password.value, email.value);
  }
};

const signFormForLogin = (e) => {
  e.preventDefault();
  let username = document.getElementById("usernameLogin").value;
  let password = document.getElementById("passwordLogin").value;
  let checkbox = document.getElementById("rememberMeLogin").checked;
  console.log(password, username, checkbox);
};
