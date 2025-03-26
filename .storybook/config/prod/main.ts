import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const configProd: StorybookConfig = {
    stories: [
        '../packages/core/src/**/*.stories.@(js|jsx|ts|tsx)',
        '../packages/internal/src/**/*.stories.@(js|jsx|ts|tsx)',
        '../packages/legacy/src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-storysource',
        'storybook-addon-pseudo-states',
    ],
    framework: '@storybook/react-vite',
    viteFinal: (cfg) => {
        return {
            ...cfg,

            plugins: [...cfg.plugins, tsconfigPaths()],
            css: {
                transformer: 'postcss',
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
};

export default configProd;
