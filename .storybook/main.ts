import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
const i = 0;
const config: StorybookConfig = {
    stories: [
        '../packages/core/src/**/*.stories.@(js|jsx|ts|tsx)',
        '../packages/internal/src/**/*.stories.@(js|jsx|ts|tsx)',
        '../packages/legacy/src/**/*.stories.@(js|jsx|ts|tsx)',
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
        disableWhatsNewNotifications: true,
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
    staticDirs: [{ from: '../packages/themes/src', to: 'assets/themes' }],
    features: {
        interactionsDebugger: true,
    },
};

export default config;
