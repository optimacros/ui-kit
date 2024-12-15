import { UiCoreContextWrapper } from '../packages/core/src';
import { Preview } from '@storybook/react';
import iconsSrc from '../packages/themes/src/assets/icons/optimacros/sprite/index.svg';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        (Story) => {
            return (
                <UiCoreContextWrapper state={{ iconsSrc }}>
                    <Story />
                </UiCoreContextWrapper>
            );
        },
    ],
    tags: ['autodocs'],
};

export default preview;
