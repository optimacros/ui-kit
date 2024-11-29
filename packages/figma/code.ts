//@ts-nocheck
//biome-ignore lint: wait
figma.showUI(__html__, { themeColors: true, height: 400, width: 350 });

const transformVarName = (v: string) => `--${v.replaceAll('/', '-')}`;

const transformColor = (v: number) => `${v * 100}`.slice(0, 4) + '%';

const REM = 16;
const transformSize = (v: number) => `${v / REM}rem`;

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
        return mapByMode(
            vars,
            ({ name }, v) =>
                `${transformVarName(name)}: rgb(${transformColor(v.r)} ${transformColor(v.g)} ${transformColor(v.b)} / ${transformColor(v.a)})`,
        ).join(`;\n`);
    });

    //biome-ignore lint: wait
    const sizes = figma.variables.getLocalVariablesAsync('FLOAT').then((vars) => {
        //@ts-ignore
        return vars
            .map(({ valuesByMode, name }) =>
                Object.values(valuesByMode).map(
                    (v) => `${transformVarName(name)}: ${transformSize(v)}`,
                ),
            )
            .join(`;\n`);
    });

    //biome-ignore lint: wait
    const other = figma.variables.getLocalVariablesAsync('STRING').then((vars) => {
        //@ts-ignore
        return vars.map(({ valuesByMode, name }) =>
            Object.values(valuesByMode).map((v) => `${transformVarName(name)}: ${v}`),
        );
    });

    Promise.all([colors, sizes, other]).then((v) => {
        //biome-ignore lint: wait
        figma.ui.postMessage({
            type: 'download',
            data: {
                filename: 'theme.css',
                data: `data:text/css, :root{ ${v
                    .filter((arr) => arr.length > 0)
                    .flat()
                    .join(`;\n`)}; }`,
            },
        });
    });
};

const msgRecord = {
    exportTheme,
};

//biome-ignore lint: wait
figma.ui.onmessage = (message: keyof typeof msgRecord) => msgRecord[message]();
