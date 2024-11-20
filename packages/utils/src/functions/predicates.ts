import * as I from 'immutable';
import {
    isArray,
    isEmpty,
    isFunction,
    isNil,
    isNull,
    isNumber,
    isObject,
    isUndefined,
} from 'lodash-es';

import { isPrimitive } from 'radash';

/**
 *
 * @param value - possible array || immutable indexed collection
 */

export function isIndexed(value) {
    return isArray(value) || I.isIndexed(value);
}
/**
 *
 * @param value - possible object || immutable keyed collection || immutable record
 */
export function isKeyed(value) {
    return (isObject(value) || I.isKeyed(value) || I.isRecord(value)) && !isFunction(value);
}

export function isFalsey(value) {
    return isNull(value) || isUndefined(value) || value === false;
}

/**
 * true if value is primitive && is defined
 * `number | boolean | string | symbol`
 */
export function isStrictPrimitive(value) {
    return isPrimitive(value) && !isNil(value);
}

export function isPrototype(value) {
    const Ctor = value && value.constructor;
    const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype;

    return value === proto;
}

export function notEmptyOrNull<T>(value: T) {
    return !isNil(value) && !isEmpty(value);
}

export function isNumberExists<T>(value: T) {
    return isNumber(value) && !isNaN(value);
}
