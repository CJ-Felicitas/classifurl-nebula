const express = require('express');
const router = express.Router();

// test route
router.get('/', (req, res)=>{
    console.log("test response get route");
    res.send('test response');
});

module.exports = router;