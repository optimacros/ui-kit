import { invariant, mapValues } from '@optimacros-ui/utils';
import { createContext, FC, memo, ReactNode, useContext, useLayoutEffect } from 'react';
import { createProxySelectorHook } from './hooks';

import { ActionCreator, createActionCreator, PayloadAction } from '../utils';
import { createActionsForKeys } from './actions';
import { createUseHook, createUseSelectorHook } from './hooks';
type ReactMiddlewareFn = ({ action, getState }) => void;

type HooksConfig = object;

type ReactStoreConfig = {
    middleware?: Array<ReactMiddlewareFn>;
};
export interface StoreConfig<
    ID extends string = string,
    InitialState extends Record<string, any> = NonNullable<unknown>,
    Reducers = NonNullable<unknown>,
    Selectors = NonNullable<unknown>,
    ActionKeys extends Array<string> = [],
    StoreConf = NonNullable<unknown>,
    Hooks = NonNullable<unknown>,
    /** ----------------- */
    Actions extends NonNullable<unknown> = NonNullable<unknown>,
    GeneratedActions = NonNullable<unknown>,
> {
    __actions?: Actions;
    __generatedActions?: GeneratedActions;

    id: ID;
    initialState: InitialState;
    createConfig?: (
        initialState: InitialState,
        createdActions: Actions,
    ) => {
        /** reducer functions with state as immer draft */
        reducers?: Reducers;
        selectors?: Selectors;
    };
    store?: StoreConf;
    actions?: {
        /**
         *  create default actions for keys, uses {@link ReduxActions.createForKeys}
         */
        keys?: [...ActionKeys];
    };
    hooks?: Hooks;
}

const createDisplayName = (name?: string, displayName?: string) => `${displayName}.${name}`;

function createHooks<InitialState, Actions>(
    name: string,
    initialState: InitialState,
    actions: Actions,
) {
    const StateContext = createContext<InitialState>(initialState);
    const ActionsContext = createContext<Actions>(null);

    StateContext.displayName = createDisplayName(name, 'State');
    ActionsContext.displayName = createDisplayName(name, 'Actions');

    function useState() {
        const state = useContext(StateContext);

        invariant(state, `not in context of ${name}`);

        return state;
    }

    function useActions() {
        const actions = useContext(ActionsContext);

        invariant(actions, `not in context of ${name}`);

        return actions;
    }

    const useSelector = createUseSelectorHook(StateContext);
    const useProxySelector = createProxySelectorHook<InitialState>(useSelector);

    return {
        ActionsContext,
        StateContext,
        useSelector,
        useState,
        useActions,
        useProxySelector,
    };
}

function createHelpers<
    InitialState,
    A,
    H extends { useState; useActions } = { useState; useActions },
