import { createMachineContext, Zag } from '@optimacros-ui/store';
import * as machine from '@zag-js/rating-group';

export type Schema = Zag.ModuleSchema<typeof machine>;

export const {
    useApi,
    Api,
    RootProvider,
    splitProps,
    useProxySelector,
    useSelector,
    State,
    select,
    slice,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, machine.Api>({
    id: 'rating-group',
    machine,
});
