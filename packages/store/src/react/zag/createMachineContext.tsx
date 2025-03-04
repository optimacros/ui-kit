import { isFunction } from '@optimacros-ui/utils';
import { FC, memo, ReactNode } from 'react';
import { createMachineApiHook } from './useMachineApi';
import { createUseFeatureFlagsHooks, createHooks, createHelpers } from '../utils';
/* biome-ignore lint:wait */
import type { UiKit } from '@optimacros-ui/kit-store';
import { Zag } from './types';
import { Selector } from '../types';

/**
 * method for creating optimacros-ui store with additional functionality
 * @param config - default configuration
 */
export function createMachineContext<
    Schema extends Zag.Schema = Zag.Schema,
    Api extends Record<string, any> = Record<string, any>,
    Connect extends Zag.ConnectApi<Schema, Api> = any,
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
    machine: Zag.Module<any, any, any>;
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
    } as Record<string, any>;

    const useMachine = createMachineApiHook<Schema, Api>(machine, connect);

    type MachineContext = ReturnType<typeof useMachine>;

    const useFeatureFlags = GlobalContext
        ? createUseFeatureFlagsHooks(GlobalContext.useProxySelector, id)
        : () => true;

    const {
        StateContext: ApiContext,
        useState,
        useProxySelector,
        useSelector,
    } = createHooks(`${id}Api`, {} as MachineContext, true);

    function useApi() {
        const { api } = useState();

        return api as Api;
    }

    const { State: Api } = createHelpers<Api, { useState: typeof useApi }>(`${id}Api`, {
        useState: useApi,
    });

    const { State } = createHelpers<MachineContext, { useState: typeof useState }>(`${id}State`, {
        useState,
    });

    const StoreProvider: FC<{
        children: ReactNode;
        api?: MachineContext;
    }> = memo(({ children, api }) => {
        //@ts-ignore
        return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
    });

    StoreProvider.displayName = id;

    function RootMachine({ children, ...context }: Zag.RootProps<Schema, MachineContext>) {
        const machineApi = useMachine(context as unknown as Props);

        return (
            <StoreProvider api={machineApi}>
                {isFunction(children) ? children(machineApi) : children}
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
        State,
    };
}
