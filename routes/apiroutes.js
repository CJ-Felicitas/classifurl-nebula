const express = require('express');
const router = express.Router();

const {TestResponseController} = require('../controllers/TestResponseController');
const {SubmitUrlController} = require('../controllers/SubmitUrlController');
const {ReportUrlController} = require('../controllers/ReportUrlController');
const { GetReportedUrlController } = require('../controllers/GetReportedUrlController');

const { PullEvent } = require('../webhook/PullEvent');

// Middleware to log IP addresses
router.use((req, res, next) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Request from IP:', ipAddress);
    next();
});

// test response if server is working
router.get('/', TestResponseController);

// submit a url to the themis (flask) server.
router.post('/submiturl', SubmitUrlController);

// report a url then record it to the MySQL database server
router.post('/reporturl', ReportUrlController);

router.get('/getreportedurl', GetReportedUrlController);

router.post('/pullEvent', PullEvent);

module.exports = router;