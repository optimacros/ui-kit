import { UiKit } from '../../../packages/core/src';
import { Args, Preview } from '@storybook/react';
import iconsSrc from '../../../packages/themes/src/assets/icons/optimacros/sprite/index.svg';
import { useEffect, useRef, useState } from 'react';
import { waitForPageTrulyReadySB } from '../../utils-tmp';
import { withPerformance } from 'storybook-addon-performance';
import { setFigmaLink } from '../../utils';

const styles = Promise.all([
    import('../../../packages/themes/src/default/tokens.css?raw'),
    import('../../../packages/themes/src/default/component-tokens.css?raw'),
]);

const previewDev: Preview = {
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
        // Reload story on toolbar/Test change
        (Story, context) => {
            const prevValue = useRef(null);

            useEffect(() => {
                let needReload = false;

                if (prevValue.current !== null && prevValue.current !== context.globals.test) {
                    needReload = true;
                }

                prevValue.current = context.globals.test;

                if (needReload) {
                    window.location.reload();
                }
            }, [context.globals.test]);

            return Story(context);
        },
        // Testing args
        (Story, context) => {
            const [refresh, setRefresh] = useState(false);

            // Force zag components to handle props update
            Object.assign(context.args, { controllable: true });

            const updateArgs = (args: Partial<Args>) => {
                Object.assign(context.args, args);
                setRefresh(!refresh);
            };

            globalThis.testing = { args: context.args, updateArgs };

            return <Story __refresh={refresh} />;
        },
        // Testing misc
        (Story, context) => {
            setFigmaLink(context);

            if (!globalThis.waitForPageTrulyReady) {
                globalThis.waitForPageTrulyReady = waitForPageTrulyReadySB;
            }

            if (context.playFunction && !context.tags.includes('hasPlayFunction')) {
                context.tags.push('hasPlayFunction');
            }

            return Story(context);
        },
        withPerformance,
        // Load theme
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
    globalTypes: {
        test: {
            description: 'Whether play functions enabled or not',
            toolbar: {
                title: 'Test',
                icon: 'play',
                items: [
                    { value: true, title: 'Yes play' },
                    { value: false, title: 'No play' },
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        test: window.navigator.userAgent.match(/HeadlessChrome/),
    },
};

export default previewDev;
