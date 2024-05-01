const axios = require('axios');

exports.SubmitUrlController = async (req, res) => {

  console.log("submit url controller called");
  // Extracting the URL from the request body
  let url = req.body.url; 

  // strip the white spaces of the url
  // url = url.replace(/\s/g, ''); 
  console.log("URL without white spaces:", url);
  
  // if the url is empty then return back a result saying "URL is empty"
  if (url === "") {
    return res.json({
      message: "URL is empty",
      status: 400,
      flask: "URL is empty please provide a valid URL",
    });
  }

  try {
    // Flask running in port 5000   
    const response = await axios.post("http://127.0.0.1:5000/predict", { url });

    // response from the flask service
    const received_data = response.data.received_data;
    
    // Send back the response to the mobile app
    res.json({
      flask: response.data.message,
      message: "Nebula received a response from Flask",
      status: 200,
      data: received_data, 
    });

  } catch (error) {
    console.error("Error making request to Flask:", error);
    res.status(500).json({
      message: "Error occurred while making request to Flask",
      status: 500,
    });
 
  }
};
