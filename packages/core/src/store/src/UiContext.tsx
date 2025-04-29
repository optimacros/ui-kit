import { createReactStore } from '@optimacros-ui/store';
import { type ReactNode, useEffect, useState as useRState } from 'react';
import {
    getColorSchemeImport,
    ICONS_SETS,
    THEMES,
    useDynamicSpriteImport,
} from '@optimacros-ui/themes';

function appendStylesToHead({ id, value }: { id: string; value: string }) {
    const head = document.head;
    let styleTag = head.querySelector(`[id=${id}]`);

    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = id;
        head.appendChild(styleTag);
    }
    styleTag.textContent = value;
}

function appendLinkToHead({ id, value }: { id: string; value: string }) {
    const head = document.head;
    let styleTag = head.querySelector(`[id=${id}]`);

    if (!styleTag) {
        styleTag = document.createElement('link');
        styleTag.id = id;
        head.appendChild(styleTag);
    }

    styleTag.setAttribute('href', value);
}

export enum HEAD_STYLE_ATTRS {
    THEME = 'data-theme',
    ICONS_SET = 'data-icon-set',
    BRAND = 'data-brand',
}

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
        iconsSrc: '',
        theme: '' as THEMES,
        iconsSet: '' as ICONS_SETS,
        brand: '' as string,
        /**
         * feature flags of ui-kit
         * @see "packages/core/src/store/config/feature_flags.md"
         */
        featureFlags: {} as Record<string, Record<string, boolean>>,
    },
    actions: { keys: ['iconsSrc', 'theme'] },
    // on first render
    createConfig(initialState, createdActions) {
        // call in useEffect to assign default styles (useLayoutEffect)

        return {
            reducers: {
                updateHeadAttributes(
                    state: typeof initialState,
                    {
                        theme,
                        iconsSet,
                        brand,
                    }: { theme?: THEMES; iconsSet?: ICONS_SETS; brand?: string },
                ) {
                    theme && document.documentElement.setAttribute(HEAD_STYLE_ATTRS.THEME, theme);
                    iconsSet &&
                        document.documentElement.setAttribute(HEAD_STYLE_ATTRS.ICONS_SET, iconsSet);

                    brand && document.documentElement.setAttribute(HEAD_STYLE_ATTRS.BRAND, brand);

                    return state;
                },
            },
        };
    },
});

type State = ReturnType<typeof useState>;

const ThemeImport = () => {
    const { iconsSet, theme, brand } = useState();
    const { setIconsSrc, updateHeadAttributes } = useActions();

    useEffect(() => {
        if (!iconsSet) return;

        // const importSrc = getSpriteImport(iconsSet);

        // importSrc().then((v) => setIconsSrc(v.default));

        updateHeadAttributes({ iconsSet });
    }, [iconsSet]);

    useEffect(() => {
        if (!theme) return;

        const importScheme = getColorSchemeImport(theme);

        importScheme();

        updateHeadAttributes({ theme });
    }, [theme]);

    useEffect(() => {
        updateHeadAttributes({ brand });
    }, [brand]);

    return <></>;
};

export const Provider = ({
    children,
    featureFlags,
    theme,
    iconsSet,
    brand,
}: Partial<State> & {
    children: ReactNode;
}) => {
    const [iconsSrc, setIconsSrc] = useRState('');
    const { Sprite } = useDynamicSpriteImport(iconsSet);
    return (
        <BaseProvider
            state={{
                featureFlags,
                theme,
                iconsSet,
                iconsSrc,
                brand,
            }}
            onChange={({ iconsSrc }) => {
                setIconsSrc(iconsSrc);
            }}
        >
            <div
                dangerouslySetInnerHTML={{ __html: Sprite }}
                style={{ display: 'none' }}
                id="ui-kit-sprite"
            />

            <ThemeImport />
            {children}
        </BaseProvider>
    );
};
