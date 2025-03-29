import { defineConfig } from 'tsup';
import path from 'path';
import conf from '../../tsup.config';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const output = path.resolve(__dirname, '../../../om_ws_fe/src/common/widgets/ui-kit');

export default defineConfig({
    ...conf,
    outDir: `${output}/kit`,
});
