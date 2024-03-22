require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mysql = require('mysql');

// MongoDB Connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB Atlas Database"));

// MySQL Connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Test the MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
  }
  console.log('Connected to MySQL database as ID ' + connection.threadId);
  connection.release(); // Release the connection
});



app.use(express.json());
const apiRouter = require("./routes/apiroutes");
app.use("/api", apiRouter);

// listening to the port ?
const port_forward = 3000;
app.listen(port_forward, () => {
  console.log("Server is listening for connections");
});
