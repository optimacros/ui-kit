import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

import { HeaderNavigation } from './HeaderNavigation';

const meta: Meta<typeof HeaderNavigation> = {
    component: HeaderNavigation,
    title: 'UI Kit layout/HeaderNavigation',
    argTypes: {
        title: {
            description: 'Header title',
            control: 'text',
        },
        onClick: {
            description: 'Action on click',
            control: 'object',
        },
    },
};

export default meta;

type Story = StoryObj<typeof HeaderNavigation>;

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div
            style={{ backgroundColor: 'var(--primary-color)', width: 'fit-content', color: '#fff' }}
        >
            {children}
        </div>
    );
};

export const Basic: Story = {
    args: {
        onClick: () => {},
        title: 'Title',
    },
    decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};
