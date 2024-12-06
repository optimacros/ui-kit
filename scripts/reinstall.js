const exec = require('child_process').exec;
const fs = require('fs');

function reinstall() {
    fs.unlink('package-lock.json', () => {
        exec('npm i', (err, output, stderr) => {
            console.info(output);
            console.error(stderr);
        });
    });
}

reinstall();
