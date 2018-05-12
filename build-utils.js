const childProcess = require('child_process');

exports.getMostRecentHash = () =>
  childProcess.execSync('git rev-parse HEAD').toString().trim();
