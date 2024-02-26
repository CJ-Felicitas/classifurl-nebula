const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    console.log(`Request from IP: ${ip}`);
  res.send('🎯nebula🎯');
});

app.listen(3000);
