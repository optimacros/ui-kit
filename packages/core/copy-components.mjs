import { getFilesInDirectory } from '../../scripts/getFiles.mjs';
import fs from 'fs/promises';

const copyComponents = async () => {
    const values = await getFilesInDirectory('./src/components', (file) => {
        return file.includes('/dist/index.d.ts');
    });

    const entry = values.map((v) => {
        const path = `dist/${v.split('/').at(2)}.d.ts`;

        return fs.copyFile(v, path);
    });

    const indexTypes = fs.writeFile(
        'dist/index.d.ts',
        values.map((v) => `export * from './${v.split('/').at(2)}'`).join(';\n'),
    );

    return Promise.all([indexTypes, ...entry]);
};

copyComponents();
