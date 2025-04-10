import { defineConfig } from 'tsup';
import conf from '../../tsup.config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    ...conf,
    publicDir: path.resolve(__dirname, '../themes/src/assets'),
});
