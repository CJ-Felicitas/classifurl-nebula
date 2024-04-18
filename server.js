require("dotenv").config();


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as ID " + connection.threadId);
  connection.release(); 
});

app.use(express.json());
const apiRouter = require("./routes/apiroutes");
app.use("/api", apiRouter);

// listening to the port ?
const port_forward = 3000;
app.listen(port_forward, () => {
  console.log("Server is listening for connections");
});
