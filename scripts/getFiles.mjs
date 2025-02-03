import fs from 'fs/promises';
import path from 'path';

async function getAllFiles(directory) {
    if (directory.includes('node_modules')) {
        return [];
    }

    const files = await fs.readdir(directory, { resursive: true });

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

export async function getFilesInDirectory(directory, condition) {
    try {
        const files = await getAllFiles(directory);

        return files.filter(condition);
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}
