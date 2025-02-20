import { exec } from 'child_process';

var version = process.argv[2];

if (!version) {
    console.error('invalid version, should use x.x.x');
    process.exit(1);
}

exec(`git checkout -b release/${version}`, (e, currentBranch) => {
    exec(`git push origin release/${version}`, (err) => {
        err && console.error(err.message);
        exec(`git tag ${version}`, (e, existingTag) => {
            exec(`git push origin ${version}`, (err) => {
                err && console.error(err.message);
            });
        });
    });
});
