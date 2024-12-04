const exec = require('child_process').exec;

const mainBranchArg = '--main';

const updateLockFileCommand = [
    `rm package-lock.json`,
    `npm i`,
    `git commit -a -m "chore: update package-lock"`,
    `git push --force`,
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

    exec('git branch --show-current', async (e, currentBranch) => {
        const commands = createCommands(currentBranch.replace('\n', ''), mainBranch);

        if (continueCommand) {
            exec(updateLockFileCommand, (err, output, stderr) => {
                console.info(output);
                console.error(stderr);
            });
        } else {
            exec(commands, (err, output, stderr) => {
                console.info(output);
                console.error(stderr);
            });
        }
    });
}

rebase();
