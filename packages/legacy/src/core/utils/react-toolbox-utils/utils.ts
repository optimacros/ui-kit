export const getViewport = (): { height: number; width: number } => ({
    height: window.innerHeight || document.documentElement.offsetHeight,
    width: window.innerWidth || document.documentElement.offsetWidth,
});

export const isValuePresent = (value: unknown): boolean =>
    value !== null &&
    value !== undefined &&
    value !== '' &&
    !(typeof value === 'number' && isNaN(value));
