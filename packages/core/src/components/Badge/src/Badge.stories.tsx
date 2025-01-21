import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '.';

const meta: Meta<typeof Badge> = {
    title: 'Ui kit core/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        count: {
            control: { type: 'number' },
            description: 'Number displayed in the badge',
        },
        position: {
            control: { type: 'select' },
            options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
            description: 'Position of the badge relative to its children',
        },
        offset: {
            control: { type: 'number' },
            description: 'Custom offset value in pixels',
        },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

// Default demo box to use in stories
const DemoBox = () => (
    <div
        style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
        }}
    />
);

// Basic usage
export const Default: Story = {
    args: {
        count: 5,
        children: <DemoBox />,
    },
};

// High count number
export const HighCount: Story = {
    args: {
        count: 100,
        children: <DemoBox />,
    },
};

// Different positions
export const Positions: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Badge count={1} position="top-right">
                <DemoBox />
            </Badge>
            <Badge count={2} position="top-left">
                <DemoBox />
            </Badge>
            <Badge count={3} position="bottom-right">
                <DemoBox />
            </Badge>
            <Badge count={4} position="bottom-left">
                <DemoBox />
            </Badge>
        </div>
    ),
};

// Custom offsets
export const CustomOffsets: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Badge count={5} offset={-1}>
                <DemoBox />
            </Badge>
            <Badge count={5} offset={-2}>
                <DemoBox />
            </Badge>
            <Badge count={5} offset={-3}>
                <DemoBox />
            </Badge>
        </div>
    ),
};

// No badge (count undefined)
export const NoBadge: Story = {
    args: {
        children: <DemoBox />,
    },
};

// Zero count
export const ZeroCount: Story = {
    args: {
        count: 0,
        children: <DemoBox />,
    },
};

// With custom content
export const CustomContent: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Badge count={5}>
                <button
                    style={{
                        padding: '8px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                    }}
                >
                    Notifications
                </button>
            </Badge>
            <Badge count={3}>
                <img
                    src="/api/placeholder/40/40"
                    alt="Avatar"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                    }}
                />
            </Badge>
        </div>
    ),
};
