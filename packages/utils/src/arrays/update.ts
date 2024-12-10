import { List } from 'immutable';
import { merge } from '../object';
import { satisfiesFilterConditions } from './filter';
import * as $ from '@optimacros-ui/types';

type DataPayload<Item> = {
    /** data to update */
    data: Partial<Item>;

    /** use merge | mergeDeep*/
    deep?: boolean;
};

export type UpdateIndexedPayload<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
    Filters extends $.Tuple.Filters<Partial<Item>> = $.Tuple.Filters<Partial<Item>>,
    Data = DataPayload<Item>,
> =
    | (Data & {
          /** @description updates items that fits in condition */
          filters?: Filters;
      })
    | (Data & {
          /** @description updates items that fits in parameters */
          parameters?: $.Tuple.ArrayMutationParameters;
      })
    | (Data & {
          /** @description updates items that satisfies predicate fn */
          predicate?: (v: Item) => boolean;
      })
    | {
          /** @description updates by each item */
          updater: (v: Item) => Item;
      }
    | {
          /** @description update whole state */
          update: (v: T) => T;
      };

export type UpdateIndexedPayloadIntersection<T extends $.Tuple.Indexed.Type<any>> =
    $.UnionToIntersection<UpdateIndexedPayload<T>>;

export function updateByParameters<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
>(
    arrayLike: T,
    payload: {
        parameters: $.Tuple.ArrayMutationParameters;
        data: Partial<Item>;
        deep?: boolean;
    },
) {
    const { at, end, first, last, amount, start } = payload.parameters;

    const { data, deep } = payload;

    let list = List(arrayLike);

    if (at) {
        list = list.map((item, i) => {
            if (at.some((idx) => idx === i)) {
                return merge(deep, item, data);
            }
            return item;
        });
    }

    /** update `amount` of items from start */
    if (start && amount && !end) {
        const updatedItems = list.take(amount).map((item) => merge(deep, item, data));

        list = list.splice(start, amount, updatedItems);

        /** update `amount` of items from end */
    } else if (end && amount && !start) {
        const updatedItems = list.takeLast(amount).map((item) => merge(deep, item, data));

        list = list.splice(end - amount, amount, updatedItems);
    }

    if (first) {
        list = list.update(0, (item) => merge(deep, item, data));
    }

    if (last) {
        list = list.update(-1, (item) => merge(deep, item, data));
    }

    return list;
}

export function update<T extends $.Tuple.Indexed.Type<any>>(
    arrayLike: T,
    payload: UpdateIndexedPayloadIntersection<T>,
): List<T> {
    const { data, deep, filters, parameters, predicate, update, updater } = payload;

    const list = List(arrayLike);

    if (update) {
        return List(update(arrayLike));
    } else if (updater) {
        return list.map(updater);
    } else if (data && predicate) {
        return list.map((item) => {
            if (predicate(item)) {
                return merge(deep, item, data);
            }
            return item;
        });
    } else if (data && filters) {
        const updatedItems = list.map((item) => {
            const needToUpdate = satisfiesFilterConditions(item, filters);

            return needToUpdate ? merge(deep, item, data) : item;
        });

        return updatedItems;
    } else if (data && parameters) {
        const updated = updateByParameters(list, {
            data,
            parameters,
            deep,
        });

        return updated;
    }

    return list;
}
