import * as slider from '@zag-js/slider';
import { createReactApiStateContext } from '@optimacros/ui-kit-store';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    api: null as slider.Api,
    id: 'slider',
    machine: slider,
    initialState: null,
});
