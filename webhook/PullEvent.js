const { exec } = require('child_process');

exports.PullEvent = async (req, res) => {
    const eventType = req.headers['x-github-event'];
  
    // Handle push event
    if (eventType === 'push') {
      pullChanges();
    }

    // Sending a JSON response
    res.json({
        message: 'Pull event received',
        status: 'success'
    });
    
};

// Function to pull changes from GitHub repository
function pullChanges() {
    // Execute shell command to pull changes
    exec('cd /var/www/classifurl-nebula/ && sudo git pull', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error pulling changes: ${error}`);
        return;
      }
      console.log(`Changes pulled successfully: ${stdout}`);

    });
  }
