const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const mysql = require('mysql');
const axios = require('axios');

// Create MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

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
router.post('/submiturl', async (req, res) => {
    console.log("Received POST request to submiturl");
    // Assuming you want to access data sent in the request body
    const url = req.body.url;
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', { url });
        console.log(response.data.received_data); // Log the response data
        console.log(response.data.message);
        // Sending a JSON response
        res.json({
            flask: response.data.message,
            message: 'Received POST request to submiturl',
            status: 'success',
            data: response.data.received_data // Sending back the request data in response
        });
    } catch (error) {
        console.error("Error making request to Flask:", error);
        res.status(500).json({
           
            message: 'Error occurred while making request to Flask',
            status: 'error'
        });
    }
});
// POST route to report URL
router.post('/reportURL', (req, res) => {
    console.log("reportURL");

    const url = req.body.url;
    
    // Check if the URL exists in the table
    pool.query('SELECT * FROM report_table WHERE url = ?', [url], (error, results, fields) => {
        if (error) {
            console.error("Error checking URL:", error);
            res.status(500).json({
                message: 'Error occurred',
                status: 'error'
            });
        } else {
            if (results.length > 0) {
                // If URL exists, update the count
                pool.query('UPDATE report_table SET report_count = report_count + 1 WHERE url = ?', [url], (error, results, fields) => {
                    if (error) {
                        console.error("Error incrementing count:", error);
                        res.status(500).json({
                            message: 'Error occurred',
                            status: 'error'
                        });
                    } else {
                        res.json({
                            message: 'URL reported successfully',
                            status: 'success'
                        });
                    }
                });
            } else {
                // If URL doesn't exist, insert a new row
                pool.query('INSERT INTO report_table (url, report_count) VALUES (?, 1)', [url], (error, results, fields) => {
                    if (error) {
                        console.error("Error inserting URL:", error);
                        res.status(500).json({
                            message: 'Error occurred',
                            status: 'error'
                        });
                    } else {
                        res.json({
                            message: 'URL reported successfully',
                            status: 'success'
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;