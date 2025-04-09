import { createMachineContext, Zag } from '@optimacros-ui/store';
import * as machine from '@zag-js/checkbox';

export type Schema = Zag.ModuleSchema<typeof machine>;

const connect = ((api) => {
    return {
        ...api,
        getRootProps() {
            return {
                ...api.getRootProps(),
                disabled: api.disabled,
            };
        },
    };
}) satisfies Zag.ConnectApi<Schema, machine.Api>;

export const {
    RootProvider,
    useApi,
    splitProps,
    Api,
    select,
    slice,
    useFeatureFlags,
    useProxySelector,
    useSelector,
    useState,
} = createMachineContext<Schema, machine.Api>({
    id: 'checkbox',
    machine,
    connect,
});
