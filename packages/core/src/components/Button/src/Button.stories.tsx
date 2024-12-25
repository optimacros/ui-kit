import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Flex } from '@optimacros-ui/flex';

const meta: Meta<typeof Button> = {
    title: 'UI Kit core/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'accent', 'bordered', 'neutral', 'transparent'],
            description: 'Controls the visual style variant of the button',
            defaultValue: 'primary',
        },
        float: {
            control: 'select',
            options: ['raised', 'floating', 'flat'],
            description: 'Determines the elevation style of the button',
            defaultValue: 'flat',
        },
        status: {
            control: 'select',
            options: ['warning', 'error', 'success'],
            description: 'Sets the status/state color of the button',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md'],
            description: 'Controls the size of the button',
            defaultValue: 'md',
        },
        squared: {
            control: 'boolean',
            description: 'If true, the button will have square corners instead of rounded ones',
            defaultValue: false,
        },
        uppercase: {
            control: 'boolean',
            description: 'If true, the button text will be uppercase',
            defaultValue: false,
        },
        inverse: {
            control: 'boolean',
            description: 'If true, the button will use inverse colors for dark themes',
            defaultValue: false,
        },
        disabled: {
            control: 'boolean',
            description: 'If true, the button will be disabled',
            defaultValue: false,
        },
        href: {
            control: 'text',
            description: 'Optional URL if the button should act as a link',
        },
        target: {
            control: 'text',
            description: 'Target attribute for link buttons',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Base: Story = {
    args: {
        children: 'Button',
        variant: 'primary',
        size: 'md',
    },
};

export const Variants: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <Button variant="primary">Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="bordered">Bordered</Button>
            <Button variant="neutral">Neutral</Button>
            <Button variant="gray">Gray</Button>
            <Button variant="transparent">Transparent</Button>
            <Button inverse>Inverse</Button>
        </Flex>
    ),
};

export const FloatStyles: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <Button float="raised">Raised</Button>
            <Button float="floating">Floating</Button>
            <Button float="flat">Flat</Button>
        </Flex>
    ),
};

export const StatusStates: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <Button status="success">Success</Button>
            <Button status="warning">Warning</Button>
            <Button status="error">Error</Button>
        </Flex>
    ),
};

export const Sizes: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
        </Flex>
    ),
};

export const SquaredButtons: Story = {
    render: () => (
        <Flex align="center" gap="8">
            <Button squared>Squared</Button>
            <Button squared variant="accent">
                Accent
            </Button>
            <Button squared variant="bordered">
                Bordered
            </Button>
        </Flex>
    ),
};

export const UppercaseButtons: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <Button uppercase>Uppercase Text</Button>
            <Button uppercase variant="accent">
                Uppercase Accent
            </Button>
        </Flex>
    ),
};

export const LinkButtons: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <Button href="https://example.com">Internal Link</Button>
            <Button href="https://example.com" target="_blank">
                External Link
            </Button>
        </Flex>
    ),
};

export const DisabledStates: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <Button disabled>Disabled Primary</Button>
            <Button disabled variant="accent">
                Disabled Accent
            </Button>
            <Button disabled variant="bordered">
                Disabled Bordered
            </Button>
        </Flex>
    ),
};

export const CombinedFeatures: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <Button variant="accent" float="floating" size="sm" uppercase>
                Combined Features
            </Button>
            <Button variant="bordered" status="success" float="raised" size="xs" uppercase>
                Success State
            </Button>
        </Flex>
    ),
};
