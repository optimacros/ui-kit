import type { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { Grid } from '.';
import { ComponentProps } from 'react';
import type React from 'react';

const argTypes: ArgTypes<ComponentProps<typeof Grid.Root>> = {
    cols: {
        control: 'select',
        options: ['1', '2', '3', '4', '5', '6', '12'],
        description: 'Number of columns in the grid',
        table: { defaultValue: { summary: '1' } },
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
        table: { defaultValue: { summary: '0' } },
    },
    align: {
        control: 'select',
        options: ['start', 'center', 'end', 'stretch', 'baseline'],
        description: 'Vertical alignment of grid items',
        table: { defaultValue: { summary: 'stretch' } },
    },
    justify: {
        control: 'select',
        options: ['start', 'center', 'end', 'stretch'],
        description: 'Horizontal alignment of grid items',
        table: { defaultValue: { summary: 'stretch' } },
    },
    flow: {
        control: 'select',
        options: ['row', 'column', 'dense'],
        description: 'Grid auto flow direction',
        table: { defaultValue: { summary: 'row' } },
    },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
};

const meta: Meta<typeof Grid.Root> = {
    title: 'Ui kit core/Grid',
    component: Grid.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Grid.Root>;

const Box = ({ children, height }: { children: React.ReactNode; height?: string }) => (
    <div
        style={{
            padding: '20px',
            background: '#e2e8f0',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            textAlign: 'center',
            height: height || '100%',
        }}
    >
        {children}
    </div>
);

export const BasicGrid: Story = {
    args: {
        cols: '3',
        rows: '3',
        gap: '16',
        align: 'stretch',
        justify: 'stretch',
        flow: 'row',
    },
    render: (args) => (
        <Grid.Root {...args}>
            {Array.from({ length: 8 }, (_, i) => (
                <Grid.Item key={i}>
                    <Box>Item {i + 1}</Box>
                </Grid.Item>
            ))}
        </Grid.Root>
    ),
};

export const Column: Story = {
    args: {
        cols: '3',
        rows: '3',
        gap: '16',
        align: 'stretch',
        justify: 'stretch',
        flow: 'column',
    },
    render: (args) => (
        <Grid.Root {...args}>
            {Array.from({ length: 8 }, (_, i) => (
                <Grid.Item key={i}>
                    <Box>Item {i + 1}</Box>
                </Grid.Item>
            ))}
        </Grid.Root>
    ),
};

export const ResponsiveLayout: Story = {
    args: {
        cols: '4',
        gap: '16',
        align: 'stretch',
        justify: 'stretch',
        flow: 'row',
    },
    render: (args) => (
        <Grid.Root {...args}>
            <Grid.Item colSpan="2">
                <Box>Featured Content</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Sidebar Item 1</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Sidebar Item 2</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Sidebar Item 3</Box>
            </Grid.Item>
            <Grid.Item colSpan="4">
                <Box>Full Width Content</Box>
            </Grid.Item>
        </Grid.Root>
    ),
};

export const DashboardLayout: Story = {
    args: {
        cols: '3',
        rows: '2',
        gap: '16',
        align: 'stretch',
        justify: 'stretch',
        flow: 'row',
    },
    render: (args) => (
        <Grid.Root {...args}>
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
    tags: ['skip-test-runner'],
};

export const DenseLayout: Story = {
    args: {
        cols: '3',
        gap: '16',
        align: 'stretch',
        justify: 'stretch',
        flow: 'dense',
    },
    render: (args) => (
        <Grid.Root {...args}>
            <Grid.Item colSpan="2">
                <Box>Item 1</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Item 2</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Item 3</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Item 4</Box>
            </Grid.Item>
            <Grid.Item colSpan="4">
                <Box>Item 5</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Item 6</Box>
            </Grid.Item>
            <Grid.Item colSpan="2">
                <Box>Item 7</Box>
            </Grid.Item>
            <Grid.Item>
                <Box>Item 8</Box>
            </Grid.Item>
        </Grid.Root>
    ),
};

export const Gallery: Story = {
    args: {
        cols: '3',
        gap: '16',
        align: 'stretch',
        justify: 'stretch',
        flow: 'row',
    },
    render: (args) => (
        <Grid.Root {...args}>
            <Grid.Item>
                <Box height="150px">Image 1</Box>
            </Grid.Item>
            <Grid.Item colSpan="2">
                <Box height="150px">Featured Image</Box>
            </Grid.Item>
            <Grid.Item>
                <Box height="150px">Image 3</Box>
            </Grid.Item>
            <Grid.Item>
                <Box height="150px">Image 4</Box>
            </Grid.Item>
            <Grid.Item>
                <Box height="150px">Image 5</Box>
            </Grid.Item>
        </Grid.Root>
    ),
    tags: ['skip-test-runner'],
};

export const HolyGrail: Story = {
    args: {
        cols: '12',
        gap: '16',
        rows: '3',
        align: 'stretch',
        justify: 'stretch',
        flow: 'row',
    },
    render: (args) => (
        <Grid.Root {...args}>
            <Grid.Item colSpan="12">
                <Box>Header</Box>
            </Grid.Item>
            <Grid.Item colSpan="3">
                <Box>Left Sidebar</Box>
            </Grid.Item>
            <Grid.Item colSpan="6">
                <Box>Main Content</Box>
            </Grid.Item>
            <Grid.Item colSpan="3">
                <Box>Right Sidebar</Box>
            </Grid.Item>
            <Grid.Item colSpan="12">
                <Box>Footer</Box>
            </Grid.Item>
        </Grid.Root>
    ),
    tags: ['skip-test-runner'],
};

export const CardGrid: Story = {
    args: {
        cols: '3',
        gap: '16',
        align: 'stretch',
        justify: 'stretch',
        flow: 'row',
    },
    render: (args) => (
        <Grid.Root {...args}>
            {Array.from({ length: 6 }, (_, i) => (
                <Grid.Item key={i}>
                    <Box>
                        <Grid.Root cols="1" gap="8">
                            <Grid.Item>
                                <Box>Image {i + 1}</Box>
                            </Grid.Item>
                            <Grid.Item>
                                <Box>Title</Box>
                            </Grid.Item>
                            <Grid.Item>
                                <Box>Description</Box>
                            </Grid.Item>
                        </Grid.Root>
                    </Box>
                </Grid.Item>
            ))}
        </Grid.Root>
    ),
    tags: ['skip-test-runner'],
};
