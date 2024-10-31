import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar } from './Sidebar';
import { getSidebarData } from './utils';
import { appManagersMock, foldersMock, workspacesMock } from '../../constants';
import iconFolderOpen from '../../icons/icon-folder-open.svg';
import { MemoryCounter } from '../MemoryCounter';
import { ResourceList } from '../ResourceList';

const meta: Meta<typeof Sidebar> = {
    component: Sidebar,
    title: 'UI Kit core/Sidebar',
    argTypes: {
        children: {
            description: 'Content of sidebar',
            control: 'object',
        },
        className: { table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

enum OpenIconType {
    Folder = 'Folder',
}

const openIcons = {
    [OpenIconType.Folder]: iconFolderOpen,
};

const sidebarData = getSidebarData(foldersMock, workspacesMock, appManagersMock);

const getOpenedIcon = (icon: string) => {
    return openIcons[icon as OpenIconType];
};

export const Basic: Story = {
    args: {
        children: [
            <MemoryCounter
                key="memory-counter"
                data={{
                    filledSize: '2 gb',
                    percentSize: 20,
                    freeSize: '5 gb',
                    doubleFreeSize: '11 gb',
                }}
            />,
            <ResourceList
                key="resource-list"
                elements={sidebarData}
                getOpenedIcon={getOpenedIcon}
            />,
        ],
    },
};
