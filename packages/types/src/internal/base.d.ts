export type StrictPrimitive = string | number | bigint | boolean | symbol;

export type Nullish = null | undefined;

export type JsMap<T> = Map<keyof T, T[keyof T]>;

export type As<T, as> = Extract<T, as>;

export type NonNullableRecord = Record<string, NonNullable<unknown>>;

export type PartialRecord<Keys, V> = {
    [Property in Keys]?: V;
};
