const { exec } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const mainBranchArg = '--main';

const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const updateLockFileCommand = [`npm i`, `git commit -a -m "chore: update package-lock"`].join(
    ' && ',
);

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
    const mrCommand = process.argv.find((v) => v.includes('mr'));

    exec('git branch --show-current', (e, currentBranch) => {
        const commands = createCommands(currentBranch.replace('\n', ''), mainBranch);

        if (continueCommand) {
            console.info('running update package-lock...');

            fs.rmSync('node_modules', { recursive: true, force: true });

            fs.unlink('package-lock.json', () => {
                exec(updateLockFileCommand, (err, output, stderr) => {
                    console.info(output);
                    console.error(stderr);
                    if (!mrCommand) {
                        line.question('push? y/n \n', (answer) => {
                            if (answer === 'y') {
                                exec('git push --force', () => {
                                    console.info('done');
                                    line.close();
                                });
                            } else {
                                line.close();
                            }
                        });
                    } else {
                        exec('npm run create:mr', () => {
                            console.info('done');
                            line.close();
                        });
                    }
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
