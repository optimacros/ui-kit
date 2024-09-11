import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig =  {
    stories: [
        '../node_modules/ui-kit-core/**/*.stories.@(js|jsx|ts|tsx)',
				'../src/**/*.stories.@(js|jsx|ts|tsx)',
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
        autodocs: true
    },
    staticDirs: [{ from: '../src/fonts', to: 'fonts' }],
		typescript: {
			reactDocgen: 'react-docgen-typescript'
		}
};

export default config
