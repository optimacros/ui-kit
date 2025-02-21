import { defineConfig } from 'tsup';
import path from 'path';
import { fileURLToPath } from 'url';
// import { exec } from 'node:child_process';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    sourcemap: false,
    clean: true,
    treeshake: true,
    target: 'es5',
    dts: true,
    splitting: true,
    platform: 'browser',
    outDir: 'dist',
    bundle: true,
    loader: {
        '.css': 'copy',
    },
    minify: true,
    minifySyntax: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    metafile: false,
    inject: [path.resolve(__dirname, './react-import.js')],
    external: ['react', 'react-dom'],
});
