import { keys, reduce, pickBy, set } from 'lodash';

export const angleFromPositions = (cx, cy, ex, ey) => {
    const theta = Math.atan2(ey - cy, ex - cx) + Math.PI / 2;

    return (theta * 180) / Math.PI;
};

export const angle360FromPositions = (cx, cy, ex, ey) => {
    const angle = angleFromPositions(cx, cy, ex, ey);

    return angle < 0 ? 360 + angle : angle;
};

export const range = (start = 0, stop = null, step = 1) => {
    let [_start, _stop] = [0, start];

    if (stop !== null) {
        // eslint-disable-next-line no-extra-semi
        [_start, _stop] = [start, stop];
    }
    const length = Math.max(Math.ceil((_stop - _start) / step), 0);
    const _range = new Array(length);

    for (let idx = 0; idx < length; idx += 1, _start += step) {
        _range[idx] = _start;
    }

    return _range;
};

export const round = (number, decimals) => {
    if (!isNaN(parseFloat(number)) && isFinite(number)) {
        const decimalPower = 10 ** decimals;

        return Math.round(parseFloat(number) * decimalPower) / decimalPower;
    }

    return NaN;
};

export const getViewport = () => ({
    height: window.innerHeight || document.documentElement.offsetHeight,
    width: window.innerWidth || document.documentElement.offsetWidth,
});

export const cloneObject = (object) => JSON.parse(JSON.stringify(object));

export const inputTypeForPrototype = (prototype) => {
    if (prototype === Date) {
        return 'date';
    }

    if (prototype === Number) {
        return 'number';
    }

    if (prototype === Boolean) {
        return 'checkbox';
    }

    return 'text';
};

export const prepareValueForInput = (value, type) => {
    if (type === 'date') {
        return new Date(value).toISOString().slice(0, 10);
    }

    if (type === 'checkbox') {
        return value ? 'on' : '';
    }

    return value;
};

export const transformKeys = (obj, fn) => {
    const addTransformedKey = (result, key) => set(result, fn(key), obj[key]);

    return reduce(keys(obj), addTransformedKey, {});
};

export const removeNamespace = (namespace) => {
    return (key) => {
        const capitalized = key.substr(namespace.length);

        return capitalized.slice(0, 1).toLowerCase() + capitalized.slice(1);
    };
};

export const getAnimationModule = (animation, theme) => {
    const filteredTheme = pickBy(theme, (v, k) => k.startsWith(animation));

    return transformKeys(filteredTheme, removeNamespace(animation));
};

export const isValuePresent = (value) => {
    return (
        value !== null &&
        // eslint-disable-next-line no-undefined
        value !== undefined &&
        value !== '' &&
        !(typeof value === 'number' && isNaN(value))
    );
};
