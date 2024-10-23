import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { ResourceList } from './ResourceList';
import { appManagersMock, foldersMock, workspacesMock } from '../../constants.ts';
import iconFolderOpen from '../../icons/icon-folder-open.svg';
import { getSidebarData } from '../Sidebar';

const meta: Meta<typeof ResourceList> = {
    component: ResourceList,
    title: 'UI Kit layout/ResourceList',
    argTypes: {
        elements: {
            description: 'Elements of sidebar list',
            control: 'object',
        },
    },
};

export default meta;

type Story = StoryObj<typeof ResourceList>;

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

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div style={{ backgroundColor: 'var(--primary-color)', width: '300px', color: '#fff' }}>
            {children}
        </div>
    );
};

export const Basic: Story = {
    args: {
        elements: sidebarData,
        getOpenedIcon: getOpenedIcon,
    },
    decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};
