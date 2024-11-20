import {
    ActionsMap,
    ActionType,
    defineActions,
    getActionsType,
    PayloadAction,
    transformActions,
} from '../utils';
import * as $ from '@optimacros/ui-kit-types';
import * as _ from '@optimacros/ui-kit-utils';
import { Collection, getIn, setIn } from 'immutable';

type MapReactActions<State, Actions extends ActionsMap> = {
    [K in keyof Actions]: (
        state: State,
        action: PayloadAction<K & string, Parameters<Actions[K]>[0]>,
    ) => State;
};

export type ReducerActionsMapper<
    State,
    P extends $.Path<State>,
    Type extends NonNullable<unknown> = $.PathValue<State, P>,
    ActType = ActionsMap<ActionType<$.ToJs<Type>>, P>,
> = MapReactActions<State, ActType>;

export type ManyReducerActionsMapper<
    State,
    P extends $.UniqPathTuple<State, true>,
> = $.Object.ValuesToObject<{
    [Key in P[number]]: ReducerActionsMapper<State, Key>;
}>;

const setArrayLikeState = (state, paths, value, updValue) => {
    const createdValue = _.createImmutableInstance(value, updValue);

    return setIn(state, paths, createdValue);
};

const Actions = defineActions({
    indexed: {
        set: (state, payload, path) => {
            const paths = path.split('.');

            const value = _.createImmutableInstance(getIn(state, paths), payload);

            return setIn(state, paths, value);
        },
        clear: (state, payload, path) => {
            const paths = path.split('.');

            return setIn(state, paths, getIn(state, paths)?.clear());
        },
        add: (state, payload, path) => {
            const paths = path.split('.');

            const value = getIn(state, paths) as $.Tuple.Indexed.Type<any>;

            const updated = _.IndexedUtils.add(value, payload);

            return setArrayLikeState(state, paths, value, updated);
        },
        update: (state, payload, path) => {
            const paths = path.split('.');

            const value = getIn(state, paths) as $.Tuple.Indexed.Type<any>;

            const updated = _.IndexedUtils.update(value, payload);

            return setArrayLikeState(state, paths, value, updated);
        },
        delete: (state, payload, path) => {
            const paths = path.split('.');

            const value = getIn(state, paths) as Collection.Indexed<any>;

            const updated = _.IndexedUtils.deleteItems(value, payload);

            return setArrayLikeState(state, paths, value, updated);
        },
    },
    boolean: {
        set: (state, payload, paths) => setIn(state, paths.split('.'), payload),
        clear: (state, payload, paths) => setIn(state, paths.split('.'), undefined),
        toggle: (state, payload, paths) => setIn(state, paths, !getIn(state, paths.split('.'))),
    },
    primitive: {
        set: (state, payload, paths) => setIn(state, paths.split('.'), payload),
        clear: (state, payload, paths) => setIn(state, paths.split('.'), undefined),
    },
    keyed: {
        set: (state, payload, path) => {
            const paths = path.split('.');

            const value = _.createImmutableInstance(getIn(state, paths), payload);

            return setIn(state, paths, value);
        },
        clear: (state, payload, path) => {
            const paths = path.split('.');

            return setIn(state, paths, getIn(state, paths)?.clear());
        },
        setIn: (state, payload, paths) => {
            const { path, value } = payload;

            const keys = path.split('.');

            if (paths) {
                return setIn(state, [...paths.split('.'), ...keys], value);
            }

            return setIn(state, keys, value);
        },
        update: (state, payload, path) => {
            const paths = path.split('.');

            const { deep, value } = payload;

            if (paths) {
                return _.updateIn(state, paths, value, deep);
            }

            return _.merge(deep ?? false, state, value);
        },
        updateIn: (state, payload, paths) => {
            const { path, value, deep } = payload;

            const keys = path.split('.');

            if (paths) {
                return _.updateIn(state, [...paths.split('.'), ...keys], value, deep);
            }

            return _.updateIn(state, keys, value, deep);
        },
    },
});

const getActions = _.memo((key: keyof typeof Actions, path) => {
    return transformActions(
        path,
        Actions[key],
        (call) => (state, action) => call(state, action.payload, path),
    );
});

export function createActions<S, K extends $.Path<S>>(state: S, key: K) {
    const t = getActionsType(_.get(state, key));
    return getActions(t, key);
}

/**
 * create default action for provided keys (any nesting level)
 * auto type-detection of each key
 */
export function createActionsForKeys<S, KS extends Array<string>, BS = $.ToJs<S>>(
    initialState: S,
    keys: KS,
) {
    const actions = (keys ?? []).reduce(
        (acc, k) => ({
            ...acc,
            ...createActions(initialState, k),
        }),
        {},
    );

    //@ts-ignore
    return actions as ManyReducerActionsMapper<BS, KS>;
}
