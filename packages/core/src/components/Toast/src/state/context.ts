import { createMachineContext, Zag } from '@optimacros-ui/store';
import * as toast from '@zag-js/toast';

export type ToastSchema = Zag.ModuleSchema<typeof toast>;

export const ToastContext = createMachineContext<ToastSchema, toast.Api>({
    id: 'toast',
    machine: toast,
});

export type Schema = Zag.ModuleSchema<typeof toast.group>;

export const {
    Api,
    RootProvider,
    useApi,
    State,
    select,
    slice,
    splitProps,
    useFeatureFlags,
    useProxySelector,
    useSelector,
    useState,
} = createMachineContext<Schema, toast.GroupApi>({
    id: 'toast-group',
    machine: toast.group,
});

export const baseStore = toast.createStore({
    duration: 2000,
    max: 4,
});

export const createStore = toast.createStore;
