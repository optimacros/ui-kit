import react from '@vitejs/plugin-react-swc'
import { glob } from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import postcssCustomProperties from 'postcss-custom-properties'
// @ts-ignore
import postcssImport from 'postcss-import'
import postcssNesting from 'postcss-nested'
import postcssPresetEnv from 'postcss-preset-env'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
// @ts-ignore
import eslint from 'vite-plugin-eslint'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
    plugins: [
        libInjectCss(),
        react({ tsDecorators: true }),
        eslint({
            cache: false,
            include: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'] }),
        dts(),
    ],
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: (name, filename) => {
                const componentName = filename
                    .split('/')
                    .pop()

                return `${componentName?.replace('.module.css', '')}__${name}`
            },
        },
        postcss: {
            plugins: [
                postcssImport({ path: ['src'] }),
                postcssNesting,
                postcssPresetEnv({
                    stage: 3,
                    features: {
                        'nesting-rules': true,
                        'custom-media-queries': true,
                    },
                }),
                postcssCustomProperties({
                    preserve: false,
                }),
            ],
        },
    },
    build: {
        copyPublicDir: false,
        target: ['esnext'],
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['cjs'],
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            input: Object.fromEntries(
                glob.sync(
                    './src/**/*.{ts,tsx}',
                ).map(file => [
                    // The name of the entry point
                    // src/components/nested/foo.ts becomes nested/foo
                    path.relative(
                        'src',
                        file.slice(0, file.length - path.extname(file).length),
                    ),
                    // The absolute path to the entry file
                    // src/components/nested/foo.ts becomes /project/src/components/nested/foo.ts
                    fileURLToPath(new URL(file, import.meta.url)),
                ]),
            ),
            output: {
                chunkFileNames: 'chunks/[name].js',
                assetFileNames: 'assets/index[extname]',
                entryFileNames: '[name].js',
                dir: 'dist',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },

})
