/*
    -- create a new a count
*/
const urlBase = "https://tarmeezacademy.com/api/v1";
const registerBtn = document.getElementById("register");
const imageUpload = document.getElementById("file");
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const allInfo = {
    username: document.getElementById("Username").value,
    name: document.getElementById("name").value,
    image: imageUpload.files[0],
    password: document.getElementById("password").value,
  };
  createNewAccount(allInfo);
});

function createNewAccount({image,username,name,password}) {
  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("username",username);
  formdata.append("password", password);
  formdata.append("image", image);

  axios
    .post(`${urlBase}/register`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      localStorage.setItem("token", response.data.token)
       storageUserData(username,password);
       alert();
       document.getElementById("preloader").classList.toggle("hidden");
       setTimeout(()=>{
        window.location.href= "index.html";
      },1000)
    })
    .catch(function (error) {
      alert(error.response.data.message,"danger");
    });
}

function storageUserData(userName,password){
  localStorage.setItem("userName",userName)
  localStorage.setItem("password",password)
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


