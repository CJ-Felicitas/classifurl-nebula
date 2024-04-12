exports.TestResponseController = (req, res) => {
    console.log("Test response for GET route");
    // Sending a JSON response
    res.json({
        message: 'Test response from Nebula (Express) Server',
        status: 'success'
    });
};