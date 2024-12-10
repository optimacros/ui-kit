import { invariant, isFunction } from '@optimacros-ui/utils';
import { createContext, FC, memo, ReactNode, useContext } from 'react';
import { createProxySelectorHook } from './hooks';
import { createUseSelectorHook } from './hooks';
import { createActorApiHook, createMachineApiHook } from './useMachineApi';

type HooksConfig = object;

interface StoreConfig<
    ID extends string = string,
    State extends Record<string, any> = NonNullable<unknown>,
    Selectors = NonNullable<unknown>,
    Hooks = NonNullable<unknown>,
> {
    id: ID;
    initialState: State;
    createConfig?: (initialState: State) => {
        selectors?: Selectors;
    };
    hooks?: Hooks;
}

const createDisplayName = (name?: string, displayName?: string) => `${displayName}.${name}`;

function createHooks<State>(
    name: string,
    initialState: State,
    createSelectorHooks: boolean,
): {
    useSelector: <R extends any>(s: (state: State) => R) => R;
    useProxySelector: <R extends any>(s: (state: State) => R) => R;
    StateContext: State;
    useState: () => State;
};

function createHooks<State>(
    name: string,
    initialState: State,
): {
    StateContext: State;
    useState: () => State;
};

function createHooks<State>(name: string, initialState: State, createSelectorHooks?: boolean) {
    const StateContext = createContext<State>(initialState);

    StateContext.displayName = createDisplayName(name, 'State');

    function useState() {
        const state = useContext(StateContext);

        invariant(state, `not in context of ${name}`);

        return state;
    }

    if (createSelectorHooks) {
        const useSelector = createUseSelectorHook(StateContext);
        const useProxySelector = createProxySelectorHook<State>(useSelector);

        return {
            StateContext,
            useSelector,
            useState,
            useProxySelector,
        };
    }

    return {
        useState,
        StateContext,
    };
}

function createHelpers<State, H extends { useState } = { useState }>(name: string, hooks: H) {
    const State: FC<{
        children: (state: State) => ReactNode;
    }> = ({ children }) => {
        const state = hooks.useState();

        return children(state);
    };

    State.displayName = createDisplayName(name, 'State');

    return {
        /**
         * `Helper for accessing  state inside children`
         *
         * @example
         * <Store.Provider>
         * 	<Store.State>
         * 		{(state) =>
         * 			<>{state.value}</>
         * 		}
         * 	</Store.State>
         * </Store.Provider>
         */
        State,
    };
}
type Selector<State> = (store: State, ...params) => any;

export function createReactStateContext<
    ID extends string = string,
    State extends Record<string, any> = NonNullable<unknown>,
    Selectors extends Record<string, Selector<State>> = NonNullable<unknown>,
    Hooks extends HooksConfig = NonNullable<unknown>,
>(config: StoreConfig<ID, State, Selectors, Hooks>) {
    const { initialState, createConfig, id } = config;

    const createdConfig = createConfig?.(initialState) ?? {};

    const slice = {
        ...config,
        selectors: createdConfig?.selectors,
    };

    const { StateContext, ...hooks } = createHooks(id, initialState);

    const helpers = createHelpers<State, typeof hooks>(id, hooks);

    const StoreProvider: FC<{
        children: ReactNode;
        initialState?: Partial<State>;
        state?: State;
        onChange?: (v: State) => void;
    }> = memo(({ children, state: controlledState }) => {
        const state = hooks.useState();

        return (
            <StateContext.Provider value={controlledState ?? state}>
                {children}
            </StateContext.Provider>
        );
    });

    StoreProvider.displayName = id;

    return {
        ...helpers,
        ...hooks,
        select: slice.selectors,
        slice,
        Provider: StoreProvider,
    };
}

type MachineCtx<Machine extends Record<string, any>> = Omit<
    Parameters<Machine['machine']>[0],
    'id'
>;
type ApiStoreConfig<
    ID extends string = string,
    State extends Record<string, any> = NonNullable<unknown>,
    Api extends Record<string, any> = NonNullable<unknown>,
    Machine extends Record<string, any> = NonNullable<unknown>,
    Selectors = NonNullable<unknown>,
    Hooks = NonNullable<unknown>,
    ExtApi extends Api = Api,
    ApiState = NonNullable<unknown>,
