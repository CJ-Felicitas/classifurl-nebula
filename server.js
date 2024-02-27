require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
const apiRouter = require("./routes/apiroutes");
app.use("/api", apiRouter);

// listening to the port ?
const port_forward = 3000;
app.listen(port_forward, () => {
  console.log("Server is listening for connections");
});
