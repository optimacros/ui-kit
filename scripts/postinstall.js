const { exec } = require('./exec');

exec('lerna bootstrap');

exec('npx playwright install chromium');
