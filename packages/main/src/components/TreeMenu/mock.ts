import * as tree from '@zag-js/tree-view';

interface Node {
    id: string;
    name: string;
    children?: Node[];
}

export const collection = tree.collection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
        id: 'ROOT',
        name: '',
        children: [
            {
                id: 'node_modules',
                name: 'node_modules',
                children: [
                    { id: 'node_modules/zag-js', name: 'zag-js' },
                    { id: 'node_modules/pandacss', name: 'panda' },
                    {
                        id: 'node_modules/@types',
                        name: '@types',
                        children: [
                            { id: 'node_modules/@types/react', name: 'react' },
                            { id: 'node_modules/@types/react-dom', name: 'react-dom' },
                        ],
                    },
                ],
            },
        ],
    },
});
