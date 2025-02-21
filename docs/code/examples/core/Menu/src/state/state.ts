import { createReactApiStateContext } from '@optimacros-ui/store';
import { machine } from './machine';
import { connect } from './connect';
import { UiKit } from '@optimacros-ui/kit-store';

export const {
    Api,
    useApi,
    RootProvider,
    useSelector,
    useProxySelector,
    useFeatureFlags,
    splitProps,
} = createReactApiStateContext({
    id: 'menu',
    machine,
    connect,
    GlobalContext: UiKit,
});
