import { isFunction } from '@optimacros-ui/utils';
import { FC, memo, ReactNode } from 'react';
import { createMachineApiHook } from './useMachineApi';
import { createUseFeatureFlagsHooks } from './useFeatureFlags';
/* biome-ignore lint:wait */
import type { UiKit } from '@optimacros-ui/kit-store';
import { ConnectZagApi, Selector, ZagModule } from './types';
import { BaseSchema } from '@zag-js/core';
import { createHooks } from './hooks';
import { createHelpers } from './helpers';

/**
 * method for creating optimacros-ui store with additional functionality
 * @param config - default configuration
 */
export function createMachineContext<
    Schema extends BaseSchema = BaseSchema,
    Api extends Record<string, any> = Record<string, any>,
    Connect extends ConnectZagApi<Schema, Api> = any,
    Props = Partial<Schema['props']>,
    ID extends string = string,
    Selectors extends Record<string, Selector<Api>> = NonNullable<unknown>,
>(config: {
    /** Store id */
    id: ID;
    /**
     * zag-js like module
     * @example 'import * as menu from '@zag-js/menu'
     * */
    machine: ZagModule<any, any, any>;
    /**
     *
     * @param initialState - zagjs api
     * @returns custom selectors
     */
    createConfig?: (initialState: Api) => {
        selectors?: Selectors;
    };
    /**
     * @see {@link ConnectMachine}
     * @returns MachineApi
     */
    connect?: Connect;
    /**
     * Ui Kit global context
     * `used for selecting feature flags from global context`
     * @see {@link UiKit}
     */
    GlobalContext?: {
        useProxySelector: any;
    };
}) {
    const { createConfig, id, machine, connect = (api) => api, GlobalContext } = config;

    const createdConfig = createConfig?.({} as Api) ?? {};

    const slice = {
        ...config,
        selectors: createdConfig?.selectors,
    };

    const useMachine = createMachineApiHook<Schema, Api>(machine, connect);

    const useFeatureFlags = GlobalContext
        ? createUseFeatureFlagsHooks(GlobalContext.useProxySelector, id)
        : () => true;

    const {
        StateContext: ApiContext,
        useState,
        useProxySelector,
        useSelector,
    } = createHooks(`${id}Api`, {} as ReturnType<typeof useMachine>, true);

    function useApi() {
        const api = useProxySelector((s) => s.api as Api);

        return api;
    }

    const { State: Api } = createHelpers<Api, { useState: typeof useApi }>(`${id}Api`, {
        useState: useApi,
    });

    const StoreProvider: FC<{
        children: ReactNode;
        api?: Api;
    }> = memo(({ children, api }) => {
        //@ts-ignore
        return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
    });

    StoreProvider.displayName = id;

    type IRootMachine = Omit<Props, 'id'> & {
        /** machine id (if its specific) */
        id?: string;
        children: ReactNode | ((api: Api) => ReactNode);
    };

    function RootMachine({ children, ...context }: IRootMachine) {
        const machineApi = useMachine(context as unknown as Props);

        return (
            //@ts-ignore
            <StoreProvider api={machineApi}>
                {isFunction(children)
                    ? //@ts-ignore
                      children(machineApi.api)
                    : children}
            </StoreProvider>
        );
    }

    return {
        /**
         * Selectors Map
         */
        select: slice.selectors,
        /**
         * Redux-like slice
         */
        slice,
        /**
         * Allows to select Api's properties
         * @see {@link createUseSelectorHook}
         */
        useSelector,
        /**
         * Allows to select Api's properties
         * @see {@link createProxySelectorHook}
         */
        useProxySelector,
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
        useFeatureFlags,
        /**
         * returns an api from {@link config.connect}
         */
        useApi,
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
        Api,
        /**
         * React Context provider
         * @accepts {@link IRootMachine} props
         */
        RootProvider: RootMachine,
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
        splitProps: machine.splitProps,
        useState,
    };
}
