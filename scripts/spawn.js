const { spawn } = require('child_process');

module.exports.spawn = (command, args, options = {}) => {
    const { onClose, onError } = options;

    const commandStr = `${command} ${args.join(' ')}`;

    console.info(`running ${commandStr}`);

    const commandProcess = spawn(command, args, { stdio: ['pipe', 'pipe', 'pipe'], shell: true });

    commandProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.info(`${commandStr} : ${output}`);
    });

    // Handle error output
    commandProcess.stderr.on('data', (data) => {
        console.error(`${commandStr} Error: ${data}`);
    });

    // Handle manual input if needed
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (data) => {
        commandProcess.stdin.write(data);
    });

    // Return a promise that resolves when the process completes
    return new Promise((resolve, reject) => {
        commandProcess.on('close', (code) => {
            console.info(`${commandStr} completed with code ${code}`);

            onClose?.(code);

            if (code === 0) {
                resolve(code);
            } else {
                reject(new Error(`${commandStr} Process exited with code ${code}`));
            }
        });

        commandProcess.on('error', (err) => {
            console.error(`${commandStr} Failed to start process:`, err);

            onError?.(err);

            reject(err);
        });
    });
};
