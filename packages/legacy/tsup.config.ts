import { defineConfig } from 'tsup';
import conf from '../../tsup.config';

export default defineConfig({
    ...conf,
    minifySyntax: true,
    minify: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    dts: false,
});
