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
    fetch("http://localhost:3000/register", {
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

    fetch("http://localhost:3000/login", {
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
