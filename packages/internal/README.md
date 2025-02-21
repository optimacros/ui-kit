# @optimacros-ui/kit-internal

## Installation

```bash
npm install @optimacros-ui/kit-internal
```


## Configuration
```tsx

import { ProgressBar, Button, Icon, SliderScale } from '@optimacros-ui/kit-internal';
import { ICONS_MAP } from '@optimacros-ui/themes';
import { UiKit } from '@optimacros-ui/kit-store';

import root from '../node_modules/@optimacros-ui/themes/dist/default/tokens.css?raw';
import theme from '../node_modules/@optimacros-ui/themes/dist/default/component-tokens.css?raw';
import custom from '../node_modules/@optimacros-ui/themes/dist/color-schemes/optimacros.css?raw';
import iconsSrc from '../node_modules/@optimacros-ui/themes/dist/icons/optimacros/sprite/index.svg';

function App() {
    return (
        <UiKit.Provider
            state={{
                iconsSrc,
                styles: {
                    root,
                    theme,
                    custom,
                },
                featureFlags: {},
            }}
        >
            <div>
                <Button variant="primary">Button</Button>
                <ProgressBar value={20} />
                <Icon value={ICONS_MAP.action} variant="secondary" />
                <SliderScale max={100} min={0} />
            </div>
        </UiKit.Provider>
    );
}

export default App;

```