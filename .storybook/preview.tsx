import { UiCoreContextWrapper } from '../packages/main/src';
import { Preview } from '@storybook/react';
import '../packages/main/src/themes/appBaseTheme.css';
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
                    <div style={{ padding: '1rem' }}>
                        <Story />
                    </div>
                </UiCoreContextWrapper>
            );
        },
    ],
    tags: ['autodocs'],
};

export default preview;
