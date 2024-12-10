import { Set } from 'immutable';
import { getValue } from '../object';
import { toCollection } from './utils';
import * as $ from '@optimacros-ui/types';

/**
 *
 * @param arrayLike
 * @param path - path of uniq value
 * @returns
 */
export function uniqBy<
    T extends $.Tuple.Indexed.Type<any>,
    Path extends $.Path<$.Tuple.Indexed.ItemOf<T>>,
>(arrayLike: T, path: Path) {
    const list = toCollection(arrayLike);

    return list.filter(
        (item, i, l) =>
            l.findIndex((fItem) => getValue(fItem, path) === getValue(item, path)) === i,
    );
}

export function uniq<T extends $.Tuple.Indexed.Type<any>, Item extends $.Tuple.Indexed.ItemOf<T>>(
    arrayLike: T,
) {
    const list = toCollection(arrayLike);

    return list.toSet() as Set<Item>;
}
