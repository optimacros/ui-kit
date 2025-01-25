const { execSync } = require('child_process');

module.exports.exec = (command) => {
    execSync(command, { stdio: 'inherit' });
};
