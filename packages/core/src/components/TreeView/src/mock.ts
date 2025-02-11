import { faker } from '@faker-js/faker';
import * as treeview from '@zag-js/tree-view';
import { Node } from './TreeView';

export const createMockMenuItems = (count: number) => {
    return treeview.collection<Node>({
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.name,
        rootNode: {
            id: 'ROOT',
            name: '',
            children: [
                {
                    id: 'parent-selected',
                    name: faker.word.noun(),
                    children: [
                        {
                            id: 'selected',
                            name: faker.word.noun(),
                        },
                    ],
                },
                ...faker.helpers.multiple(
                    () => ({
                        id: faker.string.uuid(),
                        name: faker.word.noun(),
                        children: faker.helpers.multiple(
                            () => {
                                const hasGrandchildren = faker.datatype.boolean();
                                return {
                                    id: faker.string.uuid(),
                                    name: faker.word.noun(),
                                    children: hasGrandchildren
                                        ? faker.helpers.multiple(
                                              () => ({
                                                  id: faker.string.uuid(),
                                                  name: faker.word.noun(),
                                              }),
                                              { count: faker.number.int({ min: 1, max: 2 }) },
                                          )
                                        : undefined,
                                };
                            },
                            { count: faker.number.int({ min: 0, max: 5 }) },
                        ),
                    }),
                    { count },
                ),
            ],
        },
    });
};
