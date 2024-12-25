import { faker } from '@faker-js/faker';
export const createSelectBoxItems = (count: number) => {
    return new Array(count).fill(0).map((_, i) => {
        return {
            label: `item ${i}`,
            value: `item-value-${i}-${faker.string.numeric({ length: 3 })}`,
            key: `item-value-${i}-${faker.string.numeric({ length: 3 })}`,
            index: i,
        };
    });
};

export const mockItems = createSelectBoxItems(20);
