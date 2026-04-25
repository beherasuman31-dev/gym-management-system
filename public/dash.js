// ================= LOGIN CHECK =================
window.onload = function () {
    const email = localStorage.getItem("loggedInUser");

    if (!email) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    // user data fetch
    fetch(`http://10.36.114.79:3000/user/${email}`)
        .then(res => res.json())
        .then(data => {
            console.log("User:", data);
        })
        .catch(err => console.error(err));

    showSection('workout');
};




const data = {
    workout: {
        categories: ["Chest", "Shoulder", "Back", "Legs", "Biceps", "Triceps"],
        items: {
            "Chest": [
                { name: "Incline Press", img: "image/incline.jpeg" },
                { name: "Pec dec Fly", img: "image/pec dec fly.jpeg" },
                { name: "Decline Press", img: "image/decline.jpeg" }
            ],
            "Shoulder": [
                { name: "Overhead Press", img: "image/soulder press.jpeg" },
                { name: "Lateral Raise", img: "image/lateral rise.jpeg" },
                { name: " Reardelt Fly", img: "image/reardelt.jpeg" }
            ],

            "Back": [
                { name: "Latepull Down", img: "image/latepull....jpeg" },
                { name: "Seated Row", img: "image/seated row.jpeg" },
                { name: "Single arm back", img: "image/back...jpeg" }
            ],

            "Legs": [
                { name: "Leg Press", img: "image/legg press.jpeg" },
                { name: "Squat", img: "image/squat1.jpeg" },
                { name: "Leg Extention", img: "image/exten.jpeg" }
            ],


            "Biceps": [
                { name: "Bycep Curl", img: "image/single arm byc.jpeg" },
                { name: "Pitcher Curl", img: "image/pitcher.jpeg" },
                { name: "Incline Hammer curl", img: "image/backbyceps.jpeg" }
            ],


            "Triceps": [
                { name: "Overhead Extention", img: "image/overhead.jpeg" },
                { name: "Push Down", img: "image/pushdown.jpeg" },
                { name: " Back Dips", img: "image/back dips.jpeg" }
            ],
        }
    },
    diet: {
        categories: ["Veg", "Non-Veg"],
        items: {
            "Veg": [
                { name: "Paneer", img: "image/paneer.jpeg" },
                { name: "Soya Chunks", img: "image/soya.jpeg" },
                { name: "Dal", img: "image/dal.jpeg" }
            ],
            "Non-Veg": [
                { name: "Grilled Chicken", img: "image/chicken.jpeg" },
                { name: "Boiled Eggs", img: "image/EGGG.jpeg" },
                { name: "Fish Fillet", img: "image/Fish.jpeg" }
            ]
        }
    },
    
    trainer: {
        categories: ["Male", "Female"],
        items: {
            "Male": [
                { name: "Suman Sourav Behera", img: "image/IMG_20260416_124939.png" },
                { name: "Somanath Nayak", img: "image/trainer.jpeg" },
                { name: "Dhirapani Behera", img: "image/trainer2.jpeg" }
            ],
            "Female": [
                { name: "Swapna Mishra", img: "image/female.jpeg" },
                { name: "Sanjana Tripathi", img: "image/female1.jpeg" },
                { name: "Jyotshna Senapati", img: "image/fe.jpeg" }
            ]
        }
    },





    supplements: {
        categories: ["Protein","Creatin" , "Mass Gainer"],
        items: {
            "Protein": [
                { name: "Whey Protein", img: "image/Whey.jpeg" }
            ],
            "Creatin": [
                { name: "Creatin", img: "image/creatin.jpeg" }
            ],

             "Mass Gainer": [
                { name: "Mass Gainer", img: "image/mass.jpeg" }
            ],


            




        }
    }
};

function showSection(section , element = null ) {
    const contentArea = document.getElementById('content-area');
    const displayGrid = document.getElementById('display-grid');
    
    // Update sidebar active state
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    event.currentTarget.classList.add('active');

    displayGrid.innerHTML = ''; // Clear cards
    
    let html = `<div class="category-menu fade-in">`;
    data[section].categories.forEach(cat => {
        html += `<button class="btn-choice" onclick="showCards('${section}', '${cat}')">${cat}</button>`;
    });
    html += `</div>`;
    
    contentArea.innerHTML = html;
}

function showCards(section, category) {
    const displayGrid = document.getElementById('display-grid');
    displayGrid.innerHTML = ''; 

    const items = data[section].items[category] || [];
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="card-info">
                <h3>${item.name}</h3>
                <p>Top choice for your goals</p>
            </div>
        `;
        displayGrid.appendChild(card);
    });
}

// Default Section
window.onload = () => showSection('workout');



// Data object re 'bmi' section add karantu
const bmiHTML = `
    <div class="card fade-in" style="width: 153%; margin: 20px auto; padding: 30px; background:black">
        <h2 style="text-align:center; margin-bottom:20px; color:white">Check Your BMI</h2>
        <div style="margin-bottom:15px; color:white">
            <label>Weight (kg):</label>
            <input type="number" id="weight" placeholder="Ex: 70" style="width:100%; padding:10px; margin-top:5px; border-radius:8px; border:1px solid #ddd;">
        </div>
        <div style="margin-bottom:15px; color:white">
            <label>Height (cm):</label>
            <input type="number" id="height" placeholder="Ex: 175" style="width:100%; padding:10px; margin-top:5px; border-radius:8px; border:1px solid #ddd;">
        </div>
        <button onclick="calculateBMI()" class="btn-choice" style="width:100%; background:var(--primary-color); color:white;">Calculate Now</button>
        
        <div id="bmi-result" style="margin-top:20px; text-align:center; font-weight:bold; font-size:1.2rem; color:white"></div>
    </div>
`;

// showSection function re BMI handle karantu
function showSection(section) {
    const contentArea = document.getElementById('content-area');
    const displayGrid = document.getElementById('display-grid');
    
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    event.currentTarget.classList.add('active');

    displayGrid.innerHTML = ''; 

    if (section === 'bmi') {
        contentArea.innerHTML = bmiHTML;
    } else {
        // Puruna logic (Workout/Diet pain)
        let html = `<div class="category-menu fade-in">`;
        data[section].categories.forEach(cat => {
            html += `<button class="btn-choice" onclick="showCards('${section}', '${cat}')">${cat}</button>`;
        });
        html += `</div>`;
        contentArea.innerHTML = html;
    }
}

// BMI Calculation Formula
function calculateBMI() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value / 100; // cm to meters
    const resultDiv = document.getElementById('bmi-result');

    if (weight > 0 && height > 0) {
        const bmi = (weight / (height * height)).toFixed(1);
        let message = "";
        let color = "";

        if (bmi < 18.5) {
            message = "Underweight (Under Weight)";
            color = "#ffcb00";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            message = "Healthy (Fit)";
            color = "#2ecc71";
        } else {
            message = "Overweight (Over Weight)";
            color = "#e74c3c";
        }

        resultDiv.innerHTML = `Your BMI: <span style="color:${color}">${bmi}</span><br><small>${message}</small>`;
    } else {
        resultDiv.innerHTML = "Please enter valid numbers!";
    }
}


