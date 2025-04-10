//@ts-nocheck
import {
    ProgressBar,
    Button,
    Icon,
    SliderScale,
    FontIcon,
    UiKit,
    THEMES,
    ICONS_MAP,
    ICONS_SETS,
} from '@optimacros-ui/kit-internal';

import { useState } from 'react';

function App() {
    const [theme, setTheme] = useState(THEMES.ADVEXCEL);
    return (
        <UiKit.Provider
            iconsSet={ICONS_SETS.optimacros}
            featureFlags={{
                isDev: false,
                bundler: 'vite',
            }}
            theme={theme}
        >
            <div>
                <Button
                    variant="primary"
                    onClick={() => {
                        setTheme((t) =>
                            t === THEMES.ADVEXCEL ? THEMES.OPTIMACROS : THEMES.ADVEXCEL,
                        );
                    }}
                    icon={ICONS_MAP.add}
                >
                    Button
                </Button>
                <ProgressBar value={20} />
                <Icon value={ICONS_MAP.action} variant="secondary" />
                <FontIcon value={ICONS_MAP.add} />
                <SliderScale max={100} min={0} />
            </div>
        </UiKit.Provider>
    );
}

export default App;
