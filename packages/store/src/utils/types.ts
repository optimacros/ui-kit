import * as $ from '@optimacros-ui/types';
import { type IndexedUtils } from '@optimacros-ui/utils';
type NoPayload = {
    ok?: true;
};

export enum PrimitiveActionsEnum {
    SET = 'set',
    UNSET = 'unset',
}

export enum ActionsEnum {
    UPDATE = 'update',
    SET = 'set',
    UNSET = 'unset',
    CLEAR = 'clear',
    ADD = 'add',
    DELETE = 'delete',
    SET_IN = 'setIn',
    UPDATE_IN = 'updateIn',
    TOGGLE = 'toggle',
}

export enum ActionsType {
    INDEXED = 'indexed',
    KEYED = 'keyed',
    BOOLEAN = 'boolean',
    PRIMITIVE = 'primitive',
}
export type ActionProvider<S = NonNullable<unknown>, A = NonNullable<unknown>> = (
    state: S,
    action: A,
    path: string,
) => S;

export type MapActions<State, Actions extends Partial<Record<ActionsEnum, any>>> = {
    [K in keyof Actions]: ActionProvider<State, Actions[K]>;
};

export type TPrimitiveActions<T = NonNullable<unknown>> = {
    [ActionsEnum.SET]: T;
    [ActionsEnum.CLEAR]: NoPayload;
};
export type TBooleanActions<T extends boolean = boolean> = TPrimitiveActions<T> & {
    [ActionsEnum.TOGGLE]: NoPayload;
};

export type TArrayActions<T extends Array<any> = Array<any>> = TPrimitiveActions<T> & {
    [ActionsEnum.ADD]: IndexedUtils.AddIndexedPayload<T>;
    [ActionsEnum.UPDATE]: IndexedUtils.UpdateIndexedPayload<T>;
    [ActionsEnum.DELETE]: IndexedUtils.DeleteIndexedPayload<T>;
};

export type SetInRecordPayload<
    T = NonNullable<unknown>,
    Path extends $.Path<T> = $.Path<T>,
    PathValue = $.PathValue<T, Path>,
> = {
    path: Path;
    value: PathValue;
};

export type UpdateRecordPayload<
    T = NonNullable<unknown>,
    Path extends string = string,
    //@ts-ignore
    PathValue = $.PathValue<T, Path>,
> = { deep?: boolean; value: Partial<PathValue> };

export type TRecordActions<
    T = NonNullable<unknown>,
    Path extends $.Path<T> = $.Path<T>,
    PathValue = $.PathValue<T, Path>,
> = TPrimitiveActions<T> & {
    [ActionsEnum.UPDATE]: { deep?: boolean; value: Partial<T> };
    /**
     * @description sets value in prop
     * @param1 - path to prop
     * @param2 - set value
     */
    // TODO: add auto type detection by path
    [ActionsEnum.SET_IN]: {
        path: Path;
        value: PathValue;
    };
    /**
     * @description sets value in prop
     * @param1 - path to prop
     * @param2 - update value
     */
    // TODO: add auto type detection by path
    [ActionsEnum.UPDATE_IN]: {
        path: Path;
        value: Partial<PathValue>;
        deep?: boolean;
    };
};

export type ActionType<T> = $.Is.Tuple<T> extends 1
    ? //@ts-ignore
      TArrayActions<T>
    : $.Is.Object<T> extends 1
      ? TRecordActions<T>
      : $.Is.Boolean<T> extends 1
        ? //@ts-ignore
          TBooleanActions<T>
        : TPrimitiveActions<T>;

export type ActionsMap<
    Actions extends $.PartialRecord<ActionsEnum, any> = $.PartialRecord<ActionsEnum, any>,
    Name extends string = string,
    Normalized extends string = $.PascalCase<$.String.Replace<Name, '.', '-'>>,
> = {
    [K in keyof Actions as `${K & string}${Normalized}`]: (payload: Actions[K]) => unknown;
};

export type CreateNoopActionsPayload = Record<string, Record<string, any>>;

type ActionDefinition<T> = Record<keyof T, ActionProvider<any, any>>;

export type ActionTypeMap = {
    [ActionsType.BOOLEAN]: ActionDefinition<TBooleanActions>;
    [ActionsType.INDEXED]: ActionDefinition<TArrayActions>;
    [ActionsType.PRIMITIVE]: ActionDefinition<TPrimitiveActions>;
    [ActionsType.KEYED]: ActionDefinition<TRecordActions>;
};

export type NoopActionsMap<T extends Record<string, any>> = {
    [K in keyof T]: (payload: T[K]) => any;
};

export type NoopActionsMapper<T extends CreateNoopActionsPayload> = $.Object.ValuesToObject<{
    [K in keyof T]: NoopActionsMap<T[K]>;
}>;
