import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const coverageConfig = {
    istanbul: {
        include: ['*.stories.tsx'],
    },
};

const configDev: StorybookConfig = {
    stories: [
        '../packages/core/src/**/*.stories.@(js|jsx|ts|tsx)',
        '../packages/core/src/**/stories.@(js|jsx|ts|tsx)',
        '../packages/internal/src/**/*.stories.@(js|jsx|ts|tsx)',
        '../packages/legacy/src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-designs',
        'storybook-addon-performance',
        '@storybook/addon-storysource',
        'storybook-addon-pseudo-states',
        {
            name: '@storybook/addon-coverage',
            options: coverageConfig,
        },
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
    staticDirs: [{ from: './assets', to: 'public' }],
};

export default configDev;
