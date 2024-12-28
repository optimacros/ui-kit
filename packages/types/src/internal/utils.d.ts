import type * as TypeFest from 'type-fest';
import { Any, Object } from 'ts-toolbelt';
import type * as ImmutableTypes from './immutable';
import type * as Base from './base';

export type * from 'ts-toolbelt/out/Any/_api';
export type * from 'ts-toolbelt/out/Any/_Internal';

export type Prev = [
    never,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    ...0[],
];

export type Cons<H, T> = T extends readonly any[]
    ? ((h: H, ...t: T) => void) extends (...r: infer R) => void
        ? R
        : never
    : never;

export type UnionToIntersectionFn<T> = (T extends unknown ? (k: () => T) => void : never) extends (
    k: infer Intersection,
) => void
    ? Intersection
    : never;

/**
  * extracts fn parameters
  * @example
  * type T = enumUtil.GetUnionLast<(...args:[{
	a: string;
	b: number
}]) => any>
  */
export type GetUnionLast<T> = UnionToIntersectionFn<T> extends () => infer Last ? Last : never;

export type UnionToTuple<T, Tuple extends unknown[] = []> = [T] extends [never]
    ? Tuple
    : UnionToTuple<Exclude<T, GetUnionLast<T>>, [GetUnionLast<T>, ...Tuple]>;

export type CastToStringTuple<T> = T extends [string, ...string[]] ? T : never;

export type UnionToTupleString<T> = CastToStringTuple<UnionToTuple<T>>;

/** boolean from array of conditions */
export type And<T extends Array<1 | 0>> = [...T][number] extends 1 ? 1 : 0;

/** true if one is true */
export type Or<T extends Array<1 | 0>> = {
    [Value in [...T][number]]: Value;
}[1] extends 1
    ? 1
    : 0;

export namespace Maybe {
    export type Primitive<T> = T extends TypeFest.Primitive ? T : never;
    export type Undefined<T> = T extends undefined ? T : never;
    export type Number<T> = T extends number ? T : never;
    export type String<T> = T extends string ? T : never;
}

export namespace Is {
    export type Primitive<T> = Any.Is<T, TypeFest.Primitive>;

    export type StrictPrimitive<T> = Any.Is<T, Base.StrictPrimitive>;

    export type Undefined<T> = Any.Is<T, undefined>;

    export type Unknown<T> = unknown extends T ? 1 : 0;

    export type Nullish<T> = Any.Is<T, null, 'equals'>;

    export type NullishOrAny<T> = Or<[Nullish<T>, Any<T>]>;

    /** not nullish | any | never | undefined | unknown*/
    export type Defined<T> = Boolean.Not<
        Or<[Undefined<T>, Nullish<T>, Never<T>, Unknown<T>, Any<T>]>
    >;

    export type Any<T> = 0 extends 1 & T ? 1 : 0;

    export type Number<T> = Any.Is<T, number>;

    export type Boolean<T> = Any.Is<T, boolean>;

    export type String<T> = Any.Is<T, string>;

    export type Never<T> = [T] extends [never] ? 1 : 0;

    export type Null<T> = Any.Is<T, null>;

    export type ObjectLike<T> = Any.Is<T, object>;

    export type JsMap<T> = Any.Is<T, Map<any, any>>;

    export type JsSet<T> = Any.Is<T, Set<any>>;

    export type EmptyObject<T> = Any.Is<T, TypeFest.EmptyObject>;

    export type Tuple<T> = Any.Is<T, Array<any>>;
    /** Function */
    export type Fn<T> = Boolean.Or<
        Boolean.Or<Any.Is<T, Function>, Any.Is<T, () => any>>,
        Any.Is<T, (...args) => any>
    >;

    export type Object<T> = Boolean.And<
        Any.Is<T, Object.Object>,
        Boolean.And<Number.IsZero<Tuple<T>>, Number.IsZero<Fn<T>>>
    >;

