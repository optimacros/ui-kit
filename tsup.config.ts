import { defineConfig } from 'tsup';

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
});
