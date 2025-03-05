import { createMachineContext, Zag } from '@optimacros-ui/store';
import * as clipboard from '@zag-js/clipboard';

export type Schema = Zag.ModuleSchema<typeof clipboard>;

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
} = createMachineContext<Schema, clipboard.Api>({
    id: 'clipboard',
    machine: clipboard,
});
