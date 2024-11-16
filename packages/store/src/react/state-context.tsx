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

type ApiStoreConfig<
    ID extends string = string,
    InitialState extends Record<string, any> = NonNullable<unknown>,
    Api extends Record<string, any> = NonNullable<unknown>,
    Machine = NonNullable<unknown>,
    Selectors = NonNullable<unknown>,
    Hooks = NonNullable<unknown>,
> = StoreConfig<ID, InitialState, Selectors, Hooks> & {
    machine: Machine;
    api: Api;
    /** place as div in dom */
    rootAsTag?: boolean;
    /** replace root props */
    useRootProps?: (api: Api) => any;
    /** use actor instead of machine */
    actor?: boolean;
};

export function createReactApiStateContext<
    ID extends string = string,
    InitialState extends Record<string, any> = NonNullable<unknown>,
    Api extends Record<string, any> = NonNullable<unknown>,
    Machine extends Record<string, any> = NonNullable<unknown>,
    Selectors extends Record<string, Selector<InitialState>> = NonNullable<unknown>,
    Hooks extends HooksConfig = NonNullable<unknown>,
>(config: ApiStoreConfig<ID, InitialState, Api, Machine, Selectors, Hooks>) {
    const { initialState, createConfig, id, api, machine, rootAsTag, useRootProps, actor } = config;

    const createdConfig = createConfig?.(initialState) ?? {};

    const slice = {
        ...config,
        selectors: createdConfig?.selectors,
    };

    const { StateContext, ...hooks } = createHooks(`${id}State`, initialState, true);
    const { StateContext: ApiContext, useState: useApi } = createHooks(`${id}Api`, api);

    const helpers = createHelpers<InitialState, typeof hooks>(id, hooks);
    const { State: Api } = createHelpers<InitialState, { useState: typeof useApi }>(
        `${id}Api`,
        hooks,
    );

    const StoreProvider: FC<{
        children: ReactNode;
        initialState?: Partial<InitialState>;
        state?: InitialState;
        api?: Api;
    }> = memo(({ children, state, api }) => {
        return (
            <StateContext.Provider value={state}>
                <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
            </StateContext.Provider>
        );
    });

    StoreProvider.displayName = id;

    const useMachine = createMachineApiHook<Parameters<Machine['machine']>[0]>(machine);
    const useActor = createActorApiHook(machine);

    function RootMachine({
        children,
        state = null,
        ...context
    }: { state?: InitialState; children: ReactNode | ((api: Api) => ReactNode) } & Omit<
        Parameters<Machine['machine']>[0],
        'id'
    > & { id?: string }) {
        const { send, api } = useMachine(context);

        return (
            <StoreProvider state={state} api={api}>
                {isFunction(children) ? children(api) : children}
            </StoreProvider>
        );
    }

    function RootActor({
        children,
        state = null,
        actor,
    }: { state?: InitialState; children: ReactNode | ((api: Api) => ReactNode); actor: any }) {
        const { send, api } = useActor(actor);

        return (
            <StoreProvider state={state} api={api}>
                {isFunction(children) ? children(api) : children}
            </StoreProvider>
        );
    }

    const Root = actor ? RootActor : RootMachine;

    const RootAsTagComponent = ({
        children,
        className,
    }: {
        children: ReactNode | ((api: Api) => ReactNode);
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
