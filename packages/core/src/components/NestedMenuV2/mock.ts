export const elements = [
    {
        key: '1',
        value: '1',
        icon: 'list',
        valueText: 'AM Landing (Applications)',
        disabled: false,
        open: () => {},
    },
    {
        key: '2',
        value: '2',
        valueText: 'Tasks manager',
        disabled: false,
        open: () => {},
    },
    {
        key: '3',
        value: '3',
        valueText: 'Task output',
        disabled: false,
        open: () => {},
    },
    {
        key: '4',
        value: '4',
        valueText: 'General parameters',
        disabled: false,
        open: () => {},
    },
    {
        key: '5',
        value: '5',
        valueText: 'Security Center',
        disabled: true,
    },
    {
        key: '6',
        value: '6',
        valueText: 'Help',
        disabled: false,
        children: [
            {
                key: '7',
                value: '7',
                icon: 'help_outline',
                valueText: 'App Version',
                disabled: false,
                open: () => {},
            },
        ],
    },
];
