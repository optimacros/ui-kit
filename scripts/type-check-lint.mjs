import { checkFile } from './type-check.mjs';

process.argv.slice(2).forEach((file) => {
    checkFile(file);
});
