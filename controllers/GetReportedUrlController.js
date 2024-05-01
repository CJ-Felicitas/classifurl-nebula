const mysql = require("mysql");
exports.GetReportedUrlController = async (req, res) => {
    console.log("Get reported URL route accessed");

    const pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    // get report count in descending order limited to 10 returns only
    pool.query("SELECT * FROM report_table ORDER BY report_count DESC LIMIT 10", (error, results, fields) => {
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
    // close query because server can't handle too many open connections  
        pool.end((err) => {
            if (err) {
                console.error("Error closing database connection:", err);
            } else {
                console.log("Database connection closed successfully");
            }
        });
    });
};
