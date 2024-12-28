import { invariant, isFunction, merge } from '@optimacros-ui/utils';
import { createContext, FC, memo, ReactNode, useContext } from 'react';
import { createProxySelectorHook } from './hooks';
import { createUseSelectorHook } from './hooks';
import { createActorApiHook, createMachineApiHook } from './useMachineApi';
import { createMachine, StateMachine, Machine as ZagMachine } from '@zag-js/core';

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
    useProxySelector: <R extends any>(s: (state: State) => R, deps?: any[]) => R;
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
export type AnyOptions = StateMachine.MachineOptions<
    Record<string, any>,
    StateMachine.StateSchema,
    StateMachine.EventObject & { value: any }
>;

export type AnyConfig = StateMachine.MachineConfig<
    Record<string, any>,
    StateMachine.StateSchema,
    StateMachine.EventObject & { value: any }
>;

export function extendMachine<
    T extends { machine: (userContext) => Record<string, any> },
    State = ReturnType<T['machine']> extends ZagMachine<infer TContext, infer TState, infer TEvents>
        ? { ctx: TContext; state: TState; evt: TEvents }
        : NonNullable<unknown>,
    ConfigCreator extends AnyConfig | ((prev: ReturnType<T['machine']>) => AnyConfig) = (
        prev: ReturnType<T['machine']>,
    ) => AnyConfig,
    Config = ConfigCreator extends () => {} ? ReturnType<ConfigCreator> : ConfigCreator,
    Options = StateMachine.MachineOptions<
        Config['context'] & State['ctx'],
        State['state'],
        State['evt']
    >,
    OptionCreator extends Options | ((prev: ReturnType<T['machine']>) => Options) =
        | Options
        | ((prev: ReturnType<T['machine']>) => Options),
>(stateMachine: T, configCreator: ConfigCreator, optionCreator: OptionCreator) {
    function machine<C>(userContext: C) {
        const defaultMachine = stateMachine.machine(userContext);
        const config = isFunction(configCreator) ? configCreator(defaultMachine) : configCreator;
        const options = isFunction(optionCreator) ? optionCreator(defaultMachine) : optionCreator;

        return createMachine<Config['context'] & State['ctx'], State['state']>(
            merge(true, defaultMachine.config, {
                ...config,
                context: merge(true, config?.context, userContext),
            }),
            merge(true, defaultMachine.options, options),
        );
    }

    return {
        ...stateMachine,
        machine,
    };
}

export type ExtendApiMethod = (api) => void;

type MachineCtx<Machine extends Record<string, any>> = Omit<
    Parameters<Machine['machine']>[0],
    'id'
>;
type ApiStoreConfig<
    ID extends string = string,
    Machine extends Record<string, any> = NonNullable<unknown>,
    Selectors = NonNullable<unknown>,
    Api extends Record<string, any> = NonNullable<unknown>,
> = {
    id: ID;
    machine: Machine;

    /** use actor instead of machine */
    actor?: boolean;

    createConfig?: (initialState: Api) => {
        selectors?: Selectors;
    };

    connect?: (
        api: ReturnType<Machine['connect']>,
        {
            state,
            send,
        }: {
            state: ReturnType<Machine['machine']> extends ZagMachine<
                infer TContext,
                infer TState,
                infer TEvent
            >
                ? StateMachine.State<TContext, TState, TEvent>
                : any;
            send: StateMachine.Send;
        },
        machine: ReturnType<Machine['machine']>,
    ) => Api;
};

export function createReactApiStateContext<
    ID extends string = string,
    Machine extends Record<string, any> = NonNullable<unknown>,
    Api extends ReturnType<Machine['connect']> = ReturnType<Machine['connect']>,
    Selectors extends Record<string, Selector<Api>> = NonNullable<unknown>,
    Context = ReturnType<Machine['machine']> extends ZagMachine<infer TContext, infer TState>
        ? TContext
        : NonNullable<unknown>,
>(config: ApiStoreConfig<ID, Machine, Selectors, Api>) {
    const { createConfig, id, machine, actor, connect = (api) => api } = config;

    const createdConfig = createConfig?.({}) ?? {};

    const slice = {
        ...config,
        selectors: createdConfig?.selectors,
    };

    const {
        StateContext: ApiContext,
        useState: useApi,
        useProxySelector,
        useSelector,
    } = createHooks(`${id}Api`, {} as Api, true);

    const { State: Api } = createHelpers<Api, { useState: typeof useApi }>(`${id}Api`, {
        useState: useApi,
    });

    const StoreProvider: FC<{
        children: ReactNode;
        api?: Api;
    }> = memo(({ children, api }) => {
        return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
    });

    StoreProvider.displayName = id;

    const useMachine = createMachineApiHook<MachineCtx<Machine>>(machine, false, connect);
    const useControllableMachine = createMachineApiHook<MachineCtx<Machine>>(
        machine,
        true,
        connect,
    );

    const useActor = createActorApiHook(machine);

    type IRootMachine = {
        id?: string;
        children: ReactNode | ((api: Api) => ReactNode);
        defaultContext: MachineCtx<Machine>;
    } & Context;

    function ControllableRootMachine({ children, defaultContext, ...context }: IRootMachine) {
        const {
            api,
            send,
            machine,
            //@ts-ignore
        } = useControllableMachine(context, defaultContext);

        return (
            //@ts-ignore
            <StoreProvider api={{ ...api, send, machine }}>
                {isFunction(children) ? children(api) : children}
            </StoreProvider>
        );
    }

    function BaseRootMachine({ children, ...context }: IRootMachine) {
        const {
            api,
            send,
            state: apiState,
            machine,
            //@ts-ignore
        } = useMachine(context);

        return (
            //@ts-ignore
            <StoreProvider api={{ ...api, send, machine }}>
                {isFunction(children) ? children(api) : children}
            </StoreProvider>
        );
    }

    function RootMachine({
        controllable,
        ...rest
    }: {
        /** lets you control component props outside of component context */
        controllable?: boolean;
    } & IRootMachine) {
        return controllable ? <ControllableRootMachine {...rest} /> : <BaseRootMachine {...rest} />;
    }

    function RootActor({
        children,
        actor,
    }: { children: ReactNode | ((api: Api) => ReactNode); actor: any }) {
        const { api, send } = useActor(actor);

        return (
            //@ts-ignore
            <StoreProvider api={{ ...api, send }}>
                {isFunction(children) ? children(api) : children}
            </StoreProvider>
        );
    }

    const Root = actor ? RootActor : RootMachine;

    return {
        select: slice.selectors,
        slice,
        useSelector,
        useProxySelector,
        Api,
        useApi,
        RootProvider: Root,
        splitProps: machine.splitProps as Machine['splitProps'],
    };
}
