const express = require('express');
const router = express.Router();

// test route
router.get('/', (req, res) => {
    console.log("Test response for GET route");
    
    // Sending a JSON response
    res.json({
        message: 'Test response',
        status: 'success'
    });
});


module.exports = router;