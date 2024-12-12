import { UiCoreContextWrapper } from '../packages/main/src';
import { Preview } from '@storybook/react';
import iconsSrc from '../packages/themes/src/assets/icons/optimacros/sprite/index.svg';
import { DocsContainer } from '@storybook/blocks';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        /** this section is here because of
         * https://github.com/storybookjs/storybook/issues/26505
         */
        docs: {
            container: DocsContainer,
            source: {
                type: 'dynamic',
                excludeDecorators: true,
            },
            controls: {
                sort: 'alpha',
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
