import type { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { IconButton } from '.';
import { Flex } from '@optimacros-ui/flex';
import { ComponentProps } from 'react';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';

const argTypes: ArgTypes<ComponentProps<typeof IconButton>> = {
    variant: {
        control: 'select',
        options: ['primary', 'accent', 'bordered', 'neutral', 'transparent'],
        description: 'Controls the visual style variant of the button',
        table: { defaultValue: { summary: 'neutral' } },
    },
    float: {
        control: 'select',
        options: ['raised', 'floating', 'flat'],
        description: 'Determines the elevation style of the button',
        table: { defaultValue: { summary: 'flat' } },
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
        table: { defaultValue: { summary: 'md' } },
    },
    icon: {
        control: 'text',
        description: 'Icon name to display',
        type: { name: 'string', required: true },
        table: { type: { summary: 'string | ReactNode' } },
    },
    squared: {
        control: 'boolean',
        description: 'If true, the button will have square corners instead of rounded ones',
        table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
        control: 'boolean',
        description: 'If true, the button will be disabled',
        table: { defaultValue: { summary: 'false' } },
    },
    inverse: {
        control: 'boolean',
        description: 'If true, the button will use inverse colors for dark themes',
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
    className: {
        control: 'text',
        description: 'Additional CSS class',
    },

    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
    uppercase: { table: { disable: true } },
};

const meta: Meta<typeof IconButton> = {
    title: 'UI Kit core/IconButton',
    component: IconButton,
    argTypes,
    tags: ['skip-test-runner'],
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Base: Story = {
    args: {
        icon: 'bookmark',
        variant: 'primary',
        size: 'md',
        className: 'className',
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

export const Link: Story = {
    args: {
        icon: 'bookmark',
        target: '_blank',
        href: 'https://optimacros.com',
    },
    play: scenarios.link,
    tags: ['!skip-test-runner'],
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
            <IconButton disabled variant="primary" icon="bookmark" />
            <IconButton disabled variant="accent" icon="bookmark" />
            <IconButton disabled variant="bordered" icon="bookmark" />
            <IconButton disabled variant="neutral" icon="bookmark" />
            <IconButton disabled variant="transparent" icon="bookmark" />
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

export const AllTogether: Story = {
    render: stories.AllTogether,
    tags: ['!skip-test-runner'],
};

export const AllTogetherHover: Story = {
    parameters: { pseudo: { hover: true } },
    render: stories.AllTogether,
    tags: ['!skip-test-runner'],
};
