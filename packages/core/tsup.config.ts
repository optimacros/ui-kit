import { defineConfig } from 'tsup';
import conf from '../../tsup.config';

export default defineConfig(async () => {
    //TODO: copy generated coponent index.d.ts to core dist
    // const values: Array<string> = await getFilesInDirectory('./src/components', (file) => {
    //     return file.includes('/package.json');
    // });

    // const entry = values.reduce((acc, v) => {
    //     const componentName = `${v.split('/').at(2)}/index`;
    //     acc[componentName] = v.replace('/package.json', '/src/index.ts');
    //     return acc;
    // }, {});
    // console.log(entry);
    return {
        ...conf,
    };
});
