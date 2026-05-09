const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ================= TEST =================
app.get("/test", (req, res) => {
  res.send("Server working ✅");
});

// ================= MYSQL =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Behera@123",
  database: "gym_db",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL connected....");
  }
});

// ================= REGISTER API =================
app.post("/register", (req, res) => {

    const { username, email, password,gender } = req.body;

    const sql = `
    INSERT INTO users
    (username, email, password,gender, plan, amount)
    VALUES (?, ?, ?, ?, ?,?)
    `;

    db.query(
        sql,
        [username, email, password, gender, "Free", 0],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.json({
                    message: "Registration Failed"
                });
            }

            res.json({
                message: "Registration successful ✅"
            });
        }
    );
});


// ================= MEMBERSHIP REGISTER API =================
// MEMBERSHIP REGISTER
app.post("/membership-register", (req, res) => {

    const {
        username,
        email,
        password,
        gender,
        plan,
        amount
    } = req.body;

    const sql = `
    INSERT INTO users
    (username, email, password, gender, plan, amount)
    VALUES (?, ?, ?, ?, ?,?)
    `;

    db.query(
        sql,
        [username, email, password,gender, plan, amount],

        (err, result) => {

            if (err) {
                console.log(err);

                return res.json({
                    message: "Membership Failed"
                });
            }

            res.json({
                message: "Membership Registration successful ✅"
            });
        }
    );
});

// ================= LOGIN API =================
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            message: "Fill all fields"
        });
    }

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            console.log(err);
            return res.json({
                message: "Database Error"
            });
        }

        if (result.length > 0) {
            res.json({
                message: "Login successful ✅"
            });
        } else {
            res.json({
                message: "Invalid Email or Password"
            });
        }
    });
});




// Get All user API
app.get("/users", (req, res) => {

    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            return res.json([]);
        }

        res.json(result);

    });

});


// Delete USer API
app.delete("/delete-user/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM users WHERE id=?",
        [id],
        (err, result) => {

            if(err){
                return res.json({
                    message:"Delete Failed"
                });
            }

            res.json({
                message:"User Deleted"
            });

        }
    );

});
// ================= SERVER =================
app.listen(3000, () => {
    console.log("Server Running on Port 3000 ✅");
});