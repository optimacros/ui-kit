import * as $ from '@optimacros-ui/types';
import { getIn, merge as ImMerge, mergeDeep, setIn } from 'immutable';
import isString from 'lodash-es/isString';

import * as _ from 'radash';

/** an immutable merge method */
export function merge<T, Args extends Array<any>>(deep: boolean, collection: T, ...args: Args) {
    return deep ? mergeDeep(collection, ...args) : ImMerge(collection, ...args);
}

export function updateIn<T extends object>(
    state: T,
    paths: Array<$.Path<T>> | string[],
    updValue: Partial<T>,
    deep?: boolean,
) {
    const currValue = getIn(state, paths);

    const updated = merge(deep, currValue, updValue);

    return setIn(state, paths, updated);
}

export function getValue<T, Path extends $.Path<T>>(state: T, path: Path): $.PathValue<T, Path>;
export function getValue<T, Path extends Array<string>>(state: T, path: Path): any;
/**
 * get item by path string (not array)
 * array always re-creating on each re-render
 */
export function getValue<T, Path extends $.Path<T> | Array<string>>(state: T, path: Path) {
    if (isString(path)) {
        return getIn(state, path.split('.'));
    }
    return getIn(state, path);
}

export const changeCase = {
    camel<T extends Record<string, any>>(obj: T) {
        return _.mapEntries(obj, (key, value) => [
            _.camel(key as string),
            value,
        ]) as $.CamelCasedProperties<T>;
    },
    snake<T extends Record<string, any>>(obj: T) {
        return _.mapEntries(obj, (key, value) => [
            _.snake(key as string),
            value,
        ]) as $.SnakeCasedProperties<T>;
    },
    dash<T extends Record<string, any>>(obj: T) {
        return _.mapEntries(obj, (key, value) => [
            _.dash(key as string),
            value,
        ]) as $.DelimiterCasedProperties<T, '-'>;
    },
    pascal<T extends Record<string, any>>(obj: T) {
        return _.mapEntries(obj, (key, value) => [
            _.pascal(key as string),
            value,
        ]) as $.PascalCasedProperties<T>;
    },
} as const;

export function changePropCase<T extends $.NonNullableRecord, M extends keyof typeof changeCase>(
    obj: T,
    mode: M,
) {
    return changeCase[mode](obj);
}
/**
 *
 * renames all occurences of props with provided
 */
function renameAllProps<T, P extends Array<[string, string]>>(obj: T, replace: P) {
    let renameJson = JSON.stringify(obj);

    replace.forEach(([f, s]) => {
        const p1 = new RegExp(`"${f}":`, 'g');
        const p2 = `"${s}":`;
        renameJson = renameJson.replaceAll(p1, p2);
    });

    return JSON.parse(renameJson);
}
