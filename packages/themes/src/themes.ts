export enum THEMES {
    ADVEXCEL = 'advexcel',
    AIRPLANE = 'airplane',
    CORPLAN = 'corplan',
    // CORPLANOLD = 'corplanold',
    DARK = 'dark',
    DEV = 'dev',
    DOMRF = 'domrf',
    FIXPRICE = 'fixprice',
    MAGNIT = 'magnit',
    OLAPSOFT = 'olapsoft',
    OPTIMACROS = 'optimacros',
    ORANGE = 'orange',
    OVK = 'ovk',
    RUBLEVOARCH = 'rublevoarch',
    SOBI = 'sobi',
    STADA = 'stada',
    TINKOFF = 'tinkoff',
    TVEL = 'tvel',
    UNILEVER = 'unilever',
    YADROLIGHT = 'yadrolight',
    YADROMAIN = 'yadromain',
}

export const importMap = Object.values(THEMES).reduce((acc, v) => {
    acc[v] = () => import(`./assets/color-schemes/${v}.css?raw`);

    return acc;
}, {});

export const getColorSchemeImport = (theme: THEMES) => {
    return importMap[theme];
};
