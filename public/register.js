
let selectedPlan = "";
let selectedAmount = 0;

function selectPlan(plan, amount) {
    selectedPlan = plan;
    selectedAmount = amount;
    document.getElementById("selected").innerText = plan + " - ₹" + amount;
}

function proceedPay() {
    if (!selectedPlan) {
        alert("Select plan first");
        return;
    }

    document.getElementById("qrBox").style.display = "block";
    document.getElementById("amountText").innerText = "Pay ₹" + selectedAmount;
}

function paymentDone() {
    alert("Payment Successful");
    document.getElementById("formBox").style.display = "block";
}

function registerUser() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

fetch("http://10.36.114.79:3000/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username,
    email,
    password,
    plan: selectedPlan,
    amount: selectedAmount
  })
})
.then(res => res.json())
.then(data => {
  alert(data.message);
  if (data.message.includes("successful")) {
        // optional: thoda delay for UX
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    }

})
}