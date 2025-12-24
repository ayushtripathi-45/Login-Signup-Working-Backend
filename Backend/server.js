require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// ✅ SIGNUP API
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("All fields required");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) {
      return res.status(400).json("Email already exists");
    }
    res.json("Signup successful");
  });
});


// ✅ LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (result.length === 0) {
      return res.status(404).json("User not found");
    }

    const isMatch = bcrypt.compareSync(password, result[0].password);
    if (!isMatch) {
      return res.status(401).json("Invalid password");
    }

    res.json("Login successful");
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
