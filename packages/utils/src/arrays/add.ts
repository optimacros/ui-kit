import { List } from 'immutable';
import { uniq, uniqBy as uqBy } from './uniq';
import * as $ from '@optimacros/ui-kit-types';

export type AddIndexedPayload<T extends $.Tuple.Indexed.Type<any>> = {
    /**
     * @description if specified won't add not unique values
     */
    uniqBy?: keyof $.Tuple.Indexed.ItemOf<T>;

    /** items to add */
    data: T;

    /** adds items before | after index */
    at?: number;

    /**
     * if {@link index} is not specified adds to start
     * else adds before that index
     * @default 'end'
     */
    before?: boolean;

    uniq?: boolean;
};

export type AddIndexedPayloadIntersection<T extends $.Tuple.Indexed.Type<any>> =
    $.UnionToIntersection<AddIndexedPayload<T>>;

export function add<T extends $.Tuple.Indexed.Type<any>>(
    arrayLike: T,
    payload: AddIndexedPayloadIntersection<Array<any>>,
): List<T> {
    const { data, at, before, uniqBy, uniq: isUniq } = payload;

    let list = List(arrayLike);

    if (at && before) {
        list = list.splice(at - data.length, 0, ...data);
    } else if (at) {
        list = list.splice(at, 0, ...data);
    } else {
        list = list.push(...data);
    }

    if (uniqBy) {
        //@ts-ignore
        return uqBy(list, uniqBy);
    } else {
        //@ts-ignore
        return isUniq ? uniq(list) : list;
    }
}
