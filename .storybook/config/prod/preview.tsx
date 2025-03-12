import { Preview } from '@storybook/react';
import { UiKitProviderDecorator } from '../Provider';
import { commonGlobalTypes } from '../global-types';

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
        UiKitProviderDecorator(false),
    ],
    globalTypes: commonGlobalTypes,
    tags: ['autodocs'],
};

export default previewProd;
