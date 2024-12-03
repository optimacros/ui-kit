//@ts-nocheck

import tinycolor from 'tinycolor2';
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

const exportTheme = () => {
    //biome-ignore lint: wait
    const colors = figma.variables.getLocalVariablesAsync('COLOR').then((vars) => {
        //@ts-ignore
        const transformRGBA = (v) => {
            return Object.keys(v).reduce((acc, key) => {
                return {
                    ...acc,
                    [key]: transformColor(v[key]),
                };
            }, {});
        };

        return mapByMode(
            vars,
            ({ name }, v) =>
                `${transformVarName(name)}: ${tinycolor(transformRGBA(v)).toHexString()}`,
        );
    });

    //biome-ignore lint: wait
    const sizes = figma.variables.getLocalVariablesAsync('FLOAT').then((vars) => {
        //@ts-ignore
        return vars.map(({ valuesByMode, name }) =>
            Object.values(valuesByMode).map(
                (v) => `${transformVarName(name)}: ${transformSize(name, v)}`,
            ),
        );
    });

    //biome-ignore lint: wait
    const other = figma.variables.getLocalVariablesAsync('STRING').then((vars) => {
        //@ts-ignore
        return vars.map(({ valuesByMode, name }) =>
            Object.values(valuesByMode).map((v) => `${transformVarName(name)}: ${v}`),
        );
    });

    Promise.all([colors, sizes, other]).then((v) => {
        const data =
            'data:text/css;charset=utf-8,' +
            encodeURIComponent(
                `:root{ ${v
                    .filter((arr) => arr.length > 0)
                    .flat()
                    .join(`;`)}; }`,
            );

        //biome-ignore lint: wait
        figma.ui.postMessage({
            type: 'download',
            data: {
                filename: 'theme.css',
                data,
            },
        });
    });
};

const msgRecord = {
    exportTheme,
};

//biome-ignore lint: wait
figma.ui.onmessage = (message: keyof typeof msgRecord) => msgRecord[message]();
