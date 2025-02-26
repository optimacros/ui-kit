import { Service, BaseSchema } from '@zag-js/core';
import * as $ from '@optimacros-ui/types';
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

export type ZagSchema<Module> = Module extends ZagModule<any, infer Schema, any>
    ? Schema
    : Record<string, any>;

export type ExtendSchema<
    Module extends ZagModule<any, any, any>,
    TSchema extends BaseSchema,
    Schema extends BaseSchema = ZagSchema<Module>,
> = Omit<Schema, 'props' | 'context' | 'refs' | 'computed'> & {
    props: $.Merge<Schema['props'], TSchema['props']>;
    context: $.Merge<Schema['context'], TSchema['context']>;
    refs: $.Merge<Schema['refs'], TSchema['refs']>;
    computed: $.Merge<Schema['computed'], TSchema['computed']>;
};
