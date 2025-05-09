import { ColorFormat } from '../models';
import { ColorPicker } from '@optimacros-ui/color-picker';
import { has } from '@optimacros-ui/utils';

export const parseHex = (color: string | ColorFormat | ColorPicker.ValueChangeDetails): string => {
    if (color === '') {
        return undefined;
    }

    if (typeof color === 'string') {
        return color;
    }

    if (has(color, 'hex')) {
        return color.hex as string;
    }

    if (has(color, 'valueAsString')) {
        return color.valueAsString as string;
    }

    if (has(color, 'value') && typeof color.value === 'string') {
        return color.value;
    }

    return null;
};

export const convertToObject = (hex: string): ColorFormat => {
    return { hex };
};
