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



// Show Register Form
function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

// Show Login Form
function showLogin() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}


function Register() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (username === "" || email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    //  Backend call (FREE PLAN)
    fetch("http://10.36.114.79:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            plan: "Free",    
            amount: 0     
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);

        // optional: login page show
        showLogin();
    })
    .catch(err => {
        console.error("ERROR:", err);
        alert("Server error");
    });
}

// Login Function
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Fill all fields");
        return;
    }

    fetch("http://10.36.114.79:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === "Login successful ✅") {
            alert("Login Successful");

            // ✅ store email for dashboard
            localStorage.setItem("loggedInUser", email);

            window.location.href = "dashbord.html";
        } else {
            alert(data.message);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Server error");
    });
}



































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
  


  