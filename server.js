const express = require("express");
const app = express();

app.set('trust proxy', true);  // Enable trusting of proxy headers

app.get("/", (req, res) => {
  const ipAddress = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const ipv4Address = ipAddress.split(':').pop();  // Extract IPv4 address from ::ffff:127.0.0.1

  console.log(`Request from IP: ${ipv4Address}`);
  res.send('🎯nebula🎯');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
