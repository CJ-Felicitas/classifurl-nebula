const mysql = require("mysql");

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

exports.ReportUrlController = async (req, res) => {
  console.log("report Url route accessed");
  const url = req.body.url;

  // Check if the URL exists in the table
  pool.query(
    "SELECT * FROM report_table WHERE url = ?",
    [url],
    (error, results, fields) => {
      if (error) {
        console.error("Error checking URL:", error);
        res.status(500).json({
          message: "Error occurred",
          status: "error",
        });
      } else {
        if (results.length > 0) {
          // If URL exists, update the count
          pool.query(
            "UPDATE report_table SET report_count = report_count + 1 WHERE url = ?",
            [url],
            (error, results, fields) => {
              if (error) {
                console.error("Error incrementing count:", error);
                res.status(500).json({
                  message: "Error occurred",
                  status: "error",
                });
              } else {
                res.json({
                  message: "URL reported successfully",
                  status: "success",
                });
              }
            }
          );
        } else {
          // If URL doesn't exist, insert a new row
          pool.query(
            "INSERT INTO report_table (url, report_count) VALUES (?, 1)",
            [url],
            (error, results, fields) => {
              if (error) {
                console.error("Error inserting URL:", error);
                res.status(500).json({
                  message: "Error occurred",
                  status: "error",
                });
              } else {
                res.json({
                  message: "URL reported successfully",
                  status: "success",
                });
              }
            }
          );
        }
      }
    }
  );
};
