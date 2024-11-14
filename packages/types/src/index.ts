import * as TP from './internal';
export type * from './internal';

type NoPayload = { nopayload: true };
export interface Constructable<T> {
    new (...args: any): T;
}

export interface ConstructableArgs<A> {
    //@ts-ignore
    new (...args: A): any;
}

export type Noop = () => void;

export type ComponentNameFromString<N extends string, S extends string> = TP.Tuple.Join.Pascal<
    TP.String.Split<N, S>
>;

export type DoubleNested<T> = {
    [K in keyof T]: Pick<T, K>;
};

export type MapRecordArrayValues<T extends Record<string, Array<any>>> = {
    [K in keyof T]: T[K][number];
};

type TransformReduxActions<T extends Record<string, any>> = {
    [K in keyof T]: ReturnType<TP.ValueOf<T[K]>>;
};
