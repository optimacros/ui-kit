type PropertyName = string | number | symbol;

/**
 * Creates an object composed of the picked object properties.
 *
 * @param object - The source object
 * @param paths - The property paths to pick
 * @returns Returns the new object with picked properties
 *
 * @example
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
export function pick<T extends object, K extends keyof T>(object: T, paths: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;

    if (object == null) {
        return result;
    }

    for (const path of paths) {
        if (path in object) {
            result[path] = object[path];
        }
    }

    return result;
}
