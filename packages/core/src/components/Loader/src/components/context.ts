import { createReactApiStateContext } from '@optimacros-ui/store';
import * as progress from '@zag-js/progress';
import { PropTypes } from '@zag-js/react';

export const { Api, useApi, RootProvider } = createReactApiStateContext({
    api: null as progress.Api<PropTypes>,
    id: 'progress',
    machine: progress,
    initialState: null,
    useExtendApi(state, api) {
        return { ...state, ...api };
    },
});
