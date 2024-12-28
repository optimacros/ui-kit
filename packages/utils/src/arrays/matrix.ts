import { Collection } from 'immutable';
import { toCollection } from './utils';
import * as $ from '@optimacros-ui/types';

export function combine2d(list, n = 0, result = [], current = []) {
    if (n === list.length) result.push(current);
    else list[n].forEach((item) => combine2d(list, n + 1, result, [...current, item]));

    return result;
}

/**
 * @description useful for combination of multiple strings
 * @example
 * 		IndexedUtils.combine2dWith(
		 		// provide in order to get a right combination
		 		// order is always same
              [durations, easings, delays],
			  	// [duration, easing, delay]
              (keys) => {
                const k = [key, ...keys].join(' ');
                result[_.dash(k)] = {
                  value: {
                    transition: 'all',
                    transitionProperty: property.join(','),
                    transitionDuration: keys[0], //duration
                    transitionTimingFunction: keys[1], //easing
                    transitionDelay: keys[2], //delay
                  },
                };
              }
            ); 
 */
export function combine2dWith<T extends $.Tuple.Indexed.Type<$.Tuple.Indexed.Type<any>>>(
    arrayLike: T,

    /** method call when 1d array is combinated */
    //@ts-ignore
    onCombinationDone?: (list: Array<T[number][number]>) => void,

    /** method call when 1d array item is added */
    //@ts-ignore
    onItemAddition?: (list: Array<T[number][number]>) => void,
) {
    const collection = toCollection(arrayLike) as Collection.Indexed<any>;

    const combine = (list: Collection.Indexed<any>, n = 0, result = [], current = []) => {
        current.length > 0 && onItemAddition?.(current);

        if (n === list.count()) {
            onCombinationDone?.(current);
            result.push(current);
        } else {
            list.get(n).forEach((item) => combine(list, n + 1, result, [...current, item]));
        }
    };

    return combine(collection.filter((a) => a.length > 0));
}
/**
 * @example
 * const modeThemeSelectors = IndexedUtils.reduce2d(
      [
        _ColorSchema.COLOR_MODES,
        this.config.themes,
        Object.entries(this.config.modifications),
      ],
      (acc, [m, t, mods]) => {
        if (m && !t && !mods) {
          acc[
            themeSelector(`${_ColorSchema.COLOR_MODE_FIELD} ${m}`)
          ] = `[${_ColorSchema.COLOR_MODE_SELECTOR}=${m}] &`;
        }

        if (t && !mods) {
          acc[
            themeSelector(`${_ColorSchema.THEME_FIELD} ${t}`)
          ] = `[${_ColorSchema.THEME_SELECTOR}=${t}] &`;

          acc[
            themeSelector(`${_ColorSchema.COLOR_SCHEMA_FIELD} ${m} ${t}`)
          ] = `[${_ColorSchema.COLOR_MODE_SELECTOR}=${m}][${_ColorSchema.THEME_SELECTOR}=${t}] &`;
        }

        if (mods) {
          const [k, { selector, values }] = mods;
          values.forEach((v) => {
            acc[
              themeSelector(`${k} ${m} ${t} ${v}`)
            ] = `[${_ColorSchema.COLOR_MODE_SELECTOR}=${m}][${_ColorSchema.THEME_SELECTOR}=${t}][${selector}=${v}] &`;

            acc[
              themeSelector(`${k} ${m} ${v}`)
            ] = `[${_ColorSchema.COLOR_MODE_SELECTOR}=${m}][${selector}=${v}] &`;

            acc[
              themeSelector(`${k} ${t} ${v}`)
            ] = `[${_ColorSchema.THEME_SELECTOR}=${t}][${selector}=${v}] &`;

            acc[themeSelector(`${k} ${v}`)] = `[${selector}=${v}] &`;
          });
        }

        return acc;
      },
      {} as Record<string, string>,
    );
 */
export function reduce2d<
    T extends $.Tuple.Indexed.Type<$.Tuple.Indexed.Type<any>>,
    A extends unknown,
    //@ts-ignore
>(arrayLike: T, onItemAddition: (acc: A, list: Array<T[number][number]>) => A, acc: A) {
    const collection = toCollection(arrayLike) as Collection.Indexed<any>;

    let reduced = acc;

    const combine = (list: Collection.Indexed<any>, n = 0, current = []) => {
        if (current.length > 0) reduced = onItemAddition?.(reduced, current);

        list.get(n, []).forEach((item) => combine(list, n + 1, [...current, item]));

        return reduced;
    };

    return combine(collection.filter((a) => a.length > 0));
}
