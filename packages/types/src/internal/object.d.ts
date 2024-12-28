import type { A, Object } from 'ts-toolbelt';
import type { Match } from 'ts-toolbelt/out/Any/_Internal';
import type * as TypeFest from 'type-fest';
import { Join } from './tuple';
import { Cons, GetUnionLast, Is, Prev, UnionToTuple } from './utils';
export type * from 'ts-toolbelt/out/Object/_api';

export namespace Exclude {
    /** exclude all fields where values = never */
    export type Never<T extends object> = Object.Filter<T, never, 'equals'>;

    /**
     * @example
     *   type WithoutNumbers = Object.Exclude.OfType<{iam: string; biam: number}, number, 'equals'>;
     */
    export type OfType<
        T extends Record<string, any>,
        KT,
        match extends Match = 'default',
    > = Object.Filter<T, KT, match>;

    export type NonNullable<T extends Record<string, any>> = Object.Filter<
        {
            [K in keyof T]: Is.EmptyObject<T[K]> extends 1 ? 'remove' : T[K];
        },
        'remove',
        'equals'
    >;
}

export type MergeShapes<U, V> = {
    [k in Exclude<keyof U, keyof V>]: U[k];
} & V;

export type KeysUnion<T, D extends number = 10> = [D] extends [never]
    ? never
    : T extends object
      ? {
            [K in keyof T]-?:
                | K
                | (KeysUnion<T[K], Prev[D]> extends infer P
                      ? P extends []
                          ? never
                          : Cons<K, P>
                      : never);
        }[keyof T]
      : [];

export type ValuesUnion<T, D extends number = 10> = [D] extends [never]
    ? never
    : T extends object
      ? {
            [K in keyof T]-?:
                | T[K]
                | (ValuesUnion<T[K], Prev[D]> extends infer P
                      ? P extends []
                          ? never
                          : Cons<K, P>
                      : never);
        }[keyof T]
      : [];

export type Values<T> = UnionToTuple<ValuesUnion<T>>;

export type Keys<T> = UnionToTuple<KeysUnion<T>>;

/** creates an object from object prop values
 * @example
 * ExtractValues<{
 * 	test: {
 * 		nested: string
 * 	},
 * 	test2: {
 * 		nested2: string
 * 	}
 * }> = {
 * 	nested:string;
 * 	nested2:string;
 * }
 */
export type ValuesToObject<T extends Record<string, {}>> = TypeFest.UnionToIntersection<
    TypeFest.ValueOf<Object.Required<T>>
>;

/**
		   * @example
		   * type T = ExtractParametersFromRecordValues<{
		  some: (args: [number, string]) => void;
		  or: number;
		}>;
		   */
export type ExtractArgsValues<T> = {
    [P in keyof T]: T[P] extends (...arg: infer A) => any ? A : any;
};

export type AddProp<A, N, V> = {
    //@ts-ignore
    [K in keyof A | N]?: K extends keyof A & N
        ? V
        : K extends keyof A
          ? A[K]
          : K extends N
            ? V
            : never;
};

export type MergeReplaceProps<E extends object, T extends object> = Object.Exclude<E, T> & T;

/** allows to pick (and save prop options)
 * @description saves A props, removes B props that are in A
 */
export type SafePickProps<A, B> = Pick<B, Exclude<keyof B, keyof A>> & A;

/**
 * @description concat keys and sub keys of record
 * @example
 * type ApiName<T extends IApi> = $.ConcatPropsWith<T, '::'>;
 * @returns 'api::name' | 'api::name'
 */
export type JoinPropsWith<T extends Record<string, any>, Separator extends string> = {
    //@ts-ignore
    [K in keyof T]: Join.Delimeter<[K, keyof T[K]], Separator>;
}[keyof T];

export namespace Params {
    /**
	* only for adding new arguments, return is the same
   * @example
   * ExtendFnArgsWithRecord<
        uws.WebSocketBehavior<UserData>['open'],
        {some: string, a:number, c:WsController<any>}
      >;
   */

    type ExtendWithRecord<T extends (...args) => any, Params extends Record<string, any>> = (
        ...args: [...Parameters<T>, ...Values<Params>]
    ) => ReturnType<T>;
    /**
	 * @example
	 * ExtendFnArgsWithArray<
		  uws.WebSocketBehavior<UserData>['open'],
		  [string, number, WsController<any>]
		>;
	 */
    type ExtendWithArray<T extends (...args) => any, Params extends Array<any>> = (
        ...args: [...Parameters<T>, ...Params]
    ) => ReturnType<T>;

    /**
	 * adding new parameters to each method in T
	 * @prop T - record
	 * @prop EXK - exclude keys
	 * @example
	 * type ExtendedWsOptions<UserData> = $.ExtendEachParamsWithArray<
				Partial<uws.WebSocketBehavior<UserData>>,
				['open', 'close', 'message', 'drain', 'dropped'],
				[WsController<UserData>]
		  >;
	 */
    type ExtendEachWithArray<T, EXK extends Array<keyof T>, Params extends Array<any>> = Omit<
        T,
        EXK[number]
    > & {
        //@ts-ignore
        [K in EXK[number]]: ExtendWithArray<T[K], Params>;
    };

    type RecordToParameters<T extends Record<string, any>> = GetUnionLast<
        (...args: ValuesToObject<T>) => any
    >;
}

export type FilterKeysOf<
    O extends Record<string, Record<string, NonNullable<unknown>>>,
    Key extends keyof O[keyof O],
    Equals,
    match extends Match = 'default',
> = Pick<
    O,
    //@ts-ignore
    keyof Exclude.OfType<
        {
            [K in keyof O]: A.Is<O[K][Key], Equals, match>;
        },
        0,
        'equals'
    >
>;
/** filter keys only of type */
export type KeysOfType<
    O extends Record<string, Record<string, NonNullable<unknown>>>,
    Key extends keyof O[keyof O],
    Equals,
    match extends Match = 'default',
> = Exclude.OfType<
    {
        [K in keyof O]: A.Is<O[K][Key], Equals, match>;
    },
    0,
    'equals'
>;
/**
 * creates a new object by property key
 *
 * ! use-case
 * @example
 * type merged = Typed.Merge<T, ByKey<M, 'name'>>
 * merged = {
 * 	...T,
 * 	[M['name']]: M
 * }
 */
export type ByKey<
    T extends Record<string, NonNullable<unknown>>,
    K extends keyof T,
    //@ts-ignore
> = { [N in T[K]]: T };

type RenamePropsMode = 'prepend' | 'append';

export type RenameProps<
    T extends Record<string, NonNullable<unknown>>,
    V extends string,
    Mode extends RenamePropsMode = 'append',
> = Mode extends 'append'
    ? {
          [K in keyof T as `${K & string}${V}`]: T[K];
      }
    : {
          [K in keyof T as `${V}${K & string}`]: T[K];
      };

export type ToTuple<T> = UnionToTuple<TypeFest.ValueOf<T>>;
/** construct object from args */
export type FromArgs<T extends (...args) => any, P = Parameters<T>> = {
    [K in keyof P]: P[K];
};
