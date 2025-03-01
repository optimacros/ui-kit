import { faker } from '@faker-js/faker';

export const createMockItems = (count: number) => {
    return faker.helpers.multiple(
        () => ({
            id: faker.string.uuid(),
            value: faker.person.firstName(),
            style: {
                background: faker.color.rgb(),
                height: faker.number.int({ min: 100, max: 250 }),
                width: '100%',
            },
        }),
        { count },
    );
};

export const randomItems = createMockItems(100);
