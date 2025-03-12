import { defineConfig } from 'tsup';
import conf from '../../tsup.config';

export default defineConfig({
    ...conf,
    publicDir: './src/assets',
    minify: false,
});
