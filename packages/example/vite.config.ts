import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssNested from 'postcss-nested';
// import babel from 'vite-plugin-babel'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    '@babel/plugin-transform-class-properties',
                ],
            },
        }),
    ],
    css: {
        postcss: {
            plugins: [postcssNested],
        },
    },
});
