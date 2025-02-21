### Ui Kit Provider Usage with Themes package

ui-kit possible themes and icons
```ts
import { THEMES, ICONS_MAP } from '@optimacros-ui/themes';
```

```tsx
import { useEffect, useRef, useState } from 'react';

import iconsSrc from 'node_modules/@optimacros-ui/themes/icons/optimacros/sprite/index.svg';

import featureFlags from 'node_modules/@optimacros-ui/kit-store/feature_flags.json';

import { UiKit } from '@optimacros-ui/kit-store';

// Connect base themes
const styles = Promise.all([
    import('node_modules/@optimacros-ui/themes/default/tokens.css?raw'),
    import('node_modules/@optimacros-ui/themes/default/component-tokens.css?raw'),
]);

export const UiKitProviderDecorator = (theme) => {
    const [style, setStyle] = useState(null);


    useEffect(() => {
        theme &&
            import(`node_modules/@optimacros-ui/color-schemes/${theme}.css?raw`).then(
                (custom) =>
                    styles.then(([root, theme]) => {
                        setStyle({
                            root: root.default,
                            theme: theme.default,
                            custom: custom.default,
                        });
                    }),
            );
    }, []);

    return (
        <UiKit.Provider
            initialState={{
                iconsSrc,
                styles: style,
                featureFlags,
            }}
        >
            <Story />
        </UiKit.Provider>
    )
};
```