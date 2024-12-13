import { menu } from './index';

export const createMenuItems = (count: number): Array<menu.ItemProps> => {
    return new Array(count).fill(0).map((v, i) => ({
        value: `value ${i}`,
        valueText: `value ${i}`,
        disabled: i % 2 === 0,
        key: `value ${i}`,
    }));
};
