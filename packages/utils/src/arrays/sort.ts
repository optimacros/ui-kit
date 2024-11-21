import { List } from 'immutable';
import { compareValues, CompareValuesArgs } from '../functions';
import { uniqBy } from './uniq';
import * as $ from '@optimacros/ui-kit-types';

/**
 * @example sortBy([{ or: 2, a: 2 }], 'a:asc', 'a:desc');
 *
 */
export function sortBy<
    T extends $.Tuple.Indexed.Type<any>,
    K extends CompareValuesArgs<$.Tuple.Indexed.ItemOf<T>>,
    P extends K[number],
>(arrayLike: T, ...payload: Array<P>) {
    const list = List(arrayLike);
    const sorted = list.sort(compareValues(...payload));

    return sorted;
}

export function sortUniqBy<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T>,
    K extends CompareValuesArgs<Item>,
    P extends K[number],
>(arrayLike: T, by: keyof Item, ...payload: Array<P>) {
    const list = List(arrayLike);
    const sorted = sortBy(list, ...payload);
    //@ts-ignore
    return uniqBy(sorted, by);
}
