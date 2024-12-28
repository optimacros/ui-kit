import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Flex } from '@optimacros-ui/flex';

const meta: Meta<typeof IconButton> = {
    title: 'UI Kit core/IconButton',
    component: IconButton,
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
        icon: {
            control: 'text',
            description: 'Icon name to display',
            defaultValue: 'bookmark',
        },
        squared: {
            control: 'boolean',
            description: 'If true, the button will have square corners instead of rounded ones',
            defaultValue: false,
        },
        disabled: {
            control: 'boolean',
            description: 'If true, the button will be disabled',
            defaultValue: false,
        },
        inverse: {
            control: 'boolean',
            description: 'If true, the button will use inverse colors for dark themes',
            defaultValue: false,
        },
    },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Base: Story = {
    args: {
        icon: 'bookmark',
        variant: 'primary',
        size: 'md',
    },
};

export const Variants: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <IconButton variant="primary" icon="bookmark" />
            <IconButton variant="accent" icon="bookmark" />
            <IconButton variant="bordered" icon="bookmark" />
            <IconButton variant="neutral" icon="bookmark" />
            <IconButton variant="transparent" icon="bookmark" />
        </Flex>
    ),
};

export const FloatStyles: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <IconButton float="raised" icon="bookmark" />
            <IconButton float="floating" icon="bookmark" />
            <IconButton float="flat" icon="bookmark" />
        </Flex>
    ),
};

export const StatusStates: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <IconButton status="success" icon="bookmark" />
            <IconButton status="warning" icon="bookmark" />
            <IconButton status="error" icon="bookmark" />
        </Flex>
    ),
};

export const Sizes: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <IconButton size="xs" icon="bookmark" />
            <IconButton size="sm" icon="bookmark" />
            <IconButton size="md" icon="bookmark" />
        </Flex>
    ),
};

export const SquaredButtons: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <IconButton squared icon="bookmark" />
            <IconButton squared variant="accent" icon="bookmark" />
            <IconButton squared variant="bordered" icon="bookmark" />
        </Flex>
    ),
};

export const DisabledStates: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <IconButton disabled icon="bookmark" />
            <IconButton disabled variant="accent" icon="bookmark" />
            <IconButton disabled variant="bordered" icon="bookmark" />
        </Flex>
    ),
};

export const MultipleIcons: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <IconButton icon="bookmark" variant="primary" />
            <IconButton icon="star" variant="accent" />
            <IconButton icon="settings" variant="bordered" />
            <IconButton icon="notifications" variant="neutral" />
            <IconButton icon="favorite" variant="transparent" />
        </Flex>
    ),
};

export const CombinedFeatures: Story = {
    render: () => (
        <Flex align="center" gap="4">
            <IconButton variant="accent" float="floating" size="sm" squared icon="bookmark" />
            <IconButton variant="bordered" status="success" float="raised" size="xs" icon="star" />
        </Flex>
    ),
};
