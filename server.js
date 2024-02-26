const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Here");
  res.send("test");
});

app.listen(3000);
