import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

import { HeaderNotification } from './HeaderNotification';

const meta: Meta<typeof HeaderNotification> = {
    component: HeaderNotification,
    title: 'UI Kit layout/HeaderNotification',
    argTypes: {
        notification: {
            description: 'Notification info',
            control: 'object',
        },
    },
};

export default meta;

type Story = StoryObj<typeof HeaderNotification>;

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div
            style={{
                backgroundColor: 'var(--primary-color)',
                paddingLeft: '3px',
                width: 'fit-content',
            }}
        >
            {children}
        </div>
    );
};

const notification = {
    unreadCount: 0,
    active: false,
    visible: true,
    // eslint-disable-next-line no-console
    toggle: () => console.log('toggle'),
};

export const Basic: Story = {
    args: {
        notification: notification,
    },
    decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};

export const Active: Story = {
    args: {
        notification: {
            ...notification,
            active: true,
        },
    },
    decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};

export const Unread: Story = {
    args: {
        notification: {
            ...notification,
            unreadCount: 3,
        },
    },
    decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};
