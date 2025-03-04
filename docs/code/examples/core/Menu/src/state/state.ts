import { createMachineContext } from '@optimacros-ui/store';
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
} = createMachineContext({
    id: 'menu',
    machine,
    connect,
    GlobalContext: UiKit,
});
