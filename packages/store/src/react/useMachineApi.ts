import { normalizeProps, useMachine } from '@zag-js/react';
import { useId } from 'react';
import { MachineConfig } from '@zag-js/core';
import { ConnectZagApi, ZagModule } from './types';

export function createMachineApiHook<
    Schema extends Record<string, any>,
    Api extends Record<string, any>,
    Machine extends MachineConfig<Schema> = MachineConfig<Schema>,
    Module extends ZagModule<Machine, Schema, Api> = ZagModule<Machine, Schema, Api>,
    ExtApi extends Record<string, any> = NonNullable<unknown>,
    ConnectApi extends ConnectZagApi<Schema, Api, ExtApi> = ConnectZagApi<Schema, Api, ExtApi>,
>(module: Module, connect?: ConnectApi) {
    const hook = (context: Schema) => {
        const id = useId();

        const service = useMachine(module.machine, {
            id,
            ...context,
        } as any);

        const api = module.connect(service, normalizeProps);

        return { api: connect ? connect(api, service) : api, service };
    };

    return hook;
}
