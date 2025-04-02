import 'react';

interface Mapping {
    [key: string]: string;
}

declare module '*.module.css' {
    const mapping: Mapping;
    export default mapping;
}

declare module globalThis {
    interface Window {
        /** Take screenshoot while executing `test-storybook` and compare with existing
         *
         *  If no `id` is provided, `context.id` is used (unique for each story)
         */
        takeScreenshot?: (id?: string) => Promise<void>;
        /** Performs all possible (feel free to add new) checks to determine if the page is ready
         */
        waitForPageTrulyReady?: () => Promise<void>;
        testing: {
            /** Story props */
            args: Record<any, any>;
            updateArgs: (newArgs: Record<any, any>) => Promise<void>;
            resetStory: () => Promise<void>;
        };
    }
}

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }
}
