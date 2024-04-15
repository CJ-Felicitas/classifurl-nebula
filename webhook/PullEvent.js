const { exec } = require('child_process');

exports.PullEvent = async (req, res) => {
    const eventType = req.headers['x-github-event'];
    if (eventType === 'push') {
      pullChanges();
    }
    res.json({
        message: 'Pull event received',
        status: 'success'
    });
    
};
// Function to pull changes from GitHub repository
function pullChanges() {
    exec('cd /var/www/classifurl-nebula/ && sudo git pull', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error pulling changes: ${error}`);
        return;
      }
      console.log(`Changes pulled successfully: ${stdout}`);

    });
  }
