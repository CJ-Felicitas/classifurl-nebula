exports.TestResponseController = (req, res) => {
    console.log("Test response for GET route");

    res.json({
        message: 'Test response from Nebula (Express) Server',
        status: 'success',
        code: 200,
        package_version: '1.0.0',
    });

    ;
};