
exports.PullEvent = async (req, res) => {
    const eventType = req.headers['x-github-event'];
  
    // Handle push event
    if (eventType === 'push') {
      shutdownPM2();
      pullChanges();
      startPM2();
    }
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

  function shutdownPM2() {
    exec('pm2 stop 0', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error pm2 shutdown: ${error}`);
          return;
        }
        console.log(`pm2 stop 0 - done: ${stdout}`);
      });
  }

  function startPM2() {
    exec('pm2 start 0', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error starting pm2 : ${error}`);
          return;
        }
        console.log(`pm2 start 0 - done: ${stdout}`);
      });
  }


