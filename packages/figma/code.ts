//@ts-nocheck
import tinycolor from 'tinycolor2';
import { componentNames } from './component-names';
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
                        return componentNames.map((name) => `color.${name}.${v}`);
                    })
                    .flat();
            },
        });
    },
    exportComponents: () => {
        //biome-ignore lint: wait
        const vars = figma.variables.getLocalVariablesAsync();

        vars.then((allVars) => {
            //biome-ignore lint: wait
            const components = figma.currentPage
                .findAllWithCriteria({ types: ['COMPONENT_SET'] })
                .map((v) => {
                    const componentName = v.name.replaceAll(' ', '');
                    const componentRegexp = new RegExp(
                        `((\\w*)\\/${componentName}\\/(.*))|(^${componentName}\\/(.*))`,
                        'g',
                    );

                    const componentVars = allVars.filter((variable) =>
                        variable.name.match(componentRegexp),
                    );

                    const componentVarsCss = `:root{${transformVars(componentVars).join(`;`)}}`;

                    return v.children.map((component) => {
                        const cssState = component.variantProperties[cssStateKey];

                        const selectorBase = Object.keys(component.variantProperties)
                            .filter((key) => key !== cssStateKey)
                            .map((key) => {
                                return `[${key}=${component.variantProperties[key]}]`;
                            })
                            .join('');

                        const selector = cssState
                            ? `${selectorBase}:${cssState}, ${selectorBase}[data-${cssState}=true]`
                            : selectorBase;

                        component.getCSSAsync().then((css) => {
                            // everything is fine
                            // to get text color we need to parse children and get their color, maybe some naming conventions there
                            const text = component.children.find((c) => c.name === 'data-text');
                            text &&
                                text.getCSSAsync().then((textCss) => {
                                    const res = {
                                        ...css,
                                        color: textCss.color,
                                    };
                                    // console.log(res);
                                    return {
                                        ...css,
                                        color: textCss.color,
                                    };
                                });
                        });

                        return component;
                    });
                });
        });
    },
};

//biome-ignore lint: wait
figma.ui.onmessage = (message: keyof typeof msgRecord) => msgRecord[message]();
