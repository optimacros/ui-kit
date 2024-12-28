import {
    isBoolean,
    isFunction,
    isIndexed,
    isKeyed,
    isPlainObject,
    isStrictPrimitive,
    mapEntries,
    mapValues,
    memo,
    upperFirst,
} from '@optimacros-ui/utils';
import { ActionsType, ActionTypeMap, CreateNoopActionsPayload, NoopActionsMap } from './types';

export function getActionsType(value) {
    if (isIndexed(value)) {
        return ActionsType.INDEXED;
    } else if (isKeyed(value)) {
        return ActionsType.KEYED;
    } else if (isBoolean(value)) {
        return ActionsType.BOOLEAN;
    } else if (isStrictPrimitive(value) || isFunction(value)) {
        return ActionsType.PRIMITIVE;
    }

    throw new Error(`provided invalid type ${JSON.stringify(value)}`);
}

export function defineActions(actions: ActionTypeMap) {
    return actions;
}

const noopAction = (payload) => {
    return;
};

export function createNoopActions<T extends CreateNoopActionsPayload>(actions: T) {
    return mapValues(actions, () => noopAction) as NoopActionsMap<T>;
}

export type PayloadAction<T extends string = string, P = void> = {
    payload?: P;
    type: T;
};

function isAction(action: any): action is PayloadAction {
    return isPlainObject(action) && 'type' in action && typeof action.type === 'string';
}

export const createAction = <T extends string, P>(type: T, payload?: P): PayloadAction<T, P> => {
    return {
        payload,
        type,
    };
};
export interface ActionCreatorBase<T extends string = string, P = NonNullable<unknown>> {
    (payload: P): PayloadAction<T, P>;
    type: T;
}

export interface ActionCreator<T extends string = string, P = { ok?: true }> {
    (payload?: P): PayloadAction<T, P>;
    type: T;
    match: (action: unknown) => action is PayloadAction<T, P>;
    toString: () => string;
}

/**
 * creates a memoized action creator (caching all created ones)
 */
export const createActionCreator = memo(<T extends string>(type: T) => {
    const action = (payload) => createAction(type, payload);
    action.match = (action) => isAction(action) && action.type === type;
    action.type = type;
    action.toString = () => `${type}`;
    return action as ActionCreator<T>;
});

export function transformActions<Actions, Mapper extends (action: Actions[keyof Actions]) => any>(
    path,
    actions: Actions,
    mapper: Mapper,
) {
    const field = path
        .split('.')
        .map((s) => upperFirst(s))
        .join('');

    return mapEntries(actions, (k, action) => {
        return [`${k}${field}`, mapper(action)];
    }) as Record<string, ReturnType<Mapper>>;
}
