export const menuItems = [
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
    {
        id: 'src',
        name: 'src',
        children: [{ id: 'src/folder', name: 'folder' }],
    },
];
