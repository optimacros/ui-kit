import { getFilesInDirectory } from './getFiles.mjs';
import path from 'path';
import fs from 'fs';

export const getCoreComponentPackageNames = async () => {
    const packages = getFilesInDirectory(path.resolve('./packages/core/src/components'), (file) => {
        return file.includes('/package.json');
    });

    return packages.then((paths) =>
        paths.map((path) => JSON.parse(fs.readFileSync(path, 'utf8')).name),
    );
};
