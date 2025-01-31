import { defineConfig } from 'tsup';
import conf from '../../tsup.config';

export default defineConfig({
    ...conf,
    splitting: false,
    sourcemap: true,
    //TODO : make multiple separate dts
    // dts: {
    //     compilerOptions: {
    //         composite: true,
    //         outDir: 'dist',
    //         include: ['src/**/*'],
    //         exclude: ['node_modules'],
    //     },
    // },
});
