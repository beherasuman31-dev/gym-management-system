let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () =>{
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
}

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};



// typing text code

  const typed = new Typed(".multiple-text", {
      strings: ['Weight Gain', 'Strength Training', 'Running', 'Physical Fitness', 'Fat Loss', 'Zumba'],
      typeSpeed: 60,
      backSpeed: 60,
      backDelay: 1000,
      loop : true,
    });

// review put

let selectedRating = 0;

const stars = document.querySelectorAll("#starContainer span");

stars.forEach(star => {
    star.addEventListener("click", () => {
        selectedRating = star.getAttribute("data-value");

        stars.forEach(s => s.classList.remove("active"));
        for (let i = 0; i < selectedRating; i++) {
            stars[i].classList.add("active");
        }
    });
});

function addReview() {
    const name = document.getElementById("name").value;
    const text = document.getElementById("reviewText").value;

    if (!name || !text || selectedRating == 0) {
        alert("Fill all fields");
        return;
    }

    const reviewList = document.getElementById("reviewList");

    const div = document.createElement("div");
    div.classList.add("review-card");

    div.innerHTML = `
        <h4>${name}</h4>
        <p>${"★".repeat(selectedRating)}</p>
        <p>${text}</p>
    `;

    reviewList.prepend(div);

    // Reset
    document.getElementById("name").value = "";
    document.getElementById("reviewText").value = "";
    stars.forEach(s => s.classList.remove("active"));
    selectedRating = 0;
}

document.getElementById("profilePreview").src =
    "http://localhost:3000/uploads/" + data.filename;
  


  