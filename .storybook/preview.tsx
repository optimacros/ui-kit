import { UiCoreContextWrapper } from '../packages/main/src';
import '../packages/main/src/themes/appBaseTheme.css';

import iconsSrc from '../packages/themes/src/icons/optimacros/sprite/index.svg';

const preview = {
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
    tags: ['autodocs'],
};

export default preview;
