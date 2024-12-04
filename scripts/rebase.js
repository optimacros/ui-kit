const exec = require('child_process').exec;
const fs = require('fs');
const mainBranchArg = '--main';

const updateLockFileCommand = [
    `npm i`,
    `git commit -a -m "chore: update package-lock" | git push --force`,
].join(' && ');

const createCommands = (currentBranch, mainBranch) => {
    return [
        `git checkout ${mainBranch}`,
        `git pull`,
        `git checkout ${currentBranch}`,
        `git rebase ${mainBranch}`,
    ].join(' && ');
};

function rebase() {
    const mainBranch = process.argv
        .find((v) => v.includes(mainBranchArg))
        .replace(`${mainBranchArg}=`, '');

    const continueCommand = process.argv.find((v) => v.includes('continue'));

    exec('git branch --show-current', (e, currentBranch) => {
        const commands = createCommands(currentBranch.replace('\n', ''), mainBranch);

        if (continueCommand) {
            console.info('running update package-lock...');

            fs.unlink('package-lock.json', () => {
                exec(updateLockFileCommand, (err, output, stderr) => {
                    console.info(output);
                    console.error(stderr);
                });
            });
        } else {
            console.info('running git commands...');

            exec(commands, (err, output, stderr) => {
                console.info(output);
                console.error(stderr);
            });
        }
    });
}

rebase();
