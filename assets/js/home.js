/*
    --- swiper js ---
*/


const swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // When window width is <= 768px (small screens)
    768: {
      slidesPerView: 6, // Number of slides per view for small screens
    },
    1070: {
      slidesPerView: 10, // Number of slides per view for small screens
    },
  },
  autoplay: {
    delay: 1500, // Delay between slide transitions in milliseconds (e.g., 5000 = 5 seconds)
    disableOnInteraction: true, // Allow autoplay to continue even when user interacts with the slides
  },
});


 const swiperTwo = new Swiper('.siwiperPeople', {
  direction: "vertical",
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 1500, // Delay between slide transitions in milliseconds (e.g., 5000 = 5 seconds)
    disableOnInteraction: true, // Allow autoplay to continue even when user interacts with the slides
  },
});


const primumSwiper = new Swiper(".siwiperPremium", {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 1500, // Delay between slide transitions in milliseconds (e.g., 5000 = 5 seconds)
    disableOnInteraction: true, // Allow autoplay to continue even when user interacts with the slides
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


/*
    --- fancy js ---
*/

Fancybox.bind('[data-fancybox="gallery"]', {});

// ********************************  //

const baseUrl = `https://tarmeezacademy.com/api/v1`;
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const token = localStorage.getItem("token");
const createPostBtn = document.getElementById("createPost");
const titleFormDate = document.querySelector("#titleFormDate");
const bodyFormDate = document.querySelector("#bodyFormDate");
const imageFormDate = document.querySelector("#fileFormDate");
let number = 0;
const deleteBtn = document.getElementById('deleteBtn');


/*
    --- get all users ---
    --- put it in user image in all image profile user stories
*/
const imageStories = document.querySelectorAll(".storyImage");

async function getAllUsers() {
  try {
    const url = `${baseUrl}/users`;
    const response = await fetch(url);
    const responseData = await response.json();
    const swiperContainer = document.getElementById("swiperContainer");
    swiperContainer.classList.remove("hide")
    document.querySelector(".demo").classList.add("hide");
    document.querySelector(".demo1").classList.add("hide");
    document.querySelector("#PremiumSiwiper").classList.remove("hide");
    for (let i = 0; i < responseData.data.length; i++) {
      document.querySelector(`.people-${i}`).src=`${responseData.data[i].profile_image}` 
      document.querySelector(`.peopleName-${i}`).textContent=`${responseData.data[i].name}` 
      document.querySelector(`.people-${i}`).addEventListener("click",()=>{
        showInfoAboutUsers(responseData.data[i].id);
      })

      const profile_image = responseData.data[i].profile_image;
      imageStories[i].src = profile_image;
    }
  } catch (error) {
    console.log(error);
  }
}
getAllUsers();
swiper.update();
const story = document.querySelectorAll(".story");

async function stories() {
  const randomNumber = Math.floor(Math.random() * 120) + 1;
  try {
    const url = `${baseUrl}/posts?limit=15&page=${randomNumber}`;
    const response = await fetch(url);
    const responseData = await response.json();
    for (let i = 0; i < responseData.data.length; i++) {
      const profile_image = responseData.data[i].image;
      if (profile_image[0] === undefined) {
        story[i].href;
      } else {
        story[i].href = profile_image;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
stories();

/*
  --- make pagination scrolling --- 
*/

function pagination() {
  window.addEventListener("scroll", () => {
    if (document.body.offsetHeight <= window.scrollY + window.innerHeight) {
      showPost();
      number += 1;
    }
  });
}
pagination();




/*
    --- get user info ---
    ---change the name and picture profile----
*/

function changeProfileNav() {
  document.getElementById("userNAmeNav").textContent = userInfo.name;
  if (userInfo.profile_image[0] === undefined) {
    return;
  } else {
    document.getElementById("userImageNav").src = userInfo.profile_image;
  }
}

changeProfileNav();


/*
--- create a new post ---
*/
createPostBtn.addEventListener("click", (e) => {
let postInfo = {
  image: imageFormDate.files[0],
  body: bodyFormDate.value,
  title: titleFormDate.value,
};
if(createPostBtn.textContent === "create"){
  createNewPost(postInfo);
}else{
  updatePost(postInfo)
}

});

function createNewPost({ image, body, title }) {
const formdata = new FormData();
formdata.append("title", title);
formdata.append("body", body);
formdata.append("image", image);

axios
  .post(`${baseUrl}/posts`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  })
  .then(function (response) {
    alert("successefully created post");
    document.getElementById("preloader").classList.toggle("hidden");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  })
  .catch(function (error) {
    alert(error.response.data.message, "danger");
  });
}


/*
  -- make alert
*/

function alert(message, bgColor = "secondary") {
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


/*
--- show post ---
*/
async function showPost() {
try {
  const url = `${baseUrl}/posts?limit=5&page=${number}`;
  const response = await fetch(url);
  const responseData = await response.json();
  for (let i = 0; i < responseData.data.length; i++) {
    let ApiInfo = {
      image_profile: responseData.data[i].author.profile_image,
      name: responseData.data[i].author.name,
      comments: responseData.data[i].comments_count,
      post_image: responseData.data[i].image,
      time: responseData.data[i].created_at,
      title: responseData.data[i].title || "title",
      body: responseData.data[i].body || "Welcome to ur journalistic trip!",
      id: responseData.data[i].id,
    };
    if (ApiInfo.image_profile[0] === undefined) {
      ApiInfo.image_profile = "./assets/images/logo.png";
    }
    if (ApiInfo.post_image[0] === undefined) {
      ApiInfo.post_image = "./assets/images/logo.png";
    }
    addNewPost(ApiInfo);
  }
} catch (error) {
  console.log(error);
}
}

/*
--- add all comments to the post and add all new posts to the
*/

function addNewPost({
image_profile,
name,
time,
post_image,
comments,
title,
body,
id,
}) {
axios
  .get(`${baseUrl}/posts/${id}`)
  .then(function (response) {
    const postComments = response.data.data.comments;
    
    const tags = response.data.data.tags;
    const commentsHtml = postComments
      .map(
        (comment) => `
<div class="card card-body border-0">
    <div class="postInfo mb-3 d-flex gap-2 align-items-center row">
        <img src="${comment.author.profile_image}" alt="profile image"
            class="col-3 image-size-sm rounded-circle border border-dark-subtle p-1 curser" onclick="showInfoAboutUsers(${comment.author.id})">
        <div class="name col-8 d-flex gap-2">
            <p class="m-0 p-0 font-monospace">${comment.author.name}</p>
            <p class="m-0 p-0 fw-light">${comment.author.updated_at.slice(
              5,
              -11
            )}</p>
        </div>
        <i class="col-1 fa-solid fa-ellipsis text-end"></i>
    </div>
    <p>${comment.body}</p>
</div>
  `
      )
      .join("");
    /*
              --- get all tags ---
      */
    let tagPosts = tags
      .map(
        (tag) =>
          ` <p class="tag-paragraph fw-light px-1"># ${tag.arabic_name}</p>`
      )
      .join("");

    // ----------------------------------------------------------------

    /*
                  --- to hidden the btn setting in all posts ---
              */
    let className = "hidden";
    if (response.data.data.author.id === userInfo.id) {
      className = "";
    } else {
      className = "hidden";
    }

    // ----------------------------------------------------------------

    document.getElementById("post").innerHTML += `
  <div class="card col-12  mb-3  p-3 position-relative">
    <div id="preloader" class="hidden">
      <div class="negm">
        <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
      </div>
    </div>
  <div class="postInfo mb-3 d-flex gap-2 align-items-center row">
      <img src="${image_profile}" alt="profile image"
          class="col-3 image-size-sm rounded-circle border border-dark-subtle p-1 curser" onclick="showInfoAboutUsers(${response.data.data.author.id})">
      <div class="name col-8">
          <p class="m-0 p-0 font-monospace">${name}</p>
          <p class="m-0 p-0 fw-light">${time}</p>
      </div>
      <div class="btn-group dropend ${className} curser col-1 text-end">
          <i class="fa-solid fa-ellipsis curser fs-4" data-bs-toggle="dropdown" aria-expanded="false"></i>
          <ul class="dropdown-menu">
            <li class="position-relative ${id}">
              <button type="button" class="btn position-absolute w-100 h-100" data-bs-toggle="modal"
              data-bs-target="#exampleModal" onclick="changeModalContent(event)">
              </button>
              <a class="dropdown-item " >Edit</a>
            </li>
            <li><a class="dropdown-item hover" onclick="ShowPopup(${id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</a></li>
          </ul>
      </div>
  </div>
  <h3 id="titlePost">${title}</h3>
  <p id="bodyPost">${body}</p>
  <div class="tags d-flex">
              ${tagPosts}
  </div>

  <img src="${post_image}" class="card-img-top mw-100 image-post rounded" alt="post image">
  <div class="card-body p-0 pt-3 d-flex justify-content-between" data-bs-toggle="collapse"
      href="#collapceComment" role="button" aria-expanded="false"
      aria-controls="collapceComment">

      <div class="comment">
          <i class="fa-solid fa-comment-dots p-2 bg-secondary-subtle rounded-circle "></i>
          <p class="d-inline mx-1">${comments}</p>
      </div>
      <div class="share">
          <i
              class="fa-solid fa-arrow-up-from-bracket me-1 p-2 bg-secondary-subtle rounded-circle"></i>
          <i class="fa-regular fa-paper-plane p-2 bg-secondary-subtle rounded-circle "></i>
      </div>
  </div>
  <div class="allComments collapse mt-4" id="collapceComment">
    ${commentsHtml}
    <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="create comment"
        aria-label="Recipient's username" aria-describedby="basic-addon2" id="createComment">
    <span class="input-group-text bg-info-subtle p-0" id="basic-addon2"><i
            class="fa-solid fa-paper-plane text-info p-3 curser" id=${id} onclick="createCommentes(event)"></i></span>
    </div>

  </div>
</div>
  `;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}

showPost();


/*
--- make anew comment and add event preloader ---
*/
function putCommentApi(postId, text, parentNoDepth) {
  axios
    .post(
      `${baseUrl}/posts/${postId}/comments`,
      {
        body: `${text}`,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(function (response) {
      alert("successefully created comment");
      parentNoDepth.classList.toggle("hidden");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch(function (error) {
      alert(error.response.data.message, "danger");
    });
}

function createCommentes(event) {
  let textValue = event.target.parentNode.parentNode.children[0].value;
  const id = event.target.id;
  const parentNoDe =
    event.target.parentNode.parentNode.parentNode.parentNode.children[0];
  putCommentApi(id, textValue, parentNoDe);
}

/*
  --- delete posts that u can to access for it  ---
*/

function deletePost(postId) {
  axios
    .delete(
      `${baseUrl}/posts/${postId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(function (response) {
      document.querySelector("#staticBackdrop #preloader").classList.toggle("hidden");
      setTimeout(()=>{
        window.location.reload();
      },1000)
    })
    .catch(function (error) {
      console.log(error);
    });
}
function ShowPopup(postId) {
  const deleteNowHandler = deleteNow.bind(null, 'delete', postId);
  deleteBtn.addEventListener('click', deleteNowHandler);
}

function deleteNow(fakeID,id) {
  if(id != ""){
    deletePost(id);
  }
}

/*
  --- update posts  ---
*/

function updatePost({body,title,image}){
  let id = localStorage.getItem("IdPostUpdate")
  const formdata = new FormData();
  formdata.append("title", title);
  formdata.append("body", body);
  formdata.append("image", image);
  formdata.append("_method","put");

  axios
    .post(`${baseUrl}/posts/${id}`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      alert("successefully created post");
      document.getElementById("preloader").classList.toggle("hidden");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch(function (error) {
      alert(error.response.data.message, "danger");
    });
}


/*
  --- check if is function create or delete to update the same modal for the both
*/

function changeModalContent(event){
  if(event.target.parentNode.classList[0]==="publishPost"){
    document.getElementById("exampleModalLabel").textContent="Create new post"
    document.getElementById("createPost").textContent="create"
  }else{
    document.getElementById("exampleModalLabel").textContent="Update ur post"
    document.getElementById("createPost").textContent="Update"
    localStorage.setItem("IdPostUpdate",event.target.parentNode.classList[1])
  }
}


/*
  ---- set id for target user in localStorage ti use it in page profile ---
*/

function showInfoAboutUsers(id){
  localStorage.setItem("userTargetId",id)
  window.location.href="profile.html"
}



/*
  --- get all tags ---
*/

function getTags(){
  axios.get(`${baseUrl}/tags`)
  .then(function(response){
        putTags(response.data.data)
  })
  .catch(function(error){
    console.log(error)
  })
}


function putTags(tags){
  for(let tag of tags){
    document.querySelector(".Tag .trends").innerHTML +=`
  <div class=" row">
    <p class="col-1 p-0 m-0 text-center fw-bold">#</p>
      <div class="text col-10">
        <p class="p-0 m-0">${tag.arabic_name}</p>
        <p class="fw-light">${tag.description}</p>
      </div>
  </div>
    
    
    `
  }
}
getTags();