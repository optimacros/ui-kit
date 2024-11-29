import conf from '../../tsup.config';

import { defineConfig } from 'tsup';

export default defineConfig({
    ...conf,
    dts: false,
    entry: ['code.ts'],
    clean: true,
});
