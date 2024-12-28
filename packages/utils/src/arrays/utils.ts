import { Collection, isIndexed, Range } from 'immutable';
import * as _ from 'radash';
import { isFalsey } from '../functions';
import { changeCase, getValue } from '../object';
import * as $ from '@optimacros-ui/types';

//TODO: provide types
type ToCollection<T extends $.Tuple.Indexed.Type<any>, Item> = T extends Collection.Indexed<any>
    ? T
    : Collection.Indexed<Item>;

export function toCollection<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
>(arrayLike: T) {
    const list = isIndexed(arrayLike) ? arrayLike : Collection.Indexed(arrayLike);

    return list as ToCollection<T, Item>;
}

export function maxBy<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
>(arrayLike: T, key: keyof Item): Item {
    const list = toCollection(arrayLike);

    return list.maxBy((item) => item[key]);
}

export function minBy<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
>(arrayLike: T, key: keyof Item): Item {
    const list = toCollection(arrayLike);

    return list.minBy((item) => item[key]);
}

export function toDictionary<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
>(arrayLike: T, getKey?: (item: Item) => string, getValue?: (item: Item) => Item) {
    const list = toCollection(arrayLike);

    return _.objectify(list.toArray(), getKey, getValue);
}

export function pickOne<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
>(arrayLike: T, compare: (a: Item, b: Item) => Item) {
    const list = toCollection(arrayLike);
    //@ts-ignore
    return list.reduce(compare) as Item;
}

export function groupBy<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T>,
    K extends keyof Item,
>(arrayLike: T, key: K) {
    const list = toCollection(arrayLike);

    return list.groupBy<K>((item) => item[key]);
}

export function partition<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
>(arrayLike: T, predicate: (v: Item) => boolean) {
    const list = toCollection(arrayLike) as Collection.Indexed<Item>;

    return list.partition(predicate);
}

export function chunk<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
>(arrayLike: T, size: number) {
    const list = toCollection(arrayLike);

    const chunks = Range(0, list.count(), size).map(
        (start) => list.slice(start, start + size) as ToCollection<T, Item>,
    );

    return chunks;
}

/** alias for {@link chunk} */
export const paginate = chunk;

export function swap<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
>(arrayLike: T, i1: number, i2: number) {
    const list = toCollection(arrayLike).slice();

    const firstItem = list[i1];
    list[i1] = list[i2];
    list[i2] = firstItem;

    return list as ToCollection<T, Item>;
}

export function omit<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T>,
    Keys extends Array<keyof Item>,
>(arrayLike: T, ...keys: Keys) {
    const list = toCollection(arrayLike);

    return list.map((v) => _.omit(v, keys));
}

export function pick<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T>,
    Keys extends Array<keyof Item>,
>(arrayLike: T, ...keys: Keys) {
    const list = toCollection(arrayLike);

    return list.map((v) => _.pick(v as Item, keys));
}

/** picks one property of each object */
export function pickPath<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T>,
    Path extends $.Path<Item>,
>(arrayLike: T, path: Path) {
    const list = toCollection(arrayLike);

    return list.map((v) => getValue(v, path));
}
/**
 * Flattens a deep object to a single dimension
 * @see https://radash-docs.vercel.app/docs/object/crush
 * */
export function crush<T extends $.Tuple.Indexed.Type<any>>(arrayLike: T) {
    const list = toCollection(arrayLike);

    return list.map(_.crush);
}

/**
 * Builds an object from key paths and values
 * opposite of {@link crush}
 */
export function construct<T extends $.Tuple.Indexed.Type<any>>(arrayLike: T) {
    const list = toCollection(arrayLike);

    return list.map(_.construct);
}

export function removeFalsey<T extends $.Tuple.Indexed.Type<any>>(arrayLike: T) {
    const list = toCollection(arrayLike);

    return list.filterNot(isFalsey);
}

/** Invert the keys and values of an object */
export function invert<T extends $.Tuple.Indexed.Type<any>>(arrayLike: T) {
    const list = toCollection(arrayLike);

    return list.map(_.invert);
}

/** Remove unwanted values from an object */
export function shake<T extends $.Tuple.Indexed.Type<any>, Item extends $.Tuple.Indexed.ItemOf<T>>(
    arrayLike: T,
    filter: (v: Item) => boolean,
) {
    const list = toCollection(arrayLike);

    return list.map((v) => _.shake(v, filter));
}

export function camelCase<T extends $.Tuple.Indexed.Type<any>>(arrayLike: T) {
    const list = toCollection(arrayLike);

    return list.map(changeCase.camel);
}

export function pascalCase<T extends $.Tuple.Indexed.Type<any>>(arrayLike: T) {
    const list = toCollection(arrayLike);

    return list.map(changeCase.pascal);
}

export function dashCase<T extends $.Tuple.Indexed.Type<any>>(arrayLike: T) {
    const list = toCollection(arrayLike);

    return list.map(changeCase.dash);
}

export function snakeCase<T extends $.Tuple.Indexed.Type<any>>(arrayLike: T) {
    const list = toCollection(arrayLike);

    return list.map(changeCase.snake);
}
