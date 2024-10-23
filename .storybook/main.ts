import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: [
        '../packages/core/src/**/*.stories.@(js|jsx|ts|tsx)',
        '../packages/main/src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react-vite',
    core: {
        builder: '@storybook/builder-vite',
    },
    docs: {
        autodocs: true,
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
};

export default config;
