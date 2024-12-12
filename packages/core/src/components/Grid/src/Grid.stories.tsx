import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '.';
import React from 'react';

const meta: Meta<typeof Grid.Root> = {
    title: 'Layout/Grid',
    component: Grid.Root,
    argTypes: {
        cols: {
            control: 'select',
            options: ['1', '2', '3', '4', '5', '6', '12'],
            description: 'Number of columns in the grid',
        },
        rows: {
            control: 'select',
            options: ['1', '2', '3', '4', '5', '6'],
            description: 'Number of rows in the grid',
        },
        gap: {
            control: 'select',
            options: ['0', '2', '4', '8', '16', '24', '32'],
            description: 'Gap between grid items using spacing tokens',
        },
        align: {
            control: 'select',
            options: ['start', 'center', 'end', 'stretch', 'baseline'],
            description: 'Vertical alignment of grid items',
        },
        justify: {
            control: 'select',
            options: ['start', 'center', 'end', 'stretch'],
            description: 'Horizontal alignment of grid items',
        },
        flow: {
            control: 'select',
            options: ['row', 'column', 'dense'],
            description: 'Grid auto flow direction',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Grid.Root>;

const Box = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            padding: '20px',
            background: '#e2e8f0',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            textAlign: 'center',
            height: '100%',
        }}
    >
        {children}
    </div>
);

export const BasicGrid: Story = {
    render: () => (
        <Grid.Root cols="3" gap="16">
            {Array.from({ length: 9 }, (_, i) => (
                <Grid.Item key={i}>
                    <Box>Item {i + 1}</Box>
                </Grid.Item>
            ))}
        </Grid.Root>
    ),
};

export const ResponsiveLayout: Story = {
    render: () => (
        <Grid.Root cols="4" gap="16">
            <Grid.Item colSpan="2">
                <Box>Featured Content</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Sidebar Item 1</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Sidebar Item 2</Box>
            </Grid.Item>
            <Grid.Item colSpan="4">
                <Box>Full Width Content</Box>
            </Grid.Item>
        </Grid.Root>
    ),
};

export const DashboardLayout: Story = {
    render: () => (
        <Grid.Root cols="3" rows="2" gap="16" align="stretch">
            <Grid.Item colSpan="2">
                <Box>Main Chart</Box>
            </Grid.Item>
            <Grid.Item rowSpan="2">
                <Box>Sidebar Stats</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Metric 1</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Metric 2</Box>
            </Grid.Item>
        </Grid.Root>
    ),
};

export const DenseLayout: Story = {
    render: () => (
        <Grid.Root cols="3" flow="dense" gap="16">
            <Grid.Item colSpan="2" rowSpan="2">
                <Box>Featured Image</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Title</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Description</Box>
            </Grid.Item>
            <Grid.Item colSpan="3">
                <Box>Footer Content</Box>
            </Grid.Item>
        </Grid.Root>
    ),
};
