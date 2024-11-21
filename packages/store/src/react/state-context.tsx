import { invariant, isFunction } from '@optimacros/ui-kit-utils';
import { ComponentProps, createContext, FC, memo, ReactNode, useContext } from 'react';
import { createProxySelectorHook } from './hooks';
import { createUseSelectorHook } from './hooks';
import { createActorApiHook, createMachineApiHook } from './useMachineApi';
import { styled } from './factory';

type HooksConfig = object;

interface StoreConfig<
    ID extends string = string,
    InitialState extends Record<string, any> = NonNullable<unknown>,
    Selectors = NonNullable<unknown>,
    Hooks = NonNullable<unknown>,
> {
    id: ID;
    initialState: InitialState;
    createConfig?: (initialState: InitialState) => {
        selectors?: Selectors;
    };
    hooks?: Hooks;
}

const createDisplayName = (name?: string, displayName?: string) => `${displayName}.${name}`;

function createHooks<InitialState>(
    name: string,
    initialState: InitialState,
    createSelectorHooks: boolean,
): {
    useSelector: <R extends any>(s: (state: InitialState) => R) => R;
    useProxySelector: <R extends any>(s: (state: InitialState) => R) => R;
    StateContext: InitialState;
    useState: () => InitialState;
};

function createHooks<InitialState>(
    name: string,
    initialState: InitialState,
): {
    StateContext: InitialState;
    useState: () => InitialState;
};

