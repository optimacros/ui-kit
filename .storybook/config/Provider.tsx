import iconsSrc from '../../packages/themes/src/assets/icons/optimacros/sprite/index.svg';
import { useEffect, useRef, useState } from 'react';
import featureFlags from '../../packages/core/src/store/config/feature_flags.json';
import { UiKit } from '@optimacros-ui/kit-store';

const styles = Promise.all([
    import('../../packages/themes/src/assets/default/tokens.css?raw'),
    import('../../packages/themes/src/assets/default/component-tokens.css?raw'),
]);

export const UiKitProviderDecorator = (Story, context) => {
    const [style, setStyle] = useState(null);

    const prevValue = useRef(null);

    useEffect(() => {
        context.globals.theme &&
            import(
                `../../packages/themes/src/assets/color-schemes/${context.globals.theme}.css?raw`
            ).then((custom) =>
                styles.then(([root, theme]) => {
                    setStyle({
                        root: root.default,
                        theme: theme.default,
                        custom: custom.default,
                    });
                }),
            );
    }, []);

    useEffect(() => {
        let needReload = false;

        if (prevValue.current !== null && prevValue.current !== context.globals.theme) {
            needReload = true;
        }

        prevValue.current = context.globals.theme;

        if (needReload) {
            window.location.reload();
        }
    }, [context.globals.theme]);

    return style ? (
        <UiKit.Provider
            initialState={{
                iconsSrc,
                styles: style,
                featureFlags,
            }}
        >
            <Story />
        </UiKit.Provider>
    ) : (
        <Story />
    );
};