>(name: string, hooks: H) {
    const Context: FC<{
        children: (
            /** current state */
            state: InitialState,
            /** all reducer actions */
            actions: A,
        ) => ReactNode;
    }> = ({ children }) => {
        const state = hooks.useState();
        const actions = hooks.useActions();

        return children(state, actions);
    };

    const Actions: FC<{
        children: (
            /** all reducer actions */
            actions: A,
        ) => ReactNode;
    }> = ({ children }) => {
        const actions = hooks.useActions();

        return children(actions);
    };

    const State: FC<{
        children: (state: InitialState) => ReactNode;
    }> = ({ children }) => {
        const state = hooks.useState();

        return children(state);
    };
    Context.displayName = createDisplayName(name, 'Context');
    Actions.displayName = createDisplayName(name, 'Actions');
    State.displayName = createDisplayName(name, 'State');

    return {
        /**
         * `Helper for accessing state and actions inside children`
         *
         * @example
         * <Store.Provider>
         * 	<Store.Context>
         * 		{(state, actions) =>
         * 			<>do something with actions and state (maybe onBtnClick)</>
         * 		}
         * 	</Store.Context>
         * </Store.Provider>
         */
        Context,
        /**
         * `Helper for accessing  actions inside children`
         *
         * @example
         * <Store.Provider>
         * 	<Store.Actions>
         * 		{(actions) =>
         * 			<>do something with actions (maybe onBtnClick)</>
         * 		}
         * 	</Store.Actions>
         * </Store.Provider>
         */
        Actions,
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

export function createReactStore<
    ID extends string = string,
    InitialState extends Record<string, any> = NonNullable<unknown>,
    Reducers = NonNullable<unknown>,
    Selectors extends Record<string, Selector<InitialState>> = NonNullable<unknown>,
    ActionKeys extends Array<string> = [],
    Hooks extends HooksConfig = NonNullable<unknown>,
    StoreConf extends ReactStoreConfig = NonNullable<unknown>,
>(config: StoreConfig<ID, InitialState, Reducers, Selectors, ActionKeys, StoreConf, Hooks>) {
    const { initialState, actions: actionsConfig, createConfig, id } = config;

    const actions = createActionsForKeys<InitialState, ActionKeys>(
        initialState,
        //@ts-ignore
        actionsConfig?.keys,
    );

    const createdConfig = createConfig?.(initialState, actions) ?? {};

    const reducerActions = {
        //@ts-ignore
        ...actions,
        ...mapValues<Record<string, (state, action) => void>>(createdConfig.reducers, (call) => {
            return (state, action) => call(state, action.payload);
        }),
    };

    type ConfigReducers = typeof createdConfig.reducers;

    type CreatedActions = typeof actions;

    type ReducerActions = {
        //@ts-ignore
        [K in keyof CreatedActions]: Parameters<CreatedActions[K]>[1];
    } & {
        //@ts-ignore
        [K in keyof ConfigReducers]: PayloadAction<K, Parameters<ConfigReducers[K]>[1]>;
    };

    const slice = {
        ...config,
        selectors: createdConfig?.selectors,
        reducer: (
            state: InitialState,
            action: PayloadAction<keyof typeof reducerActions & string>,
        ) => {
            const type = action.type.replace(`${id}/`, '');

            const call = reducerActions[type];

            return call(state, action);
        },
        actions: mapValues(reducerActions, (v, k) => createActionCreator(`${id}/${k}`)) as {
            [K in keyof ReducerActions]: ActionCreator<
                `${ID}/${K & string}`,
                ReducerActions[K]['payload']
            >;
        },
    };

    const { StateContext, ActionsContext, ...hooks } = createHooks(id, initialState, slice.actions);

    const helpers = createHelpers<InitialState, typeof slice.actions, typeof hooks>(id, hooks);

    const useStore = createUseHook(
        StateContext,
        initialState,
        config.store?.middleware ?? [],
        slice.reducer,
        slice.actions,
    );

    const StoreProvider: FC<{
        children: ReactNode;
        initialState?: Partial<InitialState>;
        state?: InitialState;
        actions?: typeof slice.actions;
        onChange?: (v: InitialState) => void;
        onStoreCreated?: (state: InitialState, actions: typeof slice.actions) => void;
    }> = memo(
        ({
            children,
            initialState,
            state: controlledState,
            actions: controlledActions,
            onChange,
            onStoreCreated,
        }) => {
            const [state, actions] = useStore(initialState, onChange);
            const storeState = controlledState ?? state;
            const storeActions = controlledActions ?? actions;

            useLayoutEffect(() => {
                onStoreCreated?.(storeState, storeActions);
            }, []);

            return (
                <StateContext.Provider value={storeState}>
                    {/**@ts-ignore*/}
                    <ActionsContext.Provider value={storeActions}>
                        {children}
                    </ActionsContext.Provider>
                </StateContext.Provider>
            );
        },
    );

    StoreProvider.displayName = id;

    return {
        ...helpers,
        ...hooks,
        select: slice.selectors,
        reducerActions,
        slice,
        Provider: StoreProvider,
    };
}
