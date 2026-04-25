const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

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

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, plan, amount } = req.body;

    // ✅ Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    console.log("Incoming Data:", req.body); // debug

    // 🔍 Check duplicate
    const [existing] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Insert
    await db.promise().query(
      "INSERT INTO users (username, email, password, plan, amount) VALUES (?, ?, ?, ?, ?)",
      [username, email, hashedPassword, plan ?? null, amount ?? null]
    );

    return res.json({ success: true, message: "Registration successful ✅" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    return res.status(500).json({success: false, message: "Server error" });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [result] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({ message: "Login successful ✅" });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ================= GET USER =================
app.get("/user/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const [result] = await db.promise().query(
      "SELECT id, username, email, plan, amount FROM users WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(result[0]);

  } catch (err) {
    console.log("GET USER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ================= SERVER =================
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000 🚀");
});