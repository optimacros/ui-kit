import * as collapsible from '@zag-js/collapsible';
import { createReactApiStateContext } from '@optimacros/ui-kit-store';

export const { Api, useApi, RootProvider } = createReactApiStateContext({
    id: 'collapsible',
    initialState: null,
    api: null as collapsible.Api,
    machine: collapsible,
    defaultContext: {
        'open.controlled': true,
    },
    useExtendApi: (state, api) => ({ ...api, ...state }),
});
