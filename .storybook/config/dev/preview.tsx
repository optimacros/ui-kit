import { Args, Preview } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { waitForPageTrulyReadySB } from '../../utils-tmp';
import { withPerformance } from 'storybook-addon-performance';
import { setFigmaLink } from '../../utils';
//@ts-ignore
import { UiKitProviderDecorator } from '../Provider';
import { THEMES } from '@optimacros-ui/themes';

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
        test: { dangerouslyIgnoreUnhandledErrors: true },
    },
    decorators: [
        // Load theme
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
        UiKitProviderDecorator,
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
    initialGlobals: {
        test: window.navigator.userAgent.match(/HeadlessChrome/),
    },
};

export default previewDev;
