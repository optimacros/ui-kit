import { createReactApiStateContext } from '@optimacros/ui-kit-store';
import * as progress from '@zag-js/progress';
import { PropTypes } from '@zag-js/react';
export * from './components';

export const {
    Api,
    useApi,
    Root: BaseRoot,
    RootProvider,
} = createReactApiStateContext({
    api: null as progress.Api<PropTypes>,
    id: 'progress',
    machine: progress,
    initialState: null,
    rootAsTag: true,
});
