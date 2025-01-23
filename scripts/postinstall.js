const exec = require('child_process').exec;

exec('lerna bootstrap', (err, output, stderr) => {
    console.info(output);
    console.error(stderr);
});

exec('npx playwright install chromium', (err, output, stderr) => {
    console.info(output);
    console.error(stderr);
});
