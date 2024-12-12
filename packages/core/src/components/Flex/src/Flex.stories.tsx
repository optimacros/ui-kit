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

const Box = ({ children }: { children: ReactNode }) => (
    <div
        style={{
            padding: '20px',
            background: '#e2e8f0',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            textAlign: 'center',
        }}
    >
        {children}
    </div>
);

export const Navigation: Story = {
    args: {
        justify: 'between',
        align: 'center',
        gap: '16',
        children: (
            <>
                <Box>Logo</Box>
                <Flex gap="8">
                    <Box>Home</Box>
                    <Box>About</Box>
                    <Box>Contact</Box>
                </Flex>
            </>
        ),
    },
};

export const Gallery: Story = {
    args: {
        wrap: 'wrap',
        gap: '16',
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
