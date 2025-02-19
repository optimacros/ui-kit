import { ActionCreator } from '../utils';
import { isEqual, mapValues } from '@optimacros-ui/utils';
import { mergeDeepWith } from 'immutable';
import { memoize } from 'proxy-memoize';
import {
    Context,
    Dispatch,
    Reducer,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from 'react';

export function createReducerWithMiddleware<M extends Array<any>>(
    Context: Context<any>,
    middlewares: M,
) {
    function useReducerwithMiddleware<S, A>(initialState: S, reducer: (state: S, action) => S) {
        const nextState = useRef(initialState);

        const [state, dispatch] = useReducer(reducer, initialState);

        const dispatchWithMw = useCallback((action) => {
            try {
                const getState = () => ({
                    prev: nextState.current,
                    current: nextState.current,
                });

                middlewares.forEach((middleware) => {
                    middleware({ action, getState });
                });
            } catch (e) {
                console.error(e);
            } finally {
                dispatch(action);
            }

            //@ts-ignore
            nextState.current = Context._currentValue;
        }, []);

        return [state, dispatchWithMw] as [S, Dispatch<A>];
    }
    return useReducerwithMiddleware;
}

type Slice<A = Record<string, (state, payload) => any>> = {
    actions: A;
};

export function createUseHook<
    StateContext extends Context<any>,
    T,
    R extends Reducer<any, any>,
    M extends Array<any>,
    A extends Record<string, ActionCreator>,
    State = StateContext extends Context<infer S> ? S : unknown,
>(Context: StateContext, initialState: T, middlewares: M, reducer: R, actions: A) {
    const useReducerWithMiddleware = createReducerWithMiddleware(Context, middlewares);

    function useStore(defaultState: Partial<State>, onChange) {
        const first = useRef(true);

        // nested pickBy
        const iniState = useMemo(
            () =>
                mergeDeepWith(
                    (oldVal, newVal) => (!newVal ? oldVal : newVal),
                    initialState,
                    defaultState ?? {},
                ),
            [],
        );

        const [state, dispatch] = useReducerWithMiddleware(iniState, reducer);

        const reducerActions = useMemo(() => {
            const finalActions = mapValues(actions, (action, k) => {
                return (payload) => dispatch(action(payload));
            });

            return finalActions as Slice['actions'];
        }, [dispatch]);

        useEffect(() => {
            if (!first.current) {
                if (onChange) {
                    onChange(state);
                }
            } else {
                first.current = false;
            }
        }, [state]);

        return [state, reducerActions] as [State, Slice['actions']];
    }

    return useStore;
}

export function createUseSelectorHook<
    T extends Context<any>,
    State = T extends Context<infer S> ? S : unknown,
>(Context: T) {
    function useSelector<Selected>(selector: (state: State) => Selected) {
        const context = useContext(Context);

        if (context === undefined) {
            throw new Error('useSelector must be used within the corresponding provider');
        }

        const [selectedValue, setSelectedValue] = useState(() => selector(context));
        const prevValueRef = useRef(selectedValue);
        const selectorRef = useRef(selector);

        useEffect(() => {
            selectorRef.current = selector;
        }, [selector]);

        useEffect(() => {
            const newSelectedValue = selectorRef.current(context);

            if (!isEqual(newSelectedValue, prevValueRef.current)) {
                setSelectedValue(newSelectedValue);
                prevValueRef.current = newSelectedValue;
            }
        }, [context]);

        return selectedValue;
    }

    return useSelector;
}

/**
 * creates a proxy-memoized fn that works like useSelector
 * @see https://proxy-memoize.js.org/docs/useproxyselector/#useproxyselector
 *
 * @example
 * useProxySelector((state) => groupBy(state.user.feature_flags, 'name'), [deps])
 * */
export function createProxySelectorHook<TState extends Record<string, any>>(
    useSelector: (state) => any,
) {
    function useProxySelector<TReturnType>(
        fn: (state: TState) => TReturnType,
        deps: any[] = [],
    ): TReturnType {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const hook = useSelector(useCallback(memoize(fn), deps));

        return hook;
    }

    return useProxySelector;
}
