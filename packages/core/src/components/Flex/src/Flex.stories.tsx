import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '.';
import { ReactNode } from 'react';

const meta: Meta<typeof Flex> = {
    title: 'Ui kit core/Flex',
    component: Flex,
    argTypes: {
        direction: {
            control: 'select',
            options: ['row', 'column', 'row-reverse', 'column-reverse'],
            description: 'Sets the flex direction',
        },
        align: {
            control: 'select',
            options: ['start', 'center', 'end', 'stretch', 'baseline'],
            description: 'Controls align-items property',
        },
        justify: {
            control: 'select',
            options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
            description: 'Controls justify-content property',
        },
        wrap: {
            control: 'select',
            options: ['nowrap', 'wrap', 'wrap-reverse'],
            description: 'Controls flex-wrap property',
        },
        gap: {
            control: 'select',
            options: ['0', '2', '4', '8', '16', '24', '32'],
            description: 'Sets the gap between flex items using spacing tokens',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Flex>;

const Box = ({
    children,
    width,
    height,
}: { children: ReactNode; width?: string; height?: string }) => (
    <div
        style={{
            padding: '20px',
            background: '#e2e8f0',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            textAlign: 'center',
            width,
            height,
        }}
    >
        {children}
    </div>
);

export const Basic: Story = {
    args: {
        gap: '8',
        align: 'center',
        justify: 'start',
        direction: 'row',
        wrap: 'nowrap',
        children: (
            <>
                <Box>Item 1</Box>
                <Box>Item 2</Box>
                <Box>Item 3</Box>
            </>
        ),
    },
};

export const Navigation: Story = {
    args: {
        justify: 'between',
        align: 'center',
        gap: '16',
        direction: 'row',
        wrap: 'nowrap',
        children: (
            <>
                <Box>Logo</Box>
                <Flex gap="8">
                    <Box>Home</Box>
                    <Box>About</Box>
                    <Box>Contact</Box>
                </Flex>
                <Flex gap="8">
                    <Box>Sign In</Box>
                    <Box>Sign Up</Box>
                </Flex>
            </>
        ),
    },
};

export const Gallery: Story = {
    args: {
        wrap: 'wrap',
        gap: '16',
        justify: 'start',
        align: 'start',
        direction: 'row',
        children: (
            <>
                {Array.from({ length: 6 }, (_, i) => (
                    <Box key={i} style={{ flex: '1 1 200px' }}>
                        Image {i + 1}
                    </Box>
                ))}
            </>
        ),
    },
};

export const StackedForm: Story = {
    args: {
        direction: 'column',
        gap: '8',
        align: 'stretch',
        justify: 'start',
        wrap: 'nowrap',
        children: (
            <>
                <Box>Username Input</Box>
                <Box>Password Input</Box>
                <Flex gap="8" justify="end">
                    <Box>Cancel</Box>
                    <Box>Submit</Box>
                </Flex>
            </>
        ),
    },
};

export const VariableHeights: Story = {
    args: {
        gap: '8',
        align: 'center',
        justify: 'center',
        direction: 'row',
        wrap: 'nowrap',
        children: (
            <>
                <Box height="80px">Tall Item</Box>
                <Box>Normal Item</Box>
                <Box height="50px">Medium Item</Box>
            </>
        ),
    },
};

export const ResponsiveCards: Story = {
    args: {
        gap: '16',
        wrap: 'wrap',
        justify: 'center',
        align: 'stretch',
        direction: 'row',
        children: (
            <>
                {Array.from({ length: 3 }, (_, i) => (
                    <Box key={i} width="250px">
                        <Flex direction="column" gap="8">
                            <Box>Image {i + 1}</Box>
                            <Box>Title</Box>
                            <Box>Description</Box>
                            <Flex gap="8" justify="between">
                                <Box>Price</Box>
                                <Box>Add to Cart</Box>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </>
        ),
    },
};

export const Dashboard: Story = {
    args: {
        direction: 'row',
        gap: '16',
        align: 'stretch',
        wrap: 'wrap',
        justify: 'between',
        children: (
            <>
                <Box width="65%">Main Content</Box>
                <Flex direction="column" gap="16" style={{ width: '30%' }}>
                    <Box>Sidebar Item 1</Box>
                    <Box>Sidebar Item 2</Box>
                    <Box>Sidebar Item 3</Box>
                </Flex>
            </>
        ),
    },
};
