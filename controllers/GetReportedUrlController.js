const axios = require("axios");
const mysql = require("mysql");


exports.GetReportedUrlController = async (req, res) => {
    // connect to mysql and get all the data from the report_table
    console.log("Get reported URL route accessed");

    const pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    // perform a query to get all the data from the report_table and sort by report_count in descending order
    pool.query("SELECT * FROM report_table ORDER BY report_count DESC", (error, results, fields) => {
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
        
        // Close the database connection after the query is done
        pool.end((err) => {
            if (err) {
                console.error("Error closing database connection:", err);
            } else {
                console.log("Database connection closed successfully");
            }
        });
    });
};
