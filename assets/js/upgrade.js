        /*
            --- swiper js ---
        */
            const swiper = new Swiper(".swiper", {
                slidesPerView: 1,
                spaceBetween: 10,
                loop: false,
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
                        slidesPerView: 2, // Number of slides per view for small screens
                    },
                    1070: {
                        slidesPerView: 3, // Number of slides per view for small screens
                    },
                },
                autoplay: {
                    // delay: 1500, // Delay between slide transitions in milliseconds (e.g., 5000 = 5 seconds)
                    // disableOnInteraction: true, // Allow autoplay to continue even when user interacts with the slides
                },
            });


/*
      --- get user info ---
      ---change the name and picture profile----
  */
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      function changeProfileNav() {
        document.getElementById("userNAmeNav").textContent = userInfo.name;
        if (userInfo.profile_image[0] === undefined) {
          return;
        } else {
          document.getElementById("userImageNav").src = userInfo.profile_image;
        }
      }
      
      changeProfileNav();
      