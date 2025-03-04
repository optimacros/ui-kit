import type {
    Service as BaseService,
    MachineSchema as BaseSchema,
    Machine as BaseMachine,
} from '@zag-js/core';
import type { PropTypes as BasePropTypes } from '@zag-js/types';
import type * as $ from '@optimacros-ui/types';
import { FC, ReactNode } from 'react';
import { Selector } from '../types';

export namespace Zag {
    export type PropTypes = BasePropTypes;
    export type Dict = Record<string, any>;

    export interface Schema extends BaseSchema {
        props?: {
            id?: string | undefined;
            ids?: Record<string, any> | undefined;
            getRootNode?: (() => ShadowRoot | Document | Node) | undefined;
            [key: string]: any;
        };
    }

    export interface Service<T extends Schema> extends BaseService<T> {}
    export interface Machine<T extends Dict> extends BaseMachine<T> {}

    export type Connect<Schema, Api = Record<string, any>> = (
        service: Service<Schema>,
        normalizeProps,
    ) => Api;

    /**
     * @param Schema - any zagjs-like schema
     * @param Api - any zagjs-like Api
     */
    export type ConnectApi<Schema, Api, ExtApi = Record<string, any>> = (
        api: $.Merge<Api, {}>,
        service: Service<Schema>,
    ) => ExtApi;

    export type Module<Machine, Schema = Record<string, any>, Api = Record<string, any>> = {
        machine: Machine;
        connect: Connect<Schema, Api>;
        splitProps?: any;
    };

    export type ExtractModuleSchema<TModule> = TModule extends Module<any, infer Schema, any>
        ? $.Merge<Schema, {}>
        : Record<string, any>;
    /**
     * @param TModule - zag js module imported as asterisk (*)
     * @param TSchema - custom schema
     */
    export type ExtendModuleSchema<
        TModule extends Module<any, any, any>,
        TSchema extends Schema,
        MSchema extends Schema = ExtractModuleSchema<TModule>,
    > = Omit<MSchema, 'props' | 'context' | 'refs' | 'computed' | 'action' | 'event'> & {
        props: $.Merge<MSchema['props'], TSchema['props']>;
        context: $.Merge<MSchema['context'], TSchema['context']>;
        refs: $.Merge<MSchema['refs'], TSchema['refs']>;
        computed: $.Merge<MSchema['computed'], TSchema['computed']>;
        action: $.If.Unknown<
            TSchema['action'],
            $.If.Unknown<MSchema['action'], Schema['action']>,
            $.If.Unknown<
                MSchema['action'],
                TSchema['action'],
                MSchema['action'] | TSchema['action']
            >
        >;
        event: $.If.Unknown<
            TSchema['event'],
            $.If.Unknown<MSchema['event'], Schema['event']>,
            MSchema['event'] | TSchema['event']
        >;
    };

    export type ModuleSchema<TModule extends Module<any, any, any>> = ExtendModuleSchema<
        TModule,
        {}
    >;

    export type ProviderContext<
        ISchema extends Schema,
        Api extends Record<string, any> = Record<string, any>,
    > = {
        api: Api;
        service: Service<ISchema>;
    };

    export type RootProps<ISchema extends Schema, Context> = Omit<
        Partial<ISchema['props']>,
        'id'
    > & {
        id?: string;
        children: ReactNode | ((context: Context) => ReactNode);
    };

    export interface MachineContext<
        ISchema extends Schema = Schema,
        Api extends Record<string, any> = Record<string, any>,
        Context = ProviderContext<Schema, Api>,
        Selectors extends Record<string, Selector<Api>> = NonNullable<unknown>,
    > {
        /**
         * Selectors Map
         */
        select: Selectors;
        /**
         * Redux-like slice
         */
        slice: Record<string, any>;
        /**
         * Allows to select Api's properties
         * @see {@link createUseSelectorHook}
         */
        useSelector: <R extends unknown>(s: (context: Context) => R) => R;
        /**
         * Allows to select Api's properties
         * @see {@link createProxySelectorHook}
         */
        useProxySelector: <R extends unknown>(s: (context: Context) => R, deps?: any[]) => R;
        /**
         * Allows to use current State feature flags
         *
         * @example
         * ```
         * // is actually accessing `id.feature_flag_id`
         * // menu.submenu feature_flag
         *  const isEnabled = useFeatureFlags('submenu');
         * ```
         */
        useFeatureFlags: (featureName: string) => boolean;
        /**
         * returns an api from {@link config.connect}
         */
        useApi: () => Api;
        /**
         * HOC for providing api from {@link config.connect}
         * @example
         * ```
         * <Menu.Api>
         * {
         *  (api) => <span>{api.open ? 'open' : 'closed'}</span>
         * }
         * </Menu.Api>
         */
        Api: FC<{
            children: (state: Api) => ReactNode;
        }>;
        /**
         * React Context provider
         * @accepts {@link IRootMachine} props
         */
        RootProvider: FC<RootProps<ISchema, Context>>;
        // /**
        //  * React Context provider for actor (especially for Toast component)
        //  * @accepts {@link IRootMachine} props
        //  */
        // RootActorProvider: RootActor,
        // TODO: make split props work with extended machine
        /**
         * function for splitting context and other props
         *
         * `!!! warning`: if you've added new props with {@link extendMachine} this won't work
         */
        splitProps;
        useState: () => Context;
        State: FC<{
            children: (context: Context) => ReactNode;
        }>;
    }
}
