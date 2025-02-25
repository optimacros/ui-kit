import { Service } from '@zag-js/core';

export type ZagConnect<Schema, Api = Record<string, any>> = (
    service: Service<Schema>,
    normalizeProps,
) => Api;

export type ConnectZagApi<Schema, Api, ExtApi = Record<string, any>> = (
    api: Api,
    service: Service<Schema>,
) => ExtApi;

export type ZagModule<Machine, Schema = Record<string, any>, Api = Record<string, any>> = {
    machine: Machine;
    connect: ZagConnect<Schema, Api>;
    splitProps?: any;
};
