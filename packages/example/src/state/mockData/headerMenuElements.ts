export const headerMenuElements = [
    {
        id: 'id-1',
        title: 'Optimization',
        open: () => {
            console.log('onClick Header Menu');
        },
    },
    {
        id: 'id-2',
        title: 'Macros',
        open: () => {
            console.log('onClick Header Menu');
        },
        children: [
            {
                id: 'id-2-1',
                title: 'Title 2-1',
                icon: 'list',
                open: () => {
                    console.log('onClick Header Menu');
                },
            },
            {
                id: 'id-2-2',
                title: 'Title 2-2',
                icon: 'refresh',
                open: () => {
                    console.log('onClick Header Menu');
                },
            },
        ],
    },
    {
        id: 'id-3',
        title: 'Dimensions',
        open: () => {
            console.log('onClick Header Menu');
        },
    },
    {
        id: 'id-4',
        title: 'Element Title 4',
        open: () => {
            console.log('onClick Header Menu');
        },
    },
];
