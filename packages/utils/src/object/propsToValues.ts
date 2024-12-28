//@ts-nocheck
import { PropsToValues } from './types';

export function propsToValues<T extends Record<string, string>>(obj: T) {
    const result = Object.keys(obj).reduce(
        (acc, key) => {
            acc[obj[key]] = key;
            return acc;
        },
        {} as PropsToValues<T>,
    );

    return result;
}
export function parentToChildren<T extends Record<string, any>>(
    values: Array<T>,
    parentProp: string,
    childProp: keyof T,
) {
    return values.reduce(
        (acc, val) => {
            if (!acc[val[childProp]]) {
                acc[val[childProp]] = {};
            }
            if (!acc[val[childProp]]?.[parentProp]) {
                acc[val[childProp]] = {
                    [parentProp]: [],
                };
            }
            acc[val[childProp]]?.[parentProp].push(val);

            return acc;
        },
        {} as Record<T[keyof T]['id'], T[keyof T]>,
    );
}
