import { tokenToString, transformVars, varsToCssString } from './utils';

const getComponentVariables = (vars) => {
    const componentVars = figma.currentPage
        .findAllWithCriteria({ types: ['COMPONENT_SET'] })
        .map((v) => {
            const componentName = v.name.replaceAll(' ', '');
            const componentRegexp = new RegExp(
                `((\\w*)\\/${componentName}\\/(.*))|(^${componentName}\\/(.*))`,
                'g',
            );

            const componentVars = vars.filter((variable) => variable.name.match(componentRegexp));

            const componentVarsCss = transformVars(componentVars);

            return componentVarsCss;
        });

    return componentVars;
};

const GLOBAL_TOKENS = 'tokens';

export const getThemeVariables = () => {
    //biome-ignore lint: wait
    const vars = figma.variables.getLocalVariablesAsync();
    const collections = figma.variables.getLocalVariableCollectionsAsync();

    return Promise.all([vars, collections]).then(([resolvedVars, collections]) => {
        const result = collections.reduce(
            (acc, { variableIds, modes, id, name }) => {
                const variables = transformVars(
                    resolvedVars.filter((v) => variableIds.some((id) => id === v.id)),
                );

                modes.forEach(({ modeId, id, name: modeName }) => {
                    const vars = variables[modeId] ?? [];

                    // all root tokens to one file
                    if (name === GLOBAL_TOKENS) {
                        acc.push(
                            Promise.all(vars).then((v) => [
                                [
                                    { collectionName: name, modeName, name: `root/${modeName}` },
                                    v.map(tokenToString),
                                ],
                            ]),
                        );

                        return acc;
                    }

                    acc.push(
                        Promise.all(vars).then((v) => {
                            const values = v.reduce((variableAcc, [token, tokenValue]) => {
                                const tokenName = token.split('/')[1];

                                if (!variableAcc[tokenName]) {
                                    variableAcc[tokenName] = [];
                                }

                                variableAcc[tokenName].push(tokenToString([token, tokenValue]));

                                return variableAcc;
                            }, {});

                            return Object.keys(values).map((k) => {
                                return [{ collectionName: name, modeName, name: k }, values[k]];
                            });
                        }),
                    );
                });

                return acc;
            },
            [] as Array<
                Promise<[{ collectionName: string; modeName: string; name: string }, string[]][]>
            >,
        );

        return Promise.all(result);
    });
};

export const getThemeVariablesAsCss = () => {
    const themeVars = getThemeVariables();

    return themeVars.then((v) => {
        const data =
            'data:text/css;charset=utf-8,' + encodeURIComponent(`:root{ ${v.join(`;`)}; }`);

        return data;
    });
};

export const getVariablesAsRoot = () => {
    return getThemeVariables().then((vars) => {
        const files = vars.reduce(
            (acc, variables) => {
                variables.forEach(([{ collectionName, modeName, name }, value]) => {
                    if (!acc[`${collectionName}/${modeName}`]) {
                        acc[`${collectionName}/${modeName}`] = [];
                    }

                    acc[`${collectionName}/${modeName}`].push(...value);
                });

                return acc;
            },
            {} as Record<string, string[]>,
        );

        return Object.entries(files).map(([key, value]) => [key, varsToCssString(value)]);
    });
};
