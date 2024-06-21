const loginForm = `
        <form id="loginForm" class="login-signUp-Form">
          <input type="text" placeholder="username" id="usernameLogin" />
          <input type="password" placeholder="password" id="passwordLogin" />
          <div class="remember-me">
            <input type="checkbox" id="rememberMeLogin" />
            <label for="rememberMeLogin">Remember me</label>
          </div>
          <button>Login</button>
        </form>`;

const signUpForm = `
        <form id="SignUpForm" class="login-signUp-Form">
          <input type="text" placeholder="username" id="usernameSignUP" />
          <input type="password" placeholder="password" id="passwordSignUP" />
          <input type="text" placeholder="email" id="emailSignUP" />
          <button>SignUp</button>
        </form>`;

const signInBtn = document.querySelectorAll(".signInBtn");
const registerBtn = document.querySelectorAll(".registerBtn");
const signFormModal = document.getElementById("signForm");
const loginsignUpForm = document.querySelector(".login-signUp-Form");
const forgotPassword = document.querySelector(".forgot-password");
const signupBtn = document.querySelector(".SignupBtn");
const loginBtn = document.querySelector(".LoginBtn");
const crossSign = signFormModal.querySelector(".cross");

crossSign.addEventListener("click", () => {
  signFormModal.style.display = "none";
  signFormModal.close();
});

signInBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    loginsignUpForm.innerHTML = loginForm;
    signFormModal.style.display = "flex";
    signFormModal.showModal();
    forgotPassword.style.display = "block";
    signupBtn.classList.remove("active-red");
    loginBtn.classList.add("active-red");
  });
});

registerBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    loginsignUpForm.innerHTML = signUpForm;
    signFormModal.style.display = "flex";
    signFormModal.showModal();
    forgotPassword.style.display = "none";
    signupBtn.classList.add("active-red");
    loginBtn.classList.remove("active-red");
  });
});
