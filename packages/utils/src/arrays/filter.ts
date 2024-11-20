import { List } from 'immutable';
import { isPrimitive } from 'radash';
import { filter } from '../functions';
import * as $ from '@optimacros/ui-kit-types';

function satisfiesFilterPrimitiveConditions<
    T extends $.Primitive,
    Filters extends $.Tuple.Filters<any>,
>(item: T, payload: Filters) {
    const filterKeys = Object.keys(payload);

    let flag = true;

    filterKeys.forEach((filterKey) => {
        if (!filter[filterKey](item, payload[filterKey]) as boolean) {
            flag = false;
            return;
        }
    });

    return flag;
}

export function satisfiesFilterConditions<
    T,
    Filters extends $.Tuple.Filters<T> = $.Tuple.Filters<T>,
>(item: T, payload: Filters) {
    if (isPrimitive(item)) {
        return satisfiesFilterPrimitiveConditions(item as $.Primitive, payload);
    } else {
        const filters = Object.keys(payload);

        let flag = true;

        filters.forEach((itemKey) => {
            Object.keys(payload[itemKey]).forEach((filterKey) => {
                /** check every prop on filter conditions */
                if (!filter[filterKey](item[itemKey], payload[itemKey][filterKey])) {
                    flag = false;
                    return;
                }
            });
        });

        return flag;
    }
}

export function filterBy<
    T extends $.Tuple.Indexed.Type<any>,
    Item extends $.Tuple.Indexed.ItemOf<T> = $.Tuple.Indexed.ItemOf<T>,
    Filters extends $.Tuple.Filters<Partial<Item>> = $.Tuple.Filters<Partial<Item>>,
>(
    arrayLike: T,
    payload: Filters,
    /** if set to true -> returns ONLY items that are NOT staisfy conditions*/
    filterNot?: boolean,
): List<Item> {
    const list = List(arrayLike);

    return filterNot
        ? list.filterNot((item) => satisfiesFilterConditions(item, payload))
        : list.filter((item) => satisfiesFilterConditions(item, payload));
}
