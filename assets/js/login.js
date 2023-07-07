/*
    -- show password and hide password
*/
const urlBase = `https://tarmeezacademy.com/api/v1`;
const showPass = document.getElementById("checkbox");
const password = document.getElementById("login-pass");
const userNameLogin = document.getElementById("userNameLogin");
showPass.addEventListener("change", () => {
  showPass.checked ? (password.type = "text") : (password.type = "password");
});

/*
    -- make the input field empty with changing in last register
*/
userNameLogin.value = localStorage.getItem("userName");
password.value = localStorage.getItem("password");

/*
    -- login user
*/
const loginBtn = document.querySelector(".sigin-btn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let loginUserInfo = {
    username: userNameLogin.value,
    password: password.value,
  };

  login(loginUserInfo);
});

/*
    -- Get api login information
*/

function login({ username, password }) {
  const data = {
    username: username,
    password: password,
  };
  axios
    .post(`${urlBase}/login`, data, {
      headers: {
        accept: "application/json",
      },
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));

      // to make the input field is empty wih last changing
      storageLastChange(username, password);
      alert();
      document.getElementById("preloader").classList.toggle("hidden");
      setTimeout(()=>{
        window.location.href= "home.html";
      },1000)
    })
    .catch((error) => {
      alert(error.response.data.message, "danger");
    });
}

/*
    -- to make the input field is empty wih last changing
*/
function storageLastChange(username, password) {
  localStorage.setItem("userName", username);
  localStorage.setItem("password", password);
}

/*
    -- make alert
*/

function alert(message = "Successfully logged in !!", bgColor = "secondary") {
  const alertDiv = document.createElement("div");
  alertDiv.classList = `alert alert-${bgColor} alert-dismissible fade show w-100`;
  alertDiv.role = `alert`;
  const strongHeader = document.createElement("strong");
  strongHeader.textContent = `${message}`;
  const closeButtonAlert = document.createElement("button");
  closeButtonAlert.type = "button";
  closeButtonAlert.className = "btn-close";
  closeButtonAlert.setAttribute("data-bs-dismiss", "alert");
  closeButtonAlert.setAttribute("aria-label", "Close");
  alertDiv.append(strongHeader);
  alertDiv.append(closeButtonAlert);
  document.getElementById("alerts").append(alertDiv);
}
