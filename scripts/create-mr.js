var exec = require('child_process').exec;

var targetBranch = process.argv[2] || 'main';

exec('git branch --show-current', (e, currentBranch) => {
    exec(
        `git push origin HEAD --force -o merge_request.create -o merge_request.title="${currentBranch.replaceAll('\n', '')}" -o merge_request.target=${targetBranch}`,
        (error, stdout, stderr) => {
            stdout && console.log(`[stdout]\n${stdout}`);
            stderr && console.log(`[stderr]\n${stderr}`);
            if (error !== null) {
                console.info(`exec error: ${error}`);
            }
        },
    );
});
