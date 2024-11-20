import isObject from 'lodash-es/isObject';
import { mapValues } from 'radash';
import { merge } from './utils';

export function flattenByProp(obj: Record<any, any>, prop: string) {
    const result = {};
    const iterate = (object: Record<any, any>) => {
        if (object?.[prop]?.length > 0) {
            object[prop].forEach((child) => {
                result[child.id] = child;
                iterate(child);
            });
        }
    };
    iterate(obj);
    return result;
}
export function flattenChildByProp(arr: Array<Record<any, any>>, prop: string) {
    const result = [];
    const iterate = (object: Record<any, any>) => {
        result.push(object);
        if (object?.[prop]?.length > 0) {
            object[prop].forEach((child) => {
                result.push(child);
                iterate(child);
            });
        }
    };
    arr.forEach((obj) => iterate(obj));
    return result;
}
export function flattenArrayByProp(arrayToFlat: Array<Record<any, any>>, prop: string) {
    let result = {};

    arrayToFlat.forEach((obj) => {
        result = { ...result, ...flattenByProp(obj, prop) };
    });

    return result;
}

const flattenObject = (
    obj: Record<any, any>,
    parentKey: string,
    current: number,
    level: number,
    propertyKey = (p: string, k: string) => `${p}.${k}`,
) => {
    if (current >= level) {
        return { [parentKey]: obj };
    }

    let result = {};

    Object.keys(obj).forEach((key) => {
        const value = obj[key];

        const _key = propertyKey(parentKey, key);
        if (isObject(value)) {
            current++;

            result = {
                ...result,
                ...flattenObject(value, _key, current, level, propertyKey),
            };
        } else {
            result[_key] = value;
        }
    });

    return result;
};

/** flattens object by nesting level */
export function flatObject(
    obj: Record<any, any>,
    /** level deep */
    level?: number,
    propertyKey = (p: string, k: string) => `${p}.${k}`,
) {
    const result = merge(
        false,
        {},
        ...Object.values(
            mapValues(obj, (v, k) => {
                return flattenObject(v, k, 0, level, propertyKey);
            }),
        ),
    );

    return result;
}
