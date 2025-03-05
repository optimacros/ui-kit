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

export const menuItems: Array<menu.ItemProps> = [
    {
        value: 'value_604272989460871',
        valueText: 'Chips',
        disabled: true,
    },
    {
        value: 'value_127269056194915',
        valueText: 'Chips2',
        disabled: false,
    },
    {
        value: 'value_324732972671574',
        valueText: 'Chair',
        disabled: true,
    },
    {
        value: 'value_272690483443441',
        valueText: 'Chips3',
        disabled: false,
    },
    {
        value: 'value_595169517550854',
        valueText: 'Towels',
        disabled: true,
    },
    {
        value: 'value_287468252846776',
        valueText: 'typeahead',
        disabled: false,
    },
    {
        value: 'value_205725326202518',
        valueText: 'Chair2',
        disabled: true,
    },
    {
        value: 'value_791296820149465',
        valueText: 'Computer',
        disabled: false,
    },
    {
        value: 'value_656179341773851',
        valueText: 'Hat',
        disabled: true,
    },
    {
        value: 'value_356718247359329',
        valueText: 'Gloves',
        disabled: false,
    },
];
