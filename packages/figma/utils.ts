import tinycolor from 'tinycolor2';

export const transformVarName = (v: string) => `--${v.replaceAll('/', '-')}`;

export const transformColor = (v: number) => `${v * 100}`.slice(0, 6) + '%';

const PLAIN_NUMBER_VALUES = ['z-index', 'opacity', 'font-weight'] as const;

const PX_NUMBER_VALUES = ['blur', 'shadow'] as const;

export const isSize = (name: string) => !PLAIN_NUMBER_VALUES.some((v) => name.includes(v));

const REM = 16;

export const convertNumber = (name: string, val: number) =>
    PX_NUMBER_VALUES.some((v) => name.includes(v)) ? `${val}px` : `${val / REM}rem`;

export const transformSize = (name: string, v: number) =>
    isSize(name) ? convertNumber(name, v) : v;

//biome-ignore lint: wait
export const getAliasValue = (v: any, arr: Array<Variable>) => {
    //@ts-ignore
    const findValue = (v: any) => {
        if (!v) {
            return '';
        }

        if (v.type === 'VARIABLE_ALIAS') {
            return findValue(arr.find((val) => val.id == v.id));
        }

        return arr.find((val) => val.id == v.id);
    };

    if (v.type === 'VARIABLE_ALIAS') {
        return findValue(v);
    }

    return v;
};

export const getAliasVariable = (v: any): Promise<Variable> => {
    //@ts-ignore
    const findValue = (v: any) => {
        const variable = figma.variables.getVariableByIdAsync(v.id).then((variable) => {
            if (variable.type === 'VARIABLE_ALIAS') {
                return findValue(variable);
            }

            return variable;
        });

        return variable;
    };

    if (v.type === 'VARIABLE_ALIAS') {
        return findValue(v);
    }

    return Promise.resolve(v as Variable);
};
export const transformRGBA = (v) => {
    return Object.keys(v).reduce((acc, key) => {
        return {
            ...acc,
            [key]: transformColor(v[key]),
        };
    }, {});
};

export const mapByMode = (
    vars: Variable[],
    mapper: (variable: Variable, value: any) => [string, string],
) => {
    const result = vars.reduce(
        (acc, variable, i, arr) => {
            Object.keys(variable.valuesByMode).forEach((k, i) => {
                if (!acc[k]) {
                    acc[k] = [];
                }

                const value = getAliasVariable(variable.valuesByMode[k]).then((value) => {
                    if (value.valuesByMode) {
                        return [variable.name, `var(${transformVarName(value.name)})`];
                    }

                    return mapper(variable, value);
                });

                acc[k].push(value);
            });

            return acc;
        },
        {} as Record<string, Array<Promise<[string, string]>>>,
    );

    return result;
};

export const transformVars = (vars) => {
    return mapByMode(vars, ({ name, resolvedType }, v) => {
        switch (resolvedType) {
            case 'COLOR': {
                return [name, tinycolor(transformRGBA(v) as any).toHexString()];
            }
            case 'FLOAT': {
                return [name, transformSize(name, v)];
            }
            default: {
                return [name, v];
            }
        }
    });
};

export const tokenToString = ([name, value]: [string, string]) => {
    return `${transformVarName(name)}:${value}`;
};

export const varsToCssString = (vars: Array<string>) =>
    'data:text/css;charset=utf-8,' + encodeURIComponent(`:root{ ${vars.join(`;`)}; }`);

type NestedObject = {
    [key: string]: NestedObject | any;
};

export function constructNestedObject(propArray: string[], value: any): NestedObject {
    const result: NestedObject = {};

    if (propArray.length === 0) {
        return result;
    }

    let current = result;
    const lastIndex = propArray.length - 1;

    propArray.forEach((prop, index) => {
        if (index === lastIndex) {
            current[prop] = value;
        } else {
            current[prop] = {
                ...current,
            };
            current = current[prop];
        }
    });

    return result;
}

export function flattenStyleArray(arr) {
    const result = [];

    function processArray(array) {
        for (const item of array) {
            if (Array.isArray(item)) {
                if (item.length === 2 && typeof item[0] === 'string') {
                    // If it's a tuple of [selector, styles], add it
                    result.push(item);
                } else {
                    // Otherwise, process nested array
                    processArray(item);
                }
            }
        }
    }

    processArray(arr);
    return result;
}

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
