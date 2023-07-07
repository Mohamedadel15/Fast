

const baseUrl = `https://tarmeezacademy.com/api/v1`;
const token = localStorage.getItem("token");
const userInfo = JSON.parse(localStorage.getItem("userInfo"));



/*
  --- make dynamic nav for user setting profile --- 
*/
function changeContent(action) {
    document.querySelectorAll(`.profileInfoCard  .links p.curser`).forEach((link)=>{
        link.classList.remove("active")
    })
  const element = document.getElementById("userACtion");
  while (element.classList.length > 0) {
    element.classList.remove(element.classList.item(0));
  }

  if (action === "name") {
    document.querySelector(`.profileInfoCard  .links .${action}`).classList.add("active");
    element.classList.add("username","px-5","margin-0")
  } else if (action === "userName") {
    document.querySelector(`.profileInfoCard  .links .${action}`).classList.add("active");
    element.classList.add("username","px-5","margin-100")
  } else {
    document.querySelector(`.profileInfoCard  .links .${action}`).classList.add("active");
    element.classList.add("username","px-5","margin-200")

  }
}


function getUserInfo() {
    axios.get(`${baseUrl}/users/${userInfo.id}`,{
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(function(response) {
         let data = {
            image_profile:response.data.data.profile_image,
            name:response.data.data.name,
            comments:response.data.data.comments_count,
            userName:response.data.data.username,
            postCount:response.data.data.posts_count,
         }
         if(data.image_profile[0] === undefined){
          data.image_profile ="./assets/images/logo.png"
         }
         fillContent(data)
    })
    .catch(function(error) {
        console.log(error)
    })
}

getUserInfo()



function fillContent({image_profile,name,userName}){
    document.querySelector("div.image img").src=image_profile
    document.querySelector(".profileInfoCard div.name h2.text-capitalize").textContent=name
    document.querySelector(".profileInfoCard div.name p.text-primary").textContent=`@ ${userName}`
    document.getElementById("oldName").value =name
    document.getElementById("oldUserName").value=`@${userName}`
}


function passowrdLength(){
    document.querySelectorAll(".passowrdLength").forEach(pasword=>{
        pasword.placeholder= "*".repeat(localStorage.getItem("password").length) 
        // console.log()
    })
}
passowrdLength();