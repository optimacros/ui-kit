import type { Number } from 'ts-toolbelt/out';
import type * as TypeFest from 'type-fest';
export type * from 'ts-toolbelt/out/String/_api';

/**
 * recursively replaces all pairs
 * @example
 * ManyReplaceAll<'{some:[];any:{of:""}}',[["some:", "replacedSome:"], ["any:", "replacedAny:"]]>;
 * @returns
 * "{replacedSome:[];replacedAny:{of:\"\"}}"
 * */
export type ManyReplaceAll<
    T extends string,
    P extends Array<[string, string]>,
    Index extends number = 0,
> = P[Index] extends undefined
    ? T
    : ManyReplaceAll<
          TypeFest.Replace<T, P[Index][0], P[Index][1], { all: true }>,
          P,
          Number.Add<Index, 1>
      >;
/**
 * pick strings by pattern
 * @example
 * $.String.Pick<keyof ThemeTypes.StyleObject, `color${string}`>;
 */
export type Pick<S extends string, Pattern extends string> = TypeFest.ValueOf<{
    [K in S]: K extends Pattern ? K : null;
}>;
