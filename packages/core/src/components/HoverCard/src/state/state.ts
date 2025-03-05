import { createMachineContext, Zag } from '@optimacros-ui/store';
import * as machine from '@zag-js/hover-card';

export type Schema = Zag.ModuleSchema<typeof machine>;
export type Props = machine.Props;

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
} = createMachineContext<typeof machine, machine.Api>({
    id: 'hover-card',
    machine,
});
