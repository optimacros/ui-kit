import { UiCoreContextWrapper } from '../packages/main/src';
import '../packages/main/src/themes/appBaseTheme.css';
import './output.css';
import iconsSrc from '../packages/themes/src/assets/icons/optimacros/sprite/index.svg';

const preview = {
    // parameters: {
    //     actions: { argTypesRegex: '^on[A-Z].*' },
    //     controls: {
    //         matchers: {
    //             color: /(background|color)$/i,
    //             date: /Date$/,
    //         },
    //     },
    // },
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
