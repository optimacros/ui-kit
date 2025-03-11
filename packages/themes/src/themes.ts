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

export const getColorSchemeFilePath = (theme: THEMES, dev: boolean) => {
    const path = `color-schemes/${theme}.css`;

    return dev ? `./assets/${path}` : `./${path}`;
};

export const getColorSchemeImport = (theme: THEMES, dev: boolean) => {
    return () => import(getColorSchemeFilePath(theme, dev) + '?raw');
};
