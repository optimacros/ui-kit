import isObjectLike from 'lodash-es/isObjectLike';
import { isObject, mapEntries, mapValues } from 'radash';
import { isIndexed } from '../functions';

export function forEntriesIn<T extends Record<string, any>>(
    obj: T,
    iteratee: (k: string, v: any) => [string, any],
    /** whether to call iteratee on specific values */
    condition: (v) => boolean = (v) => true,
) {
    const iterate = (key, value) => {
        if (!condition(value)) {
            return [key, value];
        }

        if (isObject(value)) {
            return iteratee(key, mapEntries(value, iterate));
        }

        return iteratee(key, value);
    };

    return mapEntries(obj, iterate);
}

/** iterate through all properties */
export function forIn<T extends Record<string, any>>(
    obj: T,
    iteratee: (v: any, k: string, /** current path*/ keyPath?: Array<string>) => any,
    /** whether to call iteratee on specific values */
    condition: (v) => boolean = (v) => true,
) {
    const iterate = (value, key, path) => {
        if (isObjectLike(value)) {
            return iteratee(
                mapValues(value, (v, k) => iterate(v, k, path.concat(k))),
                key,
                path,
            );
        }

        if (!condition(value)) {
            return value;
        }

        return iteratee(value, key, path);
    };

    return mapValues(obj, (v, k) => iterate(v, k, [k]));
}

export function forObjectsIn<T extends Record<string, any>>(
    obj: T,
    iteratee: (v: object, k: string, /** current path*/ keyPath?: Array<string>) => any,
) {
    return forIn(obj, iteratee);
}

export function forIndexedIn<T extends Record<string, any>>(
    obj: T,
    iteratee: (v: object, k: string) => any,
) {
    return forIn(obj, iteratee, (v) => isIndexed(v));
}
