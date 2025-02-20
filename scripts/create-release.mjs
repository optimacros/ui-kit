import { exec } from 'child_process';

var version = process.argv[2];

if (!version) {
    console.error('invalid version, should use x.x.x');
    process.exit(1);
}

exec(`git tag ${version}`, (e, existingTag) => {
    exec(`git rev-parse "refs/tags/${version}"`, (e, existingTag) => {
        if (e) {
            console.error('tag doesnt exist');
            console.error(e.message);
            process.exit(1);
        }

        exec(`git push origin ${version}`, () => {
            exec(`git checkout -b release/${version} ${version}`, (e, currentBranch) => {
                exec(`git push origin release/${version}`, (err) => {
                    err && console.error(err.message);
                });
            });
        });
    });
});
