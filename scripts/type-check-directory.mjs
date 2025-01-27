import fs from 'fs/promises';
import path from 'path';
import { checkFile } from './type-check.mjs';

const pathIndex = process.argv.slice(2).findIndex((v) => v === '--path') + 1;
const [dirPath, extensionsPath] = process.argv.slice(2).at(pathIndex).split('**/*.');

const extensions = extensionsPath
    .split(',')
    .map((v) => v.replace('{', '').replace('}', '').replaceAll(' ', ''));

async function getAllFiles(directory) {
    if (directory.includes('node_modules') || directory.includes('stories')) {
        return [];
    }

    const files = await fs.readdir(directory);
    const allFiles = await Promise.all(
        files.map(async (file) => {
            const filePath = path.join(directory, file);
            const stats = await fs.stat(filePath);

            if (stats.isDirectory()) {
                return getAllFiles(filePath);
            } else {
                return filePath;
            }
        }),
    );

    return allFiles.flat();
}

async function getFiles(directory) {
    try {
        const files = await getAllFiles(directory);

        return files.filter(
            (file) =>
                extensions.some((v) => `.${v}` === path.extname(file)) && !file.includes('stories'),
        );
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

// Usage
getFiles(path.resolve(dirPath)).then((files) => files.forEach(checkFile));
