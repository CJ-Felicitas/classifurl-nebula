const axios = require("axios");
const mysql = require("mysql");

exports.GetReportedUrlController = async (req, res) => {
    // connect to mysql and get all the data from the report_table
    const pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    // perform a query to get all the data from the report_table
    pool.query("SELECT * FROM report_table", (error, results, fields) => {
        if (error) {
            console.error("Error getting data from report_table:", error);
            res.status(500).json({
                message: "Error occurred",
                status: "error",
            });
        } else {
            res.json({
                message: "Data retrieved successfully",
                status: "success",
                data: results,
            });
        }
    });
};
