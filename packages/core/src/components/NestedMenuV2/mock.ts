export const elements = [
    {
        id: '1',
        icon: 'list',
        title: 'AM Landing (Applications)',
        disabled: false,
        open: () => {},
    },
    {
        id: '2',
        title: 'Tasks manager',
        disabled: false,
        open: () => {},
    },
    {
        id: '3',
        title: 'Task output',
        disabled: false,
        open: () => {},
    },
    {
        id: '4',
        title: 'General parameters',
        disabled: false,
        open: () => {},
    },
    {
        id: '5',
        title: 'Security Center',
        disabled: true,
    },
    {
        id: '6',
        title: 'Help',
        disabled: false,
        children: [
            {
                id: '7',
                icon: 'help_outline',
                title: 'App Version',
                disabled: false,
                open: () => {},
            },
        ],
    },
];
