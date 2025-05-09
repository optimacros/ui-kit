import { Args, Preview } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { waitForPageTrulyReadySB } from '../../utils-tmp';
import { withPerformance } from 'storybook-addon-performance';
import { setFigmaLink } from '../../utils';
//@ts-ignore
import { UiKitProviderDecorator } from '../Provider';
import { sleep } from '@optimacros-ui/utils';
import { configure } from '@storybook/test';
import { commonGlobalTypes } from '../global-types';

configure({
    getElementError: (message) => {
        const error = new Error(message);
        error.name = 'TestingLibraryElementError';
        error.stack = null;
        return error;
    },
});

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
        test: {
            dangerouslyIgnoreUnhandledErrors: true,
        },
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
            const [reset, setReset] = useState(false);

            const updateArgs = async (args: Partial<Args>) => {
                Object.assign(context.args, args);
                setRefresh(!refresh);
                await sleep(1);
            };

            const resetStory = async () => {
                setReset(true);
                await sleep(1);
                setReset(false);

                await window.waitForPageTrulyReady?.();
            };

            globalThis.testing = { args: context.args, updateArgs, resetStory };

            if (reset) {
                return null;
            }

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
        UiKitProviderDecorator(true),
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
        ...commonGlobalTypes,
    },
    initialGlobals: {
        test: window.navigator.userAgent.match(/HeadlessChrome/),
    },
};

export default previewDev;
