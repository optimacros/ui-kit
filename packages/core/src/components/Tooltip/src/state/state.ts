import * as tooltip from '@zag-js/tooltip';

import { createMachineContext, Zag } from '@optimacros-ui/store';

import { machine } from './machine';

export type Schema = Zag.ModuleSchema<typeof tooltip>;

export const {
    useApi,
    Api,
    RootProvider: Root,
    splitProps,
    useProxySelector,
    useSelector,
    State,
    select,
    slice,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, tooltip.Api>({
    id: 'Tooltip',
    machine,
});
