import { defineConfig } from 'tsup';
// import { exec } from 'node:child_process';

export default defineConfig({
    entry: ['src/index.ts'],
    sourcemap: false,
    clean: true,
    treeshake: true,
    target: 'es2020',
    dts: true,
    splitting: true,
    platform: 'browser',
    outDir: 'dist',
    bundle: true,
    loader: {
        '.css': 'local-css',
    },
    minify: true,
    minifySyntax: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    metafile: true,
    noExternal: [],
});
