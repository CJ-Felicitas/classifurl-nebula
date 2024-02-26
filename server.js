const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Here");
  res.send('🎯nebula🎯');
});

app.listen(3000);