function createHooks<InitialState>(
    name: string,
    initialState: InitialState,
    createSelectorHooks?: boolean,
) {
    const StateContext = createContext<InitialState>(initialState);

    StateContext.displayName = createDisplayName(name, 'State');

    function useState() {
        const state = useContext(StateContext);

        invariant(state, `not in context of ${name}`);

        return state;
    }

    if (createSelectorHooks) {
        const useSelector = createUseSelectorHook(StateContext);
        const useProxySelector = createProxySelectorHook<InitialState>(useSelector);

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

function createHelpers<InitialState, H extends { useState } = { useState }>(
    name: string,
    hooks: H,
) {
    const State: FC<{
        children: (state: InitialState) => ReactNode;
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
type Selector<InitialState> = (store: InitialState, ...params) => any;

export function createReactStateContext<
    ID extends string = string,
    InitialState extends Record<string, any> = NonNullable<unknown>,
    Selectors extends Record<string, Selector<InitialState>> = NonNullable<unknown>,
    Hooks extends HooksConfig = NonNullable<unknown>,
>(config: StoreConfig<ID, InitialState, Selectors, Hooks>) {
    const { initialState, createConfig, id } = config;

    const createdConfig = createConfig?.(initialState) ?? {};

    const slice = {
        ...config,
        selectors: createdConfig?.selectors,
    };

    const { StateContext, ...hooks } = createHooks(id, initialState);

    const helpers = createHelpers<InitialState, typeof hooks>(id, hooks);

    const StoreProvider: FC<{
        children: ReactNode;
        initialState?: Partial<InitialState>;
        state?: InitialState;
        onChange?: (v: InitialState) => void;
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
    InitialState extends Record<string, any> = NonNullable<unknown>,
    Api extends Record<string, any> = NonNullable<unknown>,
    Machine extends Record<string, any> = NonNullable<unknown>,
    Selectors = NonNullable<unknown>,
    Hooks = NonNullable<unknown>,
    ExtApi extends Api = Api,
    ApiState = NonNullable<unknown>,
> = StoreConfig<ID, InitialState, Selectors, Hooks> & {
    machine: Machine;
    api: Api;
    /** place as div in dom */
    rootAsTag?: boolean;
    /** replace root props */
    useRootProps?: (api: ExtApi) => any;
    /** use actor instead of machine */
    actor?: boolean;
    useExtendApi?: (
        state: ApiState,
        api: Api & {
            send: (action: string | { type?: string; value?: any; src?: string }) => void;
        },
    ) => ExtApi;
    defaultContext?: MachineCtx<Machine>;
};

export function createReactApiStateContext<
    ID extends string = string,
    InitialState extends Record<string, any> = NonNullable<unknown>,
    Api extends Record<string, any> = NonNullable<unknown>,
    Machine extends Record<string, any> = NonNullable<unknown>,
    Selectors extends Record<string, Selector<InitialState>> = NonNullable<unknown>,
    Hooks extends HooksConfig = NonNullable<unknown>,
    ExtApi extends Api = Api,
    ApiState extends Record<string, any> = Parameters<Machine['connect']>[0],
>(config: ApiStoreConfig<ID, InitialState, Api, Machine, Selectors, Hooks, ExtApi, ApiState>) {
    const {
        initialState,
        createConfig,
        id,
        api,
        machine,
        rootAsTag,
        useRootProps,
        actor,
        useExtendApi = (state, api) => api,
    } = config;

    const createdConfig = createConfig?.(initialState) ?? {};

    const slice = {
        ...config,
        selectors: createdConfig?.selectors,
    };

    const { StateContext, ...hooks } = createHooks(`${id}State`, initialState, true);
    const { StateContext: ApiContext, useState: useBaseApi } = createHooks(`${id}Api`, api);
    const { StateContext: ApiStateContext, useState: useApiState } = createHooks(
        `${id}ApiState`,
        null as ApiState,
    );

    function useApi() {
        const api = useBaseApi();
        const state = useApiState();

        //@ts-ignore
        const extendedApi = useExtendApi(state, api);

        return extendedApi as ExtApi & { send: (action: string) => void };
    }

    const helpers = createHelpers<InitialState, typeof hooks>(id, hooks);
    const { State: Api } = createHelpers<ExtApi, { useState: typeof useApi }>(`${id}Api`, {
        useState: useApi,
    });

    const StoreProvider: FC<{
        children: ReactNode;
        initialState?: Partial<InitialState>;
        state?: InitialState;
        api?: Api;
        apiState?: ApiState;
    }> = memo(({ children, state, api, apiState }) => {
        return (
            <StateContext.Provider value={state}>
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
        state?: InitialState;
        children: ReactNode | ((api: ExtApi) => ReactNode);
    } & MachineCtx<Machine> & { id?: string }) {
        //@ts-ignore
        const { api, send, state: apiState } = useMachine(context);

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
    }: { state?: InitialState; children: ReactNode | ((api: ExtApi) => ReactNode); actor: any }) {
        const { api, send, state: apiState } = useActor(actor);

        return (
            //@ts-ignore
            <StoreProvider state={state} api={{ ...api, send }} apiState={apiState}>
                {isFunction(children) ? children(api) : children}
            </StoreProvider>
        );
    }

    const Root = actor ? RootActor : RootMachine;

    const RootAsTagComponent = ({
        children,
        className,
    }: {
        children: ReactNode | ((api: ExtApi) => ReactNode);
        className?: string;
    }) => {
        const api = useApi();
        const props = useRootProps?.(api) ?? {};

        return (
            <styled.div
                data-scope={id}
                data-part="root"
                {...props}
                key={props?.id ?? id}
                className={`${props.className ?? ''} ${className}`}
            >
                {isFunction(children) ? children(api) : children}
            </styled.div>
        );
    };

    const RootAsTag = ({
        children,
        className,
        ...rest
    }: ComponentProps<typeof Root> & { className?: string }) => {
        return (
            //@ts-ignore
            <Root {...rest}>
                <RootAsTagComponent className={className}>{children}</RootAsTagComponent>
            </Root>
        );
    };
    return {
        ...helpers,
        ...hooks,
        select: slice.selectors,
        slice,
        Api,
        useApi,
        useMachine,
        Root: rootAsTag ? RootAsTag : Root,
        Provider: StoreProvider,
    };
}
