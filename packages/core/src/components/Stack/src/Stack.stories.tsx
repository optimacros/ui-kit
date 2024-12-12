import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '.';
import React from 'react';

const meta: Meta<typeof Stack.Root> = {
    title: 'Ui kit core/Stack',
    component: Stack.Root,
    argTypes: {
        gap: {
            control: 'select',
            options: ['0', '2', '4', '8', '16', '24', '32'],
            description: 'Space between stack items using spacing tokens',
        },
        align: {
            control: 'select',
            options: ['start', 'center', 'end', 'baseline', 'stretch'],
            description: 'Cross-axis alignment of stack items',
        },
        justify: {
            control: 'select',
            options: ['start', 'center', 'end', 'between', 'around'],
            description: 'Main-axis alignment of stack items',
        },
        wrap: {
            control: 'boolean',
            description: 'Whether items should wrap to next line',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Stack.Root>;

const Box = ({
    children,
    width,
    height,
}: {
    children: React.ReactNode;
    width?: string;
    height?: string;
}) => (
    <div
        style={{
            padding: '16px',
            background: '#e2e8f0',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            width,
            height,
        }}
    >
        {children}
    </div>
);

export const HorizontalBasic: Story = {
    args: {
        gap: '8',
        align: 'center',
        justify: 'start',
        wrap: false,
    },
    render: (args) => (
        <Stack.Horizontal {...args}>
            <Box>Item 1</Box>
            <Box>Item 2</Box>
            <Box>Item 3</Box>
        </Stack.Horizontal>
    ),
};

export const VariableHeights: Story = {
    args: {
        gap: '8',
        align: 'center',
        justify: 'center',
        wrap: false,
    },
    render: (args) => (
        <Stack.Horizontal {...args}>
            <Box height="80px">Tall Item</Box>
            <Box>Normal Item</Box>
            <Box height="50px">Medium Item</Box>
        </Stack.Horizontal>
    ),
};

export const VerticalBasic: Story = {
    args: {
        gap: '8',
        align: 'stretch',
        justify: 'start',
        wrap: false,
    },
    render: (args) => (
        <Stack.Vertical {...args}>
            <Box>Top Item</Box>
            <Box>Middle Item</Box>
            <Box>Bottom Item</Box>
        </Stack.Vertical>
    ),
};

export const ResponsiveWrapping: Story = {
    args: {
        gap: '8',
        align: 'start',
        justify: 'start',
        wrap: true,
    },
    render: (args) => (
        <Stack.Horizontal {...args}>
            {Array.from({ length: 8 }, (_, i) => (
                <Box key={i} width="150px">
                    Item {i + 1}
                </Box>
            ))}
        </Stack.Horizontal>
    ),
};

export const Navigation: Story = {
    args: {
        gap: '16',
        align: 'center',
        justify: 'between',
        wrap: false,
    },
    render: (args) => (
        <Stack.Horizontal {...args}>
            <Box>Logo</Box>
            <Stack.Horizontal gap="8" align="center">
                <Box>Home</Box>
                <Box>About</Box>
                <Box>Contact</Box>
            </Stack.Horizontal>
            <Stack.Horizontal gap="8">
                <Box>Sign In</Box>
                <Box>Sign Up</Box>
            </Stack.Horizontal>
        </Stack.Horizontal>
    ),
};

export const Form: Story = {
    args: {
        gap: '16',
        align: 'stretch',
        justify: 'start',
        wrap: false,
    },
    render: (args) => (
        <Stack.Vertical {...args}>
            <Box>Username Input</Box>
            <Box>Password Input</Box>
            <Stack.Horizontal gap="8" justify="end">
                <Box>Cancel</Box>
                <Box>Submit</Box>
            </Stack.Horizontal>
        </Stack.Vertical>
    ),
};

export const Cards: Story = {
    args: {
        gap: '16',
        align: 'start',
        justify: 'start',
        wrap: true,
    },
    render: (args) => (
        <Stack.Horizontal {...args}>
            {Array.from({ length: 3 }, (_, i) => (
                <Box key={i} width="250px">
                    <Stack.Vertical gap="8">
                        <Box>Image {i + 1}</Box>
                        <Box>Title</Box>
                        <Box>Description</Box>
                        <Stack.Horizontal gap="8" justify="between">
                            <Box>Price</Box>
                            <Box>Add to Cart</Box>
                        </Stack.Horizontal>
                    </Stack.Vertical>
                </Box>
            ))}
        </Stack.Horizontal>
    ),
};
