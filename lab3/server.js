const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_auth",
  port: 3306   // change to 3307 if you changed MySQL port
});

db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// Register API
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, password], () => {
    res.send("User Registered Successfully");
  });
});

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username=? AND password=?";
  db.query(sql, [username, password], (err, result) => {
    if (result.length > 0) {
      res.send("Login Successful");
    } else {
      res.send("Invalid Credentials");
    }
  });
});

app.listen(3000, () => {
  console.log("Node server running on port 3000");
});
