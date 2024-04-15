const axios = require('axios');

exports.SubmitUrlController = async (req, res) => {
  console.log("Submit URL route accessed");
  const url = req.body.url;
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", { url });
    console.log(response.data.received_data); 
    console.log(response.data.message);

    const received_data = response.data.received_data;

    // Sending a JSON response
    res.json({
      flask: response.data.message,
      message: "I am from express server",
      status: "success",
      data: received_data, 
    });
  } catch (error) {
    console.error("Error making request to Flask:", error);
    res.status(500).json({
      message: "Error occurred while making request to Flask",
      status: "error",
    });
  }
};
