import react from '@vitejs/plugin-react-swc';
import crypto from 'crypto';
import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tsconfigPaths from 'vite-tsconfig-paths';

const isWsFe = Boolean(
    process.argv
        .find((s) => s.includes('IS_WS_FE'))
        ?.split('=')
        ?.at(1),
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const output = path.resolve(
    __dirname,
    isWsFe ? '../../../om_ws_fe/node_modules/@optimacros-ui/kit-internal/dist' : 'dist',
);

// console.log(Boolean(process.argv.find((s) => s.includes('IS_WS_FE')).split('=').at(1)))
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // dynamicImport(),
        libInjectCss(),
        react({ tsDecorators: true }),
        // createSvgSpritePlugin({
        //     exportType: 'react', // or 'react' or 'vue'
        //  include: '**/*.svg'
        //   }),
        svgr(),
        tsconfigPaths(),
        dts({ exclude: ['**/*.stories.tsx'] }),
    ],
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: (name, filename, css) => {
                const componentName = filename.split('/').pop();

                const hash = crypto
                    .createHash('md5')
                    .update(css)
                    .digest('base64')
                    .replace(/[^\d\w]+/, '')
                    .substring(0, 5);

                return `${componentName?.replace('.module.css', '-module')}__${name}___${hash}`;
            },
        },
    },
    build: {
        copyPublicDir: false,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'lodash',
                'lodash-es',
                // '@zag-js/aria-hidden',
                // '@zag-js/avatar',
                // '@zag-js/checkbox',
                // '@zag-js/clipboard',
                // '@zag-js/collapsible',
                // '@zag-js/collection',
                // '@zag-js/color-picker',
                // '@zag-js/color-utils',
                // '@zag-js/core',
                // '@zag-js/date-picker',
                // '@zag-js/date-utils',
                // '@zag-js/dialog',
                // '@zag-js/dismissable',
                // '@zag-js/dom-query',
                // '@zag-js/editable',
                // '@zag-js/file-upload',
                // '@zag-js/file-utils',
                // '@zag-js/focus-trap',
                // '@zag-js/focus-visible',
                // '@zag-js/hover-card',
                // '@zag-js/i18n-utils',
                // '@zag-js/interact-outside',
                // '@zag-js/live-region',
                // '@zag-js/menu',
                // '@zag-js/number-input',
                // '@zag-js/pin-input',
                // '@zag-js/popover',
                // '@zag-js/popper',
                // '@zag-js/progress',
                // '@zag-js/radio-group',
                // '@zag-js/rating-group',
                // '@zag-js/react',
                // '@zag-js/rect-utils',
                // '@zag-js/remove-scroll',
                // '@zag-js/select',
                // '@zag-js/slider',
                // '@zag-js/store',
                // '@zag-js/switch',
                // '@zag-js/tabs',
                // '@zag-js/toast',
                // '@zag-js/tooltip',
                // '@zag-js/tree-view',
                // '@zag-js/types',
                // '@zag-js/utils',
                'marked',
                'immutable',
                'immutable-js',
                'radash',
                'mobx',
                'mobx-react',
                'mobx-react-lite',
                'rc-dropdown',
                'rc-menu',
            ],
            input: {
                ...Object.fromEntries(
                    glob
                        .sync('./src/**/*.{ts,tsx}')
                        .filter((v) => !v.includes('stories'))
                        .map((file) => [
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
                // ...(Object.fromEntries(
                //     glob.sync(
                //         './src/fonts/*.css',
                //     ).map(file => [
                //         path.relative(
                //             'src',
                //             file.slice(0, file.length - path.extname(file).length),
                //         ),
                //         fileURLToPath(new URL(file, import.meta.url)),
                //     ],
                //     ),
                // )),
            },

            output: {
                chunkFileNames: 'helpers/[name].js',
                assetFileNames: (assetInfo) => {
                    return 'assets/[name][extname]';
                },
                entryFileNames: '[name].js',
                dir: output,
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
