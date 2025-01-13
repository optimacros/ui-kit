import { UiKit } from '../packages/core/src';
import { Preview } from '@storybook/react';
import iconsSrc from '../packages/themes/src/assets/icons/optimacros/sprite/index.svg';
import { useEffect, useState } from 'react';

const styles = Promise.all([
    import('../packages/themes/src/default/tokens.css?raw'),
    import('../packages/themes/src/default/component-tokens.css?raw'),
]);

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
            disableSaveFromUI: true,
        },
    },
    decorators: [
        (Story) => {
            const [style, setStyle] = useState(null);

            useEffect(() => {
                styles.then(([root, theme]) => {
                    setStyle({ root: root.default, theme: theme.default });
                });
            }, []);

            return style ? (
                <UiKit.Provider
                    initialState={{
                        iconsSrc,
                        styles: style,
                    }}
                >
                    <Story />
                </UiKit.Provider>
            ) : (
                <Story />
            );
        },
    ],
    tags: ['autodocs'],
};

export default preview;
