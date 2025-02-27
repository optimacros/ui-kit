import { menu } from './index';
import { faker } from '@faker-js/faker';
export const createMenuItems = (count: number): Array<menu.ItemProps> => {
    const items = new Array(count).fill(0).map((_, i) => ({
        value: `value_${faker.number.bigInt()}`,
        valueText: faker.commerce.product(),
        disabled: i % 2 === 0,
        //closeOnSelect: true,
    }));

    items[5].valueText = 'typeahead';

    return items;
};

export const menuItems: Array<menu.ItemProps> = createMenuItems(10);
