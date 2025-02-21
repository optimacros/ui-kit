import { ItemProps } from '../parts';

export const createMenuItems = (count: number): Array<ItemProps> => {
    const items = new Array(count).fill(0).map((_, i) => ({
        value: `value_${i}`,
        valueText: `valueText ${i}`,
        disabled: i % 2 === 0,
        //closeOnSelect: true,
    }));

    items[5].valueText = 'typeahead';

    return items;
};

export const menuItems: Array<ItemProps> = createMenuItems(10);
