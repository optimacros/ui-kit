import { checkFile, ignoreFiles, ignoreDirectories } from './type-check.mjs';
import path from 'path';

let filesToCheck = process.argv.slice(2) || [];

filesToCheck = filesToCheck.filter((file) => {
    const details = path.parse(file);

    const directories = details.dir.split('/');

    if (ignoreDirectories.find((pattern) => directories.includes(pattern))) {
        return false;
    }

    if (ignoreFiles.find((pattern) => details.name.includes(pattern))) {
        return false;
    }

    return true;
});

filesToCheck.forEach((file) => {
    checkFile(file);
});
