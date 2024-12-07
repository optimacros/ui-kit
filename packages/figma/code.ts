//@ts-nocheck
import tinycolor from 'tinycolor2';
import * as exportTypeMap from './component-names';
import { getComponentsStyleSheet } from './exports-config';

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
                    const [componentName, componentPart] = v.name.replaceAll(' ', '').split('/');

                    if (componentPart === 'root') {
                        const componentRegexp = new RegExp(
                            `((\\w*)\\/${componentName}\\/(.*))|(^${componentName}\\/(.*))`,
                            'g',
                        );

                        const componentVars = allVars.filter((variable) =>
                            variable.name.match(componentRegexp),
                        );

                        const componentVarsCss = `:root{${transformVars(componentVars).join(`;`)}}`;
                    }

                    const statesCss = v.children
                        // .filter((component) => config[component.name])
                        .map((component) => {
                            const componentSelector = `[data-scope="${componentName}"][data-part="${componentPart}"]`;

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

                            const selector = `${componentSelector}${variantSelector}`;

                            const selectors = [];

                            if (cssState && cssState !== DEFAULT_VALUE) {
                                selectors.push(
                                    `${selector}:${cssState}`,
                                    ...EXPORT_ATTRIBUTES.map(
                                        (attr) => `${selector}[${attr}-${cssState}=true]`,
                                    ),
                                );
                            } else {
                                selectors.push(selector);
                            }

                            const styles = component
                                .getCSSAsync()
                                .then((css) => {
                                    const text = component.children.find(
                                        (c) => c.name === 'css-text',
                                    );

                                    if (text) {
                                        return text.getCSSAsync().then((textCss) => {
                                            const styles = getComponentsStyleSheet(
                                                `${componentName}/${componentPart}`,
                                                component.variantProperties,
                                                css,
                                                textCss,
                                            );

                                            return styles;
                                        });
                                    }

                                    const styles = getComponentsStyleSheet(
                                        `${componentName}/${componentPart}`,
                                        component.variantProperties,
                                        css,
                                    );

                                    return styles;
                                })
                                .then((v) => {
                                    return [selectors.join(), v];
                                });

                            return styles;
                        });

                    const componentStyleSheet = Promise.all(statesCss).then((styles) => {
                        const transformedStyles = styles.reduce(
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
