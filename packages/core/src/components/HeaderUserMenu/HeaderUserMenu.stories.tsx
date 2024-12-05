import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

import { HeaderUserMenu } from './HeaderUserMenu';

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
        disabled: false,
        children: [
            {
                id: '11',

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
