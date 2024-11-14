import { Map, Set } from 'immutable';

export function pick<
    M extends Map<any, any>,
    K extends Array<string>,
    R = M extends Map<infer MK, infer MV> ? Map<K[number], MV> : unknown,
>(map: M, ...keys: K) {
    const keySet = Set(keys).toMap();

    const pickedMap = keySet.map(function (key) {
        return map.get(key);
    });

    return pickedMap as R;
}

export function omit<
    M extends Map<any, any>,
    K extends Array<string>,
    R = M extends Map<infer MK, infer MV>
        ? Map<keyof Omit<Record<MK & string, any>, K[number]>, MV>
        : unknown,
>(map: M, ...keys: K) {
    const omitKeys = map
        .keySeq()
        .filterNot((k) => keys.includes(k))
        .toArray();

    const resultMap = pick(map, ...omitKeys);

    return resultMap as R;
}
