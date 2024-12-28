import type { Number, String } from 'ts-toolbelt/out';
import * as TypeFest from 'type-fest';
import { ImmutableArrayLike } from './immutable';
import * as Utils from './utils';

export type * from 'ts-toolbelt/out/List/_api';
export type {
    ArrayIndices as Indices,
    ArraySlice as Slice,
    ArraySplice as Splice,
    ArrayValues as Values,
} from 'type-fest';

export namespace Join {
    export type Dash<PT extends string[]> = String.Join<PT, '-'>;

    export type Pascal<PT extends string[]> = TypeFest.PascalCase<Dash<PT>>;

    export type Snake<PT extends string[]> = TypeFest.SnakeCase<Dash<PT>>;

    export type Camel<PT extends string[]> = TypeFest.CamelCase<Dash<PT>>;

    export type Kebab<PT extends string[]> = TypeFest.KebabCase<Dash<PT>>;

    export type Delimeter<PT extends string[], D extends string = '-'> = TypeFest.DelimiterCase<
        Dash<PT>,
        D
    >;

    export type Constant<PT extends string[]> = Uppercase<Snake<PT>>;
}
/**
 * just a tuple type
 *useful for
 *@example
 *   parts<P extends $.Tuple.Tuple<Part>>(...parts: P)
 * */
//@ts-ignore
export type Tuple<T extends NonNullable<unknown>> = [...Iterable<T>];

/**
 * Type which given a tuple type returns its own keys, i.e. only its indices.
 * @typeParam T - tuple type
 * @example
 * ```
 * TupleKeys<[number, string]> = '0' | '1'
 * ```
 */
export type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;

export type FiltersConfig<T> = {
    eq;
    ne;
    lt;
    lte;
    gt;
    gte;
    in;
    notIn;
    contains;
    notContains;
    containsi;
    notContainsi;
    null;
    notNull;
    between;
    startsWith;
    endsWith;
    and: Array<Filters<T>>;
    or: Array<Filters<T>>;
    not;
};

export type MappedFilters<T> = {
    [P in keyof T]: Partial<FiltersConfig<T>> | Array<Partial<FiltersConfig<T>>>;
};

export type Filters<T> = Utils.Is.Primitive<T> extends true ? FiltersConfig<T> : MappedFilters<T>;

export type ArrayMutationParameters = {
    /** `action` items at given indexes */
    at?: Array<number>;
    /** `action` all element after start if end isnt defined */
    start?: number;
    /** `action` start + amount elements (num of el's to be modified)*/
    amount?: number;
    /** `action` all elements before end if start isnt defined */
    end?: number;
    /** `action` last item */
    last?: boolean;
    /** `action` first item */
    first?: boolean;
};

/** map array values of each key as prop
 * @useCase
 * map aliases of same type
 */
export type MapValues<T extends Record<string, Array<string>>, V> = {
    [P in keyof T as `${T[P][number]}`]: V;
};

export namespace Indexed {
    export type Type<T> = Iterable<T> | ArrayLike<T>;

    /** type of collection item */
    export type ItemOf<C extends Type<any>> = C extends ImmutableArrayLike<infer T>
        ? T
        : C extends Array<infer T>
          ? T //@ts-ignore
          : C[number];

    /**
     * @example
     * type t = Array<'a:b' | 'c:d'>;
     * type t2 = $.Tuple.Indexed.UnionToTuple<t> = ["a:b", "c:d"]
     */
    //@ts-ignore
    export type UnionToTuple<T extends Type<any>> = Utils.UnionToTuple<T[number]>;
    /**
     * makes a tuple of array indexes
     *
     * [a, b, c] -> [0, 1, 2]
     */
    type ListIndexes<
        T extends Array<any>,
        R extends Array<any> = [],
        Index extends number = 0,
    > = T[Index] extends undefined ? R : ListIndexes<T, [...R, Index], Number.Add<Index, 1>>;
}
/**
 * pick by object property
 */
export type PickBy<T extends Array<any>, Prop, Value> = {
    [K in T[number]]: K[Prop] extends Value ? 1 : 0;
};
