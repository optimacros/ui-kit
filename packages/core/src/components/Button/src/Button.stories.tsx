import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';
import { Flex } from '@optimacros-ui/flex';
import content from './Button?raw';

const meta: Meta<typeof Button> = {
    title: 'UI Kit core/Button',
    component: Button,
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'accent', 'bordered', 'neutral', 'transparent'],
            description: 'Controls the visual style variant of the button',
            table: {
                defaultValue: { summary: 'primary' },
                type: { summary: 'primary | accent | bordered | neutral | transparent' },
            },
        },
        float: {
            control: 'select',
            options: ['raised', 'floating', 'flat'],
            description: 'Determines the elevation style of the button',
            table: {
                defaultValue: { summary: 'flat' },
                type: { summary: 'raised | floating | flat' },
            },
        },
        status: {
            control: 'select',
            options: ['warning', 'error', 'success'],
            description: 'Sets the status/state color of the button',
            table: {
                defaultValue: { summary: '-' },
                type: { summary: 'warning | error | success' },
            },
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md'],
            description: 'Controls the size of the button',
            table: {
                defaultValue: { summary: 'md' },
                type: { summary: 'xs | sm | md' },
            },
        },
        squared: {
            control: 'boolean',
            description: 'If true, the button will have square corners instead of rounded ones',
            table: { defaultValue: { summary: 'false' } },
        },
        uppercase: {
            control: 'boolean',
            description: 'If true, the button text will be uppercase',
            table: { defaultValue: { summary: 'false' } },
        },
        inverse: {
            control: 'boolean',
            description: 'If true, the button will use inverse colors for dark themes',
            table: { defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: 'boolean',
            description: 'If true, the button will be disabled',
            table: { defaultValue: { summary: 'false' } },
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
    parameters: {
        docs: { source: { code: content } },
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
    parameters: {
        storySource: { source: content },
    },
};

export const Variants: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <Button variant="primary" data-testid="primary" id="one">
                Primary
            </Button>
            <Button variant="accent" data-testid="accent">
                Accent
            </Button>
            <Button variant="bordered">Bordered</Button>
            <Button variant="neutral">Neutral</Button>
            <Button variant="gray">Gray</Button>
            <Button variant="transparent">Transparent</Button>
            <Button inverse>Inverse</Button>
        </Flex>
    ),
};

export const VariantsHover: Story = {
    parameters: { pseudo: { hover: true } },
    render: () => (
        <Flex align="center" gap="4">
            <Button variant="primary" data-testid="primary" id="one">
                Primary
            </Button>
            <Button variant="accent" data-testid="accent">
                Accent
            </Button>
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
