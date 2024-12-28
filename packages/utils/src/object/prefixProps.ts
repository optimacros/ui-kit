import { RenameProps, RenameValues } from './types';
import * as $ from '@optimacros-ui/types';

export function prefixProps<T extends Record<string, any>, P extends string>({
    obj,
    prefix,
    revert,
}: {
    obj: T;
    prefix: P;
    revert: boolean;
}): RenameValues<P, T>;

export function prefixProps<T extends Record<string, any>, P extends string>({
    obj,
    prefix,
    revert,
}: {
    obj: T;
    prefix: P;
    /**swap order of key-prefix */
    revert?: boolean;
}) {
    let prefixed: RenameValues<P, T> | RenameProps<P, T>;
    if (revert) {
        prefixed = Object.keys(obj).reduce(
            (acc, key) => {
                //@ts-ignore
                acc[key] = `${prefix}${obj[key]}`;
                return acc;
            },
            {} as RenameValues<P, T>,
        );
    } else {
        prefixed = Object.keys(obj).reduce(
            (acc, key) => {
                //@ts-ignore
                acc[`${prefix}${key}`] = acc[key];
                return acc;
            },
            {} as RenameProps<P, T>,
        );
    }

    //   const prefixedUnprefixedMap = Object.keys(prefixed).reduce((acc, key) => {
    //     acc[prefixed[key]] = obj[key];
    //     return acc;
    //   }, {} as Record<ValueOf<typeof>, ValueOf<typeof obj>>);

    return prefixed;
}

export function prefixUnPrefixMap<P extends Record<any, any>, U extends Record<any, any>>(
    prefixedObject: P,
    unPrefixedObject: U,
) {
    const result = Object.keys(prefixedObject).reduce(
        (acc, key) => {
            acc[prefixedObject[key]] = unPrefixedObject[key];
            return acc;
        },
        {} as Record<$.ValueOf<P>, $.ValueOf<U>>,
    );
    return result;
}

/**
 * `helps to determine which action calls method`
 *  returns
 * {
 * 	[{prefix}{methodKey}]: methodKey
 * }
 */
export function actionToMethod<E extends Record<string, string>, P extends string>(
    prefix: P,
    enumMap: E,
) {
    const result = Object.values(enumMap).reduce((acc, key) => {
        //@ts-ignore
        acc[`${prefix}${key}`] = key;
        return acc;
    }, {});
    return result;
}
