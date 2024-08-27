import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'


export default defineConfig({
    plugins: [
        react({ tsDecorators: true }),
        dts({
            include: ['./src/index.ts'],
            insertTypesEntry: true,
        }),
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'ui-kit-core'],
            input: {
                index: 'src/index.ts',
            },
            output: {
                entryFileNames: '[name].js',
                dir: 'dist',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'ui-kit-core': 'UiKitCore',
                },
            },
        },
    },
})
