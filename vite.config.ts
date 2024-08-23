import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        react({ tsDecorators: true }),
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            name: 'ui-kit',
            fileName: (format) => `ui-kit.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'ui-kit-core'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'ui-kit-core': 'ui-kit-core',
                },
            },
        },
    },
})
