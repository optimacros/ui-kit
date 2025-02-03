import readline from 'readline';
import { getCoreComponentPackageNames } from './getPackageNames.mjs';
import { exec, spawn } from 'child_process';

const versionOptions = [
    'major',
    'minor',
    'patch',
    'premajor',
    'preminor',
    'prepatch',
    'prerelease',
];

const isValidVersion = (version) => {
    const includesVersion = versionOptions.includes(version);

    if (!includesVersion && version.split('.').length !== 3) {
        return false;
    }

    return true;
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const argv = process.argv;

const version = argv.at(argv.findIndex((v) => v.includes('to')) + 1);

const runLernaVersion = async (version) => {
    // TODO: update specific packages
    const packageNames = await getCoreComponentPackageNames();
    const args = ['version', version];

    args.push('--no-push', '--no-git-tag-version');

    const lernaProcess = spawn(`lerna`, args, { stdio: ['pipe', 'pipe', 'pipe'], shell: true });

    lernaProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.info(output);
    });

    // Handle error output
    lernaProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    // Handle manual input if needed
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (data) => {
        lernaProcess.stdin.write(data);
    });

    // Return a promise that resolves when the process completes
    return new Promise((resolve, reject) => {
        lernaProcess.on('close', (code) => {
            console.info(`Lerna version completed with code ${code}`);
            rl.close();
            if (code === 0) {
                resolve(code);
            } else {
                reject(new Error(`Process exited with code ${code}`));
            }
        });

        lernaProcess.on('error', (err) => {
            console.error('Failed to start process:', err);
            rl.close();
            reject(err);
        });
    });
};

if (isValidVersion(version)) {
    await runLernaVersion(version);
} else {
    console.error(
        `version is invalid\n\npossible options: ${versionOptions.join(', ')} or your own version number x.x.x`,
    );
    process.exit(1);
}
