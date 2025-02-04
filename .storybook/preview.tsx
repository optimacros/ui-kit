import previewProd from './config/prod/preview';
import previewDev from './config/dev/preview';
import { Preview } from '@storybook/react';

const isProd = process.env.NODE_ENV === 'production';

// TODO без вот этих вот манипуляций я получаю
// CSF Parsing error: Expected 'ObjectExpression' but found 'Identifier' instead in 'Identifier'
const temp = isProd ? previewProd : previewDev;

const preview: Preview = { ...temp };

export default preview;
