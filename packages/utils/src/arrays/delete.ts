//@ts-nocheck
import * as $ from '@optimacros/ui-kit-types';
import { List } from 'immutable';
import { filterBy } from './filter';
import { toCollection } from './utils';

export type DeleteIndexedPayload<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
    Filters extends $.Tuple.Filters<Partial<Item>> = $.Tuple.Filters<Partial<Item>>,
> =
    | {
          /** @description removes items that satisfies conditions */
          filters?: Filters;
      }
    | {
          /** @description updates items that fits in parameters */
          parameters?: $.Tuple.ArrayMutationParameters;
      }
    | {
          /** @description removes items that satisfies predicate fn */
          predicate?: (v: Item) => boolean;
      }
    | {
          /** @description delete whole state */
          remove: (v: T) => T;
      };

export function deleteByParameters<T extends $.Tuple.Indexed.Type<any>>(
    arrayLike: T,
    parameters: $.Tuple.ArrayMutationParameters,
) {
    const { at, end, first, last, amount, start } = parameters;

    let list = toCollection(arrayLike);

    if (at) {
        list = list.filterNot((_, i) => at.some((idx) => idx === i));
    }

    /** remove `amount` of items from start */
    if (start && amount && !end) {
        list = list.skip(amount);
        /** remove `amount` of items from end */
    } else if (end && amount && !start) {
        list = list.skipLast(amount);
    }

    if (first) {
        list = list.shift();
    }

    if (last) {
        list = list.pop();
    }

    return list;
}

export type DeleteIndexedPayloadIntersection<T extends $.Tuple.Indexed.Type<any>> =
    $.UnionToIntersection<DeleteIndexedPayload<T>>;

export function deleteItems<T extends $.Tuple.Indexed.Type<any>>(
    arrayLike: T,
    payload: DeleteIndexedPayloadIntersection<T>,
): List<T> {
    const { filters, parameters, predicate, remove } = payload;

    const list = List(arrayLike);

    if (remove) {
        return List(remove(arrayLike));
    } else if (predicate) {
        return list.filterNot(predicate);
    } else if (filters) {
        const updated = filterBy(list, filters, true);

        return updated;
    } else if (parameters) {
        const updated = deleteByParameters(list, parameters);

        return updated;
    }

    return list;
}