> = StoreConfig<ID, State, Selectors, Hooks> & {
    machine: Machine;
    api: Api;
    /**
     * @deprecated
     * place as div in dom
     * */
    rootAsTag?: boolean;
    /**
     * @deprecated
     */
    useRootProps?: (api: ExtApi) => any;
    /** use actor instead of machine */
    actor?: boolean;
    useExtendApi?: (
        state: State,
        api: Api & {
            send: (action: string | { type?: string; value?: any; src?: string }) => void;
        },
        apiState: ApiState,
    ) => ExtApi;
    defaultContext?: MachineCtx<Machine>;
};

export function createReactApiStateContext<
    ID extends string = string,
    State extends Record<string, any> = NonNullable<unknown>,
    Api extends Record<string, any> = NonNullable<unknown>,
    Machine extends Record<string, any> = NonNullable<unknown>,
    Selectors extends Record<string, Selector<State>> = NonNullable<unknown>,
    Hooks extends HooksConfig = NonNullable<unknown>,
    ExtApi extends Api = Api,
    ApiState extends Record<string, any> = Parameters<Machine['connect']>[0],
>(config: ApiStoreConfig<ID, State, Api, Machine, Selectors, Hooks, ExtApi, ApiState>) {
    const {
        initialState,
        createConfig,
        id,
        api,
        machine,
        actor,
        useExtendApi = (state, api) => api,
        defaultContext = {},
    } = config;

    const createdConfig = createConfig?.(initialState) ?? {};

    const slice = {
        ...config,
        selectors: createdConfig?.selectors,
    };

    const { StateContext, ...stateHooks } = createHooks(`${id}State`, initialState, true);
    const { StateContext: ApiContext, useState: useBaseApi } = createHooks(`${id}Api`, api);
    const { StateContext: ApiStateContext, useState: useApiState } = createHooks(
        `${id}ApiState`,
        null as ApiState,
    );

    function useApi() {
        const api = useBaseApi();
        const state = stateHooks.useState();

        //@ts-ignore
        const extendedApi = useExtendApi(state, api);

        return extendedApi as ExtApi & { send: (action: string) => void };
    }

    const helpers = createHelpers<State, typeof stateHooks>(id, stateHooks);
    const { State: Api } = createHelpers<ExtApi, { useState: typeof useApi }>(`${id}Api`, {
        useState: useApi,
    });

    const StoreProvider: FC<{
        children: ReactNode;
        state?: State;
        api?: Api;
        apiState?: ApiState;
    }> = memo(({ children, state = {}, api, apiState }) => {
        return (
            <StateContext.Provider value={{ ...initialState, ...state }}>
                <ApiContext.Provider value={api}>
                    <ApiStateContext.Provider value={apiState}>{children}</ApiStateContext.Provider>
                </ApiContext.Provider>
            </StateContext.Provider>
        );
    });

    StoreProvider.displayName = id;

    const useMachine = createMachineApiHook<MachineCtx<Machine>>(machine);
    const useActor = createActorApiHook(machine);

    function RootMachine({
        children,
        state = null,
        ...context
    }: {
        state?: State;
        children: ReactNode | ((api: ExtApi) => ReactNode);
    } & MachineCtx<Machine> & { id?: string }) {
        //@ts-ignore
        const { api, send, state: apiState } = useMachine({ ...defaultContext, ...context });

        return (
            //@ts-ignore
            <StoreProvider state={state} api={{ ...api, send }} apiState={apiState}>
                {isFunction(children) ? children(api) : children}
            </StoreProvider>
        );
    }

    function RootActor({
        children,
        state = null,
        actor,
    }: { state?: State; children: ReactNode | ((api: ExtApi) => ReactNode); actor: any }) {
        const { api, send, state: apiState } = useActor(actor);

        return (
            //@ts-ignore
            <StoreProvider state={state} api={{ ...api, send }} apiState={apiState}>
                {isFunction(children) ? children(api) : children}
            </StoreProvider>
        );
    }

    const Root = actor ? RootActor : RootMachine;

    return {
        ...helpers,
        ...stateHooks,
        select: slice.selectors,
        slice,
        Api,
        useApiState,
        useApi,
        useMachine,
        RootProvider: Root,
    };
}
