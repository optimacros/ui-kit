export const foldersMock = [
    {
        rootId: null,
        type: 'Folder',
        label: 'Folder 1',
        id: 123423,
        icon: 'Folder',
        onClick: () => {},
    },
    {
        rootId: null,
        type: 'Folder',
        label: 'Folder 2',
        id: 42432,
        icon: 'Folder',
        onClick: () => {},
    },
    {
        rootId: 123423,
        type: 'Folder',
        label: 'Folder 3',
        id: 3432324,
        icon: 'Folder',
        onClick: () => {},
    },
    {
        rootId: null,
        type: 'Folder',
        label: 'Folder 4',
        id: 43232324,
        icon: 'Folder',
        onClick: () => {},
    },
];

export const workspacesMock = [
    {
        rootId: 123423,
        type: 'Workspace',
        label: 'Workspace 1',
        id: 1432423432,
        href: '#',
        icon: 'Workspace',
        onClick: () => {},
    },
    {
        rootId: 42432,
        type: 'Workspace',
        label: 'Workspace 2',
        id: 24324323,
        href: '#',
        icon: 'Workspace',
        onClick: () => {},
    },
    {
        rootId: null,
        type: 'Workspace',
        label: 'Workspace 3',
        id: 3434234242423,
        href: '#',
        icon: 'Workspace',
        settingHref: '#',
        onClick: () => {},
        settingOnClick: () => {},
    },
    {
        rootId: 42432,
        type: 'Workspace',
        label: 'Workspace 4',
        id: 375635352,
        href: '#',
        icon: 'Workspace',
        onClick: () => {},
    },
];
export const appManagersMock = [
    {
        rootId: 123423,
        type: 'AM',
        label: 'AM 1',
        id: 1132335,
        href: '#',
        icon: 'AM',
        onClick: () => {},
    },
    {
        rootId: 42432,
        type: 'AM',
        label: 'AM 2',
        id: 3122432325,
        href: '#',
        icon: 'AM',
        onClick: () => {},
    },
    {
        rootId: 3432324,
        type: 'AM',
        label: 'AM 3',
        id: 3533653,
        href: '#',
        icon: 'AM',
        onClick: () => {},
    },
    {
        rootId: null,
        type: 'AM',
        label: 'AM 4',
        id: 412424325,
        href: '#',
        icon: 'AM',
        onClick: () => {},
    },
];

export enum Orientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}

export enum Align {
    Left = 'left',
    Right = 'right',
    Center = 'center',
    RightInRow = 'rightInRow',
}
