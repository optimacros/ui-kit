import type {
    Collection,
    List,
    Map,
    OrderedMap,
    OrderedSet,
    Record as _Record,
    Seq,
    Set,
    Stack,
} from 'immutable';
import type { IMSTArray, IMSTMap } from 'mobx-state-tree';
import { ValuesUnion } from './object';
import type { Is } from './utils';
/** get type from immutable type */
export type FromMobx<T> = Is.StrictPrimitive<T> extends 1
    ? T
    : Is.Fn<T> extends 1
      ? T
      : T extends IMSTMap<infer VI>
        ? Record<string, VI>
        : T extends IMSTArray<infer VI>
          ? Array<VI>
          : T;

export type FromImmutable<T> = Is.StrictPrimitive<T> extends 1
    ? T
    : Is.Fn<T> extends 1
      ? T
      : T extends
              | Collection.Indexed<infer VI>
              | Collection.Set<infer VI>
              | List<infer VI>
              | Stack<infer VI>
              | Seq.Indexed<infer VI>
              | Seq.Set<infer VI>
              | Set<infer VI>
              | OrderedSet<infer VI>
        ? Array<VI>
        : T extends _Record<infer V>
          ? ReturnType<T['toObject']>
          : T extends
                  | Collection.Keyed<infer K, infer VK>
                  | OrderedMap<infer K, infer VK>
                  | Map<infer K, infer VK>
                  | Seq.Keyed<infer K, infer VK>
            ? Record<K & string, VK>
            : T;

export type ImmutableArrayLike<T = unknown> =
    | Collection.Indexed<T>
    | Collection.Set<T>
    | List<T>
    | Stack<T>
    | Seq.Indexed<T>
    | Seq.Set<T>
    | Set<T>
    | OrderedSet<T>;

export type IsArrayLike<T> = T extends ImmutableArrayLike ? 1 : 0;

export type ImmutableObjectLike =
    | Collection.Keyed<any, any>
    | OrderedMap<any, any>
    | _Record<any>
    | Map<any, any>
    | Seq.Keyed<any, any>;

export type IsObjectLike<T> = T extends ImmutableObjectLike ? 1 : 0;

export type MapFromObject<T> = [
    ValuesUnion<{
        [K in keyof T]: [K, T[K]];
    }>,
];
