//@ts-nocheck
import {
    isKeyed,
    isList,
    isMap,
    isOrderedMap,
    isOrderedSet,
    isRecord,
    isSeq,
    isSet,
    isStack,
    List,
    Map,
    OrderedMap,
    OrderedSet,
    Range,
    Record as ImRecord,
    RecordOf,
    Repeat,
    Seq,
    Set,
    Stack,
} from 'immutable';
import * as $ from '@optimacros/ui-kit-types';

export const getImmutableConstructor = (value) => {
    if (isRecord(value)) return ImRecord;
    if (value instanceof Range) return Range;
    if (value instanceof Repeat) return Repeat;
    if (isOrderedMap(value)) return OrderedMap;
    if (isMap(value)) return Map;
    if (isList(value)) return List;
    if (isOrderedSet(value)) return OrderedSet;
    if (isSet(value)) return Set;
    if (isSeq(value)) return Seq;
    if (isStack(value)) return Stack;

    //   console.error("no immutable constructor found", value);

    return undefined;
};

export const getKeyedCollectionConstructor = (value) => {
    if (!isKeyed(value)) {
        console.error('no immutable constructor found', value);
        return undefined;
    }

    if (isRecord(value)) return ImRecord;
    if (isOrderedMap(value)) return OrderedMap;
    if (isMap(value)) return Map;
    if (isSeq(value)) return Seq;

    console.error('no immutable constructor found', value);

    return undefined;
};

export type ImmutableFrom<T, V> = T extends RecordOf<any>
    ? RecordOf<V>
    : T extends Map<string, any>
      ? Map<string, any>
      : T extends OrderedMap<any, any>
        ? OrderedMap<keyof V, $.ValueOf<V>>
        : T extends Seq.Keyed<any, any>
          ? Seq.Keyed<keyof V, $.ValueOf<V>>
          : T extends Seq.Indexed<any>
            ? Seq.Indexed<V[number]>
            : T extends Seq.Set<any>
              ? Seq.Set<V[number]>
              : T extends Set<any>
                ? Set<V[number]>
                : T extends OrderedSet<any>
                  ? OrderedSet<V[number]>
                  : T extends List<any>
                    ? List<V[number]>
                    : T extends Stack<any>
                      ? Stack<V[number]>
                      : V;

/**
 *
 * creates `value`
 * based on `possibleImmutable` type
 * if `possible immutable` is not immutable
 * returns `value`
 */
export function createImmutableInstance<T, V>(possibleImmutable: T, value: V): ImmutableFrom<T, V> {
    const createInstance = getImmutableConstructor(possibleImmutable);

    if (isRecord(createInstance)) {
        return ImRecord(value)();
    }
    //@ts-ignore
    return createInstance ? createInstance(value) : value;
}
