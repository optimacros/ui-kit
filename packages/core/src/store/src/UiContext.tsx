import { createReactStore } from '@optimacros-ui/store';
import { ComponentProps } from 'react';

export const {
    useActions,
    useProxySelector,
    Provider: BaseProvider,
    useState,
    reducerActions,
} = createReactStore({
    id: 'ui-kit',
    initialState: {
        /**
         * source for icon's sprite
         * must be sprite svg with .svg extension
         * */
        iconsSrc: '/packages/themes/src/assets/icons/optimacros/sprite/index.svg',
        styles: {
            root: '',
            theme: '',
            custom: '',
        } as {
            /**
             * tokens variables as css string
             * example at packages/themes/src/default/tokens.css
             * */
            root?: string;
            /**
             * component tokens variables as css string
             * example at packages/themes/src/default/component-tokens.css
             * */
            theme?: string;
            /**
             * any other custom css theme as string
             */
            custom?: string;
        },
        /**
         * feature flags of ui-kit
         * @see "packages/core/src/store/config/feature_flags.md"
         */
        featureFlags: {} as Record<string, Record<string, boolean>>,
    },
    actions: { keys: ['iconsSrc', 'styles'] },
    // on first render
    createConfig(initialState, createdActions) {
        // call in useEffect to assign default styles (useLayoutEffect)
        function appendStyles(
            state: typeof initialState,
            { id, value }: { id: string; value: string },
        ) {
            const head = document.head;
            let styleTag = head.querySelector(`[id=${id}]`);

            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = id;
                head.appendChild(styleTag);
            }

            styleTag.textContent = value;
        }

        return {
            reducers: {
                appendStyles,
                setRootStyles(
                    state: typeof initialState,
                    payload: (typeof initialState)['styles']['root'],
                ) {
                    appendStyles(state, { id: 'optimacros-ui-root-styles', value: payload });

                    //@ts-ignore
                    return createdActions.setInStyles(state, {
                        payload: { path: 'root', value: payload },
                    });
                },
                setThemeStyles(
                    state: typeof initialState,
                    payload: (typeof initialState)['styles']['theme'],
                ) {
                    appendStyles(state, { id: 'optimacros-ui-theme-styles', value: payload });

                    //@ts-ignore
                    return createdActions.setInStyles(state, {
                        payload: { path: 'theme', value: payload },
                    });
                },
                setCustomStyles(
                    state: typeof initialState,
                    payload: (typeof initialState)['styles']['custom'],
                ) {
                    appendStyles(state, { id: 'optimacros-ui-custom-styles', value: payload });

                    //@ts-ignore
                    return createdActions.setInStyles(state, {
                        payload: { path: 'custom', value: payload },
                    });
                },
            },
        };
    },
});

export const Provider = (props: ComponentProps<typeof BaseProvider>) => {
    return (
        <BaseProvider
            {...props}
            onStoreCreated={(state, actions) => {
                const { styles } = state;
                if (!styles) {
                    return;
                }

                styles.root && actions.setRootStyles(styles.root);
                styles.theme && actions.setThemeStyles(styles.theme);
                styles.custom && actions.setCustomStyles(styles.custom);
            }}
        />
    );
};
