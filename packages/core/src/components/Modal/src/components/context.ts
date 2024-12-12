import * as dialog from '@zag-js/dialog';
import { createReactApiStateContext } from '@optimacros-ui/store';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    api: null as dialog.Api,
    id: 'dialog',
    machine: dialog,
    initialState: null,
});
