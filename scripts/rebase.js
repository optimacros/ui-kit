const { exec } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const { spawn } = require('./spawn');

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

            console.info('removing node_modules');
            fs.rmSync('node_modules', { recursive: true, force: true });

            console.info('removing package-lock.json');
            fs.unlink('package-lock.json', () => {
                spawn('npm', ['i'], {
                    onClose: () => {
                        if (!mrCommand) {
                            line.question('push? y/n \n', (answer) => {
                                if (answer === 'y') {
                                    exec('git commit -a -m "chore: update package-lock"', () => {
                                        spawn('git', ['push', '--force'], {
                                            onClose: () => {
                                                line.close();
                                            },
                                        });
                                    });
                                } else {
                                    line.close();
                                }
                            });
                        } else {
                            exec('git commit -a -m "chore: created mr"', () => {
                                spawn('npm', ['run', 'create:mr'], {
                                    onClose: () => {
                                        line.close();
                                    },
                                });
                            });
                        }
                    },
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
