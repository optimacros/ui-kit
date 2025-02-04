//@ts-ignore
import configProd from './config/prod/main.ts';
//@ts-ignore
import configDev from './config/dev/main.ts';
import type { StorybookConfig } from '@storybook/react-vite';

const isProd = process.env.NODE_ENV === 'production';

const config: StorybookConfig = isProd ? configProd : configDev;

export default config;
