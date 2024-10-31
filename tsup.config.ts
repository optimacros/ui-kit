import { defineConfig } from 'tsup';
// import { exec } from 'node:child_process';

export default defineConfig({
    entry: ['src/index.ts'],
    splitting: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    metafile: true,
    target: 'es2020',
    dts: true,
    platform: 'browser',
    outDir: 'dist',
    //@ts-ignore
    // onSuccess() {
    //     const pkg = require('./package.json');
    //     console.log(pkg);
    //     return exec('cp -a package.json dist');
    // },
});
