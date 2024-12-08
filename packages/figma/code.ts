//@ts-nocheck
import tinycolor from 'tinycolor2';
import * as exportTypeMap from './component-names';
import { getComponentsStyleSheet, getExportConfig } from './exports-config';
import { SceneNode } from '@figma/plugin-typings/plugin-api-standalone';

//biome-ignore lint: wait
figma.showUI(__html__, { themeColors: true, height: 400, width: 350 });

const transformVarName = (v: string) => `--${v.replaceAll('/', '-')}`;

const transformColor = (v: number) => `${v * 100}`.slice(0, 6) + '%';

const PLAIN_NUMBER_VALUES = ['z-index', 'opacity', 'font-weight'] as const;

const PX_NUMBER_VALUES = ['blur', 'shadow'] as const;

const isSize = (name: string) => !PLAIN_NUMBER_VALUES.some((v) => name.includes(v));

const REM = 16;

const convertNumber = (name: string, val: number) =>
    PX_NUMBER_VALUES.some((v) => name.includes(v)) ? `${val}px` : `${val / REM}rem`;

const transformSize = (name: string, v: number) => (isSize(name) ? convertNumber(name, v) : v);

//biome-ignore lint: wait
const getAliasValue = (v: any, arr: Array<Variable>) => {
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

//biome-ignore lint: wait
const mapByMode = (vars: Variable[], mapper: (variable: Variable, value: any) => string) => {
    const result = vars
        .map((variable, i, arr) =>
            Object.values(variable.valuesByMode).map((v, i) => {
                const value = getAliasValue(v, arr);

                if (value.valuesByMode) {
                    return `${transformVarName(variable.name)}: var(${transformVarName(value.name)})`;
                }

                return mapper(variable, value);
            }),
        )
        .flat(2);

    return result;
};

const transformRGBA = (v) => {
    return Object.keys(v).reduce((acc, key) => {
        return {
            ...acc,
            [key]: transformColor(v[key]),
        };
    }, {});
};

const transformVars = (vars) => {
    return mapByMode(vars, ({ name, resolvedType }, v) => {
        switch (resolvedType) {
            case 'COLOR': {
                return `${transformVarName(name)}: ${tinycolor(transformRGBA(v)).toHexString()}`;
            }
            case 'FLOAT': {
                return `${transformVarName(name)}: ${transformSize(name, v)}`;
            }
            default: {
                return `${transformVarName(name)}: ${v}`;
            }
        }
    });
};

const getThemeVariables = () => {
    //biome-ignore lint: wait
    const vars = figma.variables.getLocalVariablesAsync();

    return vars.then((resolvedVars) => {
        return transformVars(resolvedVars);
    });
};

const createVariables = ({
    levels,
    states,
    onCombined = (v) => v,
}: { levels: string[]; states: string[]; onCombined: (combined: string[]) => string[] }) => {
    //TODO add ui
    const combine = onCombined(levels.map((l) => [...states.map((s) => `${l}.${s}`), l]).flat());

    //biome-ignore lint: wait
    const collection = figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:267:2');

    return collection
        .then((c) => {
            return combine.map((v) =>
                //biome-ignore lint: wait
                figma.variables.createVariable(v.replaceAll('.', '/'), c, 'COLOR'),
            );
        })
        .catch((e) => {
            console.error(e);
        });
};

const cssStateKey = 'css-element-state';

type NestedObject = {
    [key: string]: NestedObject | any;
};

function constructNestedObject(propArray: string[], value: any): NestedObject {
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

const DEFAULT_VALUE = 'default';
const EXPORT_PROPERTY = 'export';

const EXPORT_ATTRIBUTES = ['aria', 'data'] as const;

function flattenStyleArray(arr) {
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

const getComponentStyles = (parentName, parentSelectors: Array<string>, component: SceneNode) => {
    const [componentName, componentPart = 'root'] = component.name.replaceAll(' ', '').split('/');

    const componentSelector = `[data-scope="${parentName}"][data-part="${componentPart}"]`;

    const cssState = component.variantProperties?.[cssStateKey];

    const variantSelector = Object.keys(component.variantProperties)
        .filter((key) => key !== cssStateKey)
        .map((key) => {
            const value = component.variantProperties[key];

            // if no option is provided -> return same selector, it affects parent selector
            if (value === DEFAULT_VALUE) {
                return '';
            }

            return `[data-${key}="${value}"]`;
        })
        .join('');

    const attrSelectors = [];

    if (cssState && cssState !== DEFAULT_VALUE) {
        attrSelectors.push(
            `:${cssState}`,
            ...EXPORT_ATTRIBUTES.map((attr) => `[${attr}-${cssState}=true]`),
        );
    }

    const variantSelectors =
        attrSelectors.length === 0
            ? [`${componentSelector}${variantSelector}`]
            : attrSelectors.map((s) => `${componentSelector}${variantSelector}${s}`);

    const children = Promise.all(
        component.children
            .filter(
                (child: SceneNode) => child.type === 'INSTANCE' && child.name.includes(parentName),
            )
            .map((child: SceneNode) => getComponentStyles(parentName, variantSelectors, child)),
    );

    const componentStyleKey = `${componentName}/${componentPart}`;

    const styles = component
        .getCSSAsync()
        .then((css) => {
            const text = component.children.find((c) => c.name === 'css-text');

            if (text) {
                return text.getCSSAsync().then((textCss) => {
                    const styles = getComponentsStyleSheet(
                        componentStyleKey,
                        component.variantProperties,
                        css,
                        textCss,
                    );

                    return styles;
                });
            }

            const styles = getComponentsStyleSheet(
                componentStyleKey,
                component.variantProperties,
                css,
            );

            return styles;
        })
        .then((v) => {
            const config = getExportConfig(componentStyleKey);
            
            if (config.styledBy === 'parent') {
                const selectors = parentSelectors
                    .map((parentSelector) =>
                        attrSelectors.length === 0
                            ? [`${parentSelector} ${componentSelector}`]
                            : attrSelectors.map(
                                  (s) => `${parentSelector} ${componentSelector}${s}`,
                              ),
                    )
                    .flat()
                    .join();

                console.log(selectors);
                return [selectors, v];
            }

            return [variantSelectors.join(), v];
        });

    return Promise.all([styles, children]) as Promise<[string, string]>;
};

const msgRecord = {
    exportTheme: () => {
        const themeVars = getThemeVariables();

        themeVars.then((v) => {
            const data =
                'data:text/css;charset=utf-8,' + encodeURIComponent(`:root{ ${v.join(`;`)}; }`);

            //biome-ignore lint: wait
            figma.ui.postMessage({
                type: 'download',
                data: {
                    filename: 'theme.css',
                    data,
                },
            });
        });
    },
    createVariables: () => {
        createVariables({
            levels: ['primary', 'secondary', 'neutral', 'accent', 'warning', 'success', 'error']
                .map((v) => [v, `on.${v}`])
                .flat(),
            states: ['hover', 'focus', 'active'],
            onCombined(combined) {
                return combined
                    .map((v) => {
                        return exportTypeMap.componentNames.map((name) => `color.${name}.${v}`);
                    })
                    .flat();
            },
        });
    },
    exportComponents: () => {
        //biome-ignore lint: wait
        const vars = figma.variables.getLocalVariablesAsync().then((allVars) => {
            //biome-ignore lint: wait
            const components = figma.currentPage
                .findAllWithCriteria({ types: ['COMPONENT_SET'] })
                .map((v) => {
                    // master component is root, inside root detect all the child part styles, how to deal with no child like button
                    // maybe if parts frame is empty
                    const [componentName, parentPart] = v.name.replaceAll(' ', '').split('/');

                    if (parentPart !== 'root') {
                        return Promise.resolve('');
                    }

                    const componentRegexp = new RegExp(
                        `((\\w*)\\/${componentName}\\/(.*))|(^${componentName}\\/(.*))`,
                        'g',
                    );

                    const componentVars = allVars.filter((variable) =>
                        variable.name.match(componentRegexp),
                    );

                    const componentVarsCss = `:root{${transformVars(componentVars).join(`;`)}}`;

                    // variants of root component
                    const statesCss = v.children
                        .map((rootComponent) => {
                            const styles = getComponentStyles(componentName, '', rootComponent);

                            return styles;
                        })
                        .flat();

                    const componentStyleSheet = Promise.all(statesCss).then((styles) => {
                        const transformedStyles = flattenStyleArray(styles).reduce(
                            (acc, [key, value]) => acc + `${key}{${value}}`,
                            '',
                        );

                        return transformedStyles;
                    });

                    return componentStyleSheet;
                });

            return Promise.all(components);
        });

        vars.then((v) => {
            const result = v;
            console.log(result);
        });
    },
};

//biome-ignore lint: wait
figma.ui.onmessage = (message: keyof typeof msgRecord) => msgRecord[message]();
