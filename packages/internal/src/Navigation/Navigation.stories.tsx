import { ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@optimacros-ui/button';
import { Navigation } from './index';

const meta: Meta<typeof Navigation> = {
    title: 'UI Kit internal/Navigation',
    component: Navigation,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'radio' },
            options: ['horizontal', 'vertical'],
            description: 'Layout orientation of the navigation',
        },
        theme: {
            control: 'object',
            description: 'Theme customization object',
        },
        className: {
            control: 'text',
            description: 'Additional CSS class',
        },
        wrap: {
            control: 'boolean',
            description: 'Whether navigation items can wrap to multiple lines',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Navigation>;

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '300px' }}>{children}</div>
);

export const Basic: Story = {
    args: {
        type: 'horizontal',
        children: (
            <>
                <Button>Portfolio</Button>
                <Button>About</Button>
                <Button>Menu</Button>
                <Button>Location</Button>
                <Button>Contact</Button>
            </>
        ),
    },
};

export const Horizontal: Story = {
    args: {
        type: 'horizontal',
        children: (
            <>
                <Button>Portfolio</Button>
                <Button>About</Button>
                <Button>Menu</Button>
                <Button>Location</Button>
                <Button>Contact</Button>
            </>
        ),
    },
};

export const Vertical: Story = {
    args: {
        type: 'vertical',
        children: (
            <>
                <Button>Portfolio</Button>
                <Button>About</Button>
            </>
        ),
    },
};

export const Wrap: Story = {
    args: {
        type: 'horizontal',
        children: (
            <>
                <Button>Portfolio</Button>
                <Button>About</Button>
                <Button>Menu</Button>
                <Button>Location</Button>
                <Button>Contact</Button>
            </>
        ),
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};
