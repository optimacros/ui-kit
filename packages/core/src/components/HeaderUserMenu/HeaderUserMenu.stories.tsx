import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

import { HeaderUserMenu } from './HeaderUserMenu';
import iconUser from '../../icons/icon-user.svg';

const meta: Meta<typeof HeaderUserMenu> = {
    component: HeaderUserMenu,
    title: 'UI Kit core/HeaderUserMenu',
};

export default meta;

type Story = StoryObj<typeof HeaderUserMenu>;

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div
            style={{
                backgroundColor: 'var(--primary-color)',
                color: '#fff',
                display: 'flex',
                justifyContent: 'flex-end',
            }}
        >
            {children}
        </div>
    );
};

const userElements = [
    {
        id: '10',
        title: 'User Name',
        icon: iconUser,
        disabled: false,
        children: [
            {
                id: '11',
                icon: iconUser,
                title: 'Profile',
                disabled: false,
                open: () => {},
            },
            {
                id: '12',
                icon: 'help_outline',
                title: 'App version',
                disabled: false,
                open: () => {},
            },
            {
                id: '13',
                icon: 'settings',
                title: 'Settings',
                disabled: false,
                open: () => {},
            },
            {
                id: '14',
                icon: 'input',
                title: 'Log Out',
                disabled: false,
                open: () => {},
            },
        ],
    },
];

export const Basic: Story = {
    args: {
        elements: userElements,
    },
    decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};
