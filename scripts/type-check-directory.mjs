import fs from 'fs';
import path from 'path';

import { compile, parseTsConfig } from './type-check.mjs';

const pathIndex = process.argv.slice(2).findIndex((v) => v === '--dir') + 1;
const dirPath = process.argv.slice(2).at(pathIndex);

const extensions = ['.ts', '.tsx'];

// filter
const tsConfig = parseTsConfig('tsconfig.json');

const result = compile(
    tsConfig.fileNames.filter(
        (file) => extensions.some((v) => v === path.extname(file)) && !file.includes('stories'),
    ),
    tsConfig.options,
);

if (result.length > 0) {
    fs.writeFileSync('ts.log', result.join('\n'), { encoding: 'utf-8' });

    console.info('found errors, logs in ts.log');

    process.exit(1);
}

console.info('no errors found, success');
process.exit(0);
