import { ceil, isNumber, toNumber } from 'lodash-es';
import { isNumberExists } from './predicates';

export const numberToPercent = (str: string) => {
    if (parseFloat(str) === 0) {
        return 0;
    }
    const num = ceil(toNumber(str) * 100, 3);
    return isNumber(num) ? num : 0;
};

export const percentToNumber = (str: string) => {
    if (toNumber(str) === 0) {
        return 0;
    }
    const num = ceil(toNumber(str) / 100, 3);
    return isNumberExists(num) ? num : 0;
};
