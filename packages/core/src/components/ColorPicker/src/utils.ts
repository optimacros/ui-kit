import { parse as origParse } from '@zag-js/color-picker';

const parse: typeof origParse = (str) => {
    const color = origParse(str);

    const origToString = color.toString;

    color.toString = (f) => {
        if (!f) {
            return 'Pass desired format';
        }

        return origToString.call(color, f);
    };

    return color;
};

export { parse };
