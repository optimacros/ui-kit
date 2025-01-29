import { defineConfig } from 'tsup';
import conf from '../../tsup.config';

// global config
export default defineConfig({
    ...conf,
    minifySyntax: true,
    minify: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
});
