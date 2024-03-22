const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const mysql = require('mysql');

// Middleware to log IP addresses
router.use((req, res, next) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Request from IP:', ipAddress);
    next();
});

// test route
router.get('/', (req, res) => {
    console.log("Test response for GET route");
    
    // Sending a JSON response
    res.json({
        message: 'Test response',
        status: 'success'
    });
});

// POST route
router.post('/submiturl', (req, res) => {
    console.log("Received POST request to submiturl");

    // Assuming you want to access data sent in the request body
    const url = req.body.url;


    res.json({
        message: 'Received POST request to submiturl',
        status: 'success',
        data: url // Sending back the request data in response
    });
});

module.exports = router;