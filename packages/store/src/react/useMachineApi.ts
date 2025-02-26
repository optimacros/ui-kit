import { normalizeProps, useMachine } from '@zag-js/react';
import { useId } from 'react';
import { BaseSchema, Service } from '@zag-js/core';
import { ConnectZagApi, ZagModule } from './types';

export function createMachineApiHook<
    Schema extends BaseSchema,
    Api extends Record<string, any> = NonNullable<unknown>,
    Module extends ZagModule<any, any, any> = ZagModule<any, any, any>,
>(
    module: Module,
): (props: Partial<Schema['props']>) => {
    api: Api;
    service: Service<Schema>;
};

export function createMachineApiHook<
    Schema extends BaseSchema,
    Api extends Record<string, any>,
    ConnectApi extends ConnectZagApi<Schema, Api, any> = ConnectZagApi<Schema, Api, any>,
>(
    module: ZagModule<any, any, any>,
    connect: ConnectApi,
): (props: Partial<Schema['props']>) => {
    api: ReturnType<ConnectApi>;
    service: Service<Schema>;
};

export function createMachineApiHook<
    Schema extends BaseSchema,
    Api extends Record<string, any> = NonNullable<unknown>,
    ConnectApi extends ConnectZagApi<Schema, Api, any> = ConnectZagApi<Schema, Api, any>,
    Module extends ZagModule<any, any, any> = ZagModule<any, any, any>,
>(module: Module, connect?: ConnectApi) {
    const hook = (props: Partial<Schema['props']>) => {
        const id = useId();

        const service = useMachine<Schema>(module.machine, {
            id,
            ...props,
        });

        const api = module.connect(service, normalizeProps) as Api;

        return { api: connect ? connect(api, service) : api, service };
    };

    return hook;
}
