import { Preview } from '@storybook/react';
import { UiCoreContextWrapper } from '../packages/core/src';
import iconsSrc from '../packages/icons/src/default/sprite/index.svg';

import '../packages/main/src/themes/appBaseTheme.css';

export const parameters: Preview = {
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
        (Story, { parameters }) => {
            return (
                <UiCoreContextWrapper state={{ iconsSrc }}>
                    <Story />
                </UiCoreContextWrapper>
            );
        },
    ],
};
