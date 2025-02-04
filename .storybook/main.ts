import configProd from './config/prod/main';
import configDev from './config/dev/main';
import type { StorybookConfig } from '@storybook/react-vite';

const isProd = process.env.NODE_ENV === 'production';

const config: StorybookConfig = isProd ? configProd : configDev;

export default config;
