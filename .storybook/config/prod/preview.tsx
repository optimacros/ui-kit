import { Preview } from '@storybook/react';
import { UiKitProviderDecorator } from '../Provider';
import { THEMES } from '@optimacros-ui/themes';

const previewProd: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
            disableSaveFromUI: true,
        },
        actions: { disable: true },
    },
    decorators: [
        // Load theme
        UiKitProviderDecorator,
    ],
    globalTypes: {
        theme: {
            description: 'Global theme of storybook',
            toolbar: {
                title: 'Theme',
                icon: 'circle',
                items: THEMES.map(({ value, label }) => ({ value, title: label })),
                dynamicTitle: true,
            },
            defaultValue: 'optimacros',
        },
    },
    tags: ['autodocs'],
};

export default previewProd;
