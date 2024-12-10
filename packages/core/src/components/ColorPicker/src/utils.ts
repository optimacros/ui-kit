import { parse } from '@zag-js/color-picker';

export { parse };

export const decimalToHex = (decimal: number) => {
    var hex = decimal.toString(16);

    while (hex.length < 6) {
        hex = '0' + hex;
    }

    return `#${hex.toUpperCase()}`;
};