    export type NotEmptyObject<T extends object> = Boolean.And<
        Object<T>,
        TypeFest.NonEmptyObject<T> extends true ? 0 : 1
    >;

    export type Equal<A, B> = Any.Equals<A, B>;

    export namespace Immutable {
        export type ArrayLike<T> = ImmutableTypes.IsArrayLike<T>;
        export type ObjectLike<T> = ImmutableTypes.IsObjectLike<T>;
    }
}

/** type like NonNullable, but for never */
export type NonNever<T> = NonNullable<If.Never<T, NonNullable<unknown>>>;

export namespace If {
    export type True<T, RT, TypeIfNot, TypeIf = false> = T extends 1
        ? TypeIf extends false
            ? RT
            : TypeIf
        : TypeIfNot;

    type GetIf<T, Condition extends number, TypeIfNot, TypeIf = false> = True<
        Condition,
        T,
        TypeIfNot,
        TypeIf
    >;

    export type Primitive<T, TypeIf = false, TypeIfNot = T> = GetIf<
        T,
        Is.Primitive<T>,
        TypeIfNot,
        TypeIf
    >;

    //if === any | never | null -> returns typeIf else T

    export type Any<T, TypeIf = false, TypeIfNot = T> = GetIf<T, Is.Any<T>, TypeIfNot, TypeIf>;
    export type Never<T, TypeIf = false, TypeIfNot = T> = GetIf<T, Is.Never<T>, TypeIfNot, TypeIf>;

    export type Null<T, TypeIf = false, TypeIfNot = T> = GetIf<T, Is.Null<T>, TypeIfNot, TypeIf>;

    export type Nullish<T, TypeIf = false, TypeIfNot = T> = GetIf<
        T,
        Is.Nullish<T>,
        TypeIfNot,
        TypeIf
    >;

    export type NullishOrAny<T, TypeIf = false, TypeIfNot = T> = GetIf<
        T,
        Is.NullishOrAny<T>,
        TypeIfNot,
        TypeIf
    >;

    export type Undefined<T, TypeIf = false, TypeIfNot = T> = GetIf<
        T,
        Is.Undefined<T>,
        TypeIfNot,
        TypeIf
    >;

    export type Unknown<T, TypeIf = false, TypeIfNot = T> = GetIf<
        T,
        Is.Unknown<T>,
        TypeIfNot,
        TypeIf
    >;
    /** */

    export type Number<T, TypeIfNot> = Is.Number<T> extends 1 ? T : TypeIfNot;

    export type String<T, TypeIfNot, TypeIf = false> = GetIf<T, Is.String<T>, TypeIfNot, TypeIf>;

    export type ObjectLike<T, TypeIfNot> = Is.ObjectLike<T> extends 1 ? T : TypeIfNot;

    export type EmptyObject<T, TypeIfNot> = Is.EmptyObject<T> extends 1 ? T : TypeIfNot;

    export type Tuple<T, TypeIfNot> = Is.Tuple<T> extends 1 ? T : TypeIfNot;

    export type Object<T, TypeIfNot, TypeIf = false> = GetIf<T, Is.Object<T>, TypeIfNot, TypeIf>;

    export type False<T, TypeIfNot, TypeIf = undefined> = T extends 0
        ? TypeIf extends undefined
            ? T
            : TypeIf
        : TypeIfNot;

    export type NotEmptyObject<T extends object, TypeIfNot> = Is.NotEmptyObject<T> extends 1
        ? T
        : TypeIfNot;
}

export type Leaves<T, D extends number = 10> = [D] extends [never]
    ? never
    : T extends object
      ? { [K in keyof T]-?: Cons<K, Leaves<T[K], Prev[D]>> }[keyof T]
      : [];

/** converting to array | object | function | primitive */
export type ToJs<T, IM = ImmutableTypes.FromImmutable<T>> = IM extends Set<infer V>
    ? Array<V>
    : IM extends Map<infer K, infer V>
      ? Record<K, V>
      : IM;
