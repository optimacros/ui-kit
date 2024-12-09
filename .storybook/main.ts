import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
    stories: [
        '../packages/core/src/**/*.stories.@(js|jsx|ts|tsx)',
        '../packages/main/src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-designs',
    ],
    framework: '@storybook/react-vite',
    viteFinal: (cfg) => {
        return {
            ...cfg,

            //@ts-ignore
            plugins: [...cfg.plugins, tsconfigPaths()],
            css: {
                transformer: 'lightningcss',
            },
        };
    },
    core: {
        builder: '@storybook/builder-vite',
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
    staticDirs: [
        '../.storybook/assets',
        '../packages/themes/src/assets/icons/optimacros/font-icons',
    ],
};

export default config;
