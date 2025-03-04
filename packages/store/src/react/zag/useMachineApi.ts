import { normalizeProps, useMachine } from '@zag-js/react';
import { useId } from 'react';
import { Zag } from './types';

export function createMachineApiHook<
    Schema extends Zag.Schema,
    Api extends Record<string, any> = NonNullable<unknown>,
    Module extends Zag.Module<any, any, any> = Zag.Module<any, any, any>,
>(module: Module): (props: Partial<Schema['props']>) => Zag.ProviderContext<Schema, Api>;

export function createMachineApiHook<Schema extends Zag.Schema, Api extends Record<string, any>>(
    module: Zag.Module<any, any, any>,
    connect: Zag.ConnectApi<Schema, Api, any>,
): (props: Partial<Schema['props']>) => Zag.ProviderContext<Schema, Api>;

export function createMachineApiHook<
    Schema extends Zag.Schema,
    Api extends Record<string, any> = NonNullable<unknown>,
    Module extends Zag.Module<any, any, any> = Zag.Module<any, any, any>,
>(module: Module, connect?: Zag.ConnectApi<Schema, Api, any>) {
    const hook = (props: Partial<Schema['props']>) => {
        const id = useId();

        const service = useMachine<Schema>(module.machine, {
            id,
            ...props,
        });

        const api = module.connect(service, normalizeProps) as Api;

        return { api: connect ? (connect(api, service) as Api) : api, service };
    };

    return hook;
}
