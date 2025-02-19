import { invariant, isFunction, merge } from '@optimacros-ui/utils';
import { createContext, FC, memo, ReactNode, Context, useContext } from 'react';
import { createProxySelectorHook } from './hooks';
import { createUseSelectorHook } from './hooks';
import { createActorApiHook, createMachineApiHook } from './useMachineApi';
import { AnyMachine, createMachine, StateMachine, Machine as ZagMachine } from '@zag-js/core';
import * as $ from '@optimacros-ui/types';
import { createUseFeatureFlagsHooks } from './useFeatureFlags';
/* biome-ignore lint:wait */
import type { UiKit } from '@optimacros-ui/kit-store';

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
    StateContext: Context<State>;
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

export type MachineState<Machine> = Machine extends ZagMachine<
    infer MachineContext,
    infer MachineState,
    any
>
    ? MachineState
    : NonNullable<unknown>;

export type MachineEvent<Machine> = Machine extends ZagMachine<
    infer MachineContext,
    any,
    infer MachineEvent
>
    ? MachineEvent
    : NonNullable<unknown>;

export type MachineConfig<Service> = AnyConfig | ((prev: Service) => AnyConfig);
export type MachineOptions<
    Service extends AnyMachine,
    Context,
    Config extends AnyConfig,
    Options extends StateMachine.MachineOptions<
        Context & Config['context'],
        MachineState<Service>,
        MachineEvent<Service>
    > = StateMachine.MachineOptions<
        Context & Config['context'],
        MachineState<Service>,
        MachineEvent<Service>
    >,
> = Options | ((prev: Service) => Options);

export type UserContext<ZagCtx, Config extends AnyConfig> = $.Merge<ZagCtx, Config['context']>;
export type UserState<Module extends Record<string, any>> = $.Merge<
    MachineState<ReturnType<Module['machine']>>,
    {}
>;

export type UserApi<Api> = $.Merge<Api, {}>;

export type ExtendedMachine<
    Module,
    Context extends Record<string, any>,
    State extends StateMachine.StateSchema,
> = Omit<Module, 'machine'> & {
    machine: (userContext: Context) => ZagMachine<Context, State, StateMachine.AnyEventObject>;
};

/**
 * method for extending {@link ZagMachine}
 * @param stateMachine - any zag-js like module
 * @example 'import * as menu from '@zag-js/menu'
 * @param configCreator - {@link AnyConfig}
 * @param optionCreator - {@link StateMachine.MachineOptions}
 * @returns ZagJs module with mutated {@link ZagMachine} function
 */
export function extendMachine<
    Module,
    Service extends AnyMachine,
    Context extends Record<string, any>,
    State extends Record<string, any>,
    Event extends Record<string, any>,
    ConfigCreator extends AnyConfig | ((prev: Service) => AnyConfig) = AnyConfig,
    Config = ConfigCreator extends () => {} ? ReturnType<ConfigCreator> : ConfigCreator,
    //@ts-ignore
    Options = StateMachine.MachineOptions<Config['context'] & Context, State, Event>,
    OptionCreator extends Options | ((prev: Service) => Options) =
        | Options
        | ((prev: Service) => Options),
    T extends { machine: (userContext) => Service } = {
        machine: (userContext) => Service;
    },
>(stateMachine: T, configCreator: ConfigCreator, optionCreator: OptionCreator) {
    function machine<C>(userContext: C) {
        const defaultMachine = stateMachine.machine(userContext);
        const config: AnyConfig = isFunction(configCreator)
            ? configCreator(defaultMachine)
            : configCreator;
        const options = isFunction(optionCreator) ? optionCreator(defaultMachine) : optionCreator;

        return createMachine(
            merge(true, defaultMachine.config, {
                ...config,
                context: merge(true, config?.context, userContext),
            }),
            merge(true, defaultMachine.options, options),
        );
    }

    //@ts-ignore
    const result: Module & {
        //@ts-ignore
        machine: (userContext: Context & Config['context']) => Record<string, any>;
    } = {
        ...stateMachine,
        machine,
    };

    return result;
}

export type ExtendApiMethod = (api) => void;

/**
     * guard method for incapsulation
     *
     * in all hooks we get values from connect `method` return
     *
     * @see {@link ConnectMachine}
     * 
     * @returns MachineApi
     * @example
     * ```
        export const connect = ((api, { state, send }, machine) => {
            return {
                ...api,
                orientation: state.context.orientation,
                setOrientation(orientation: string) {
                    send({ type: 'ORIENTATION.SET', value: orientation });
                },
                getContentProps() {
                    return { ...api.getContentProps(), 'data-orientation': state.context.orientation };
                }
            };
        }) satisfies ConnectMachine<zagMenu.Api, Context, State>;
 ```
     */
export type ConnectMachine<
    Api extends Record<string, any>,
    Context extends Record<string, any>,
    State extends StateMachine.StateSchema,
    R = Record<string, any>,
> = (
    /** Previous Machine Api */
    api: Api,
    {
        state,
        send,
    }: {
        /** Machine State {@link StateMachine.State} */
        state: StateMachine.State<Context, State>;
        /** Machine Send Function {@link StateMachine.Send} */
        send: StateMachine.Send;
    },
    machine: Record<string, any>,
) => R;

/**
 * method for creating optimacros-ui store with additional functionality
 * @param config - default configuration
 */
export function createReactApiStateContext<
    Machine extends Record<string, any>,
    Api extends Record<string, any> = Record<string, any>,
    Context extends Record<string, any> = Parameters<Machine['machine']>[0],
    State extends StateMachine.StateSchema = StateMachine.StateSchema,
    Connect extends (
        /** Base Machine Api */
        api: Api,
        {
            state,
            send,
        }: {
            /** Machine State {@link StateMachine.State} */
            state: StateMachine.State<Context, State>;
            /** Machine Send Function {@link StateMachine.Send} */
            send: StateMachine.Send;
        },
        machine: Record<string, any>,
    ) => any = any,
    ID extends string = string,
    Selectors extends Record<string, Selector<Api>> = NonNullable<unknown>,
>(config: {
    /** Store id */
    id: ID;
    /**
     * zag-js like module
     * @example 'import * as menu from '@zag-js/menu'
     * */
    machine: Machine;
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

    const {
        StateContext: ApiContext,
        useState: useApi,
        useProxySelector,
        useSelector,
    } = createHooks(`${id}Api`, {} as $.If.Any<ReturnType<Connect>, Api>, true);

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

    const useMachine = createMachineApiHook<Context>(
        machine,
        false,
        //@ts-ignore
        connect,
    );

    const useControllableMachine = createMachineApiHook<Context>(
        machine,
        true,
        //@ts-ignore
        connect,
    );

    const useFeatureFlags = GlobalContext
        ? createUseFeatureFlagsHooks(GlobalContext.useProxySelector, id)
        : () => true;

    const useActor = createActorApiHook(machine);

    type IRootMachine = Omit<Context, 'id'> & {
        /** machine id (if its specific) */
        id?: string;
        children: ReactNode | ((api: Api) => ReactNode);
        /** defaultContext if using `controllable` prop */
        defaultContext?: Context;
    };

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
        //@ts-ignore
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
        /**
         * React Context provider for actor (especially for Toast component)
         * @accepts {@link IRootMachine} props
         */
        RootActorProvider: RootActor,
        // TODO: make split props work with extended machine
        /**
         * function for splitting context and other props
         *
         * `!!! warning`: if you've added new props with {@link extendMachine} this won't work
         */
        splitProps: machine.splitProps as Machine['splitProps'],
    };
}
