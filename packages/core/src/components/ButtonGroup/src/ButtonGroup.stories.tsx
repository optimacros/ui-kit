//@ts-nocheck

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from '.';
import { Flex } from '@optimacros-ui/flex';
import { Icon } from '@optimacros-ui/icon';
import { Orientation } from '@optimacros-ui/utils';

const meta: Meta<typeof ButtonGroup.Root> = {
    title: 'UI Kit core/ButtonGroup',
    component: ButtonGroup.Root,
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: 'select',
            options: [Orientation.Horizontal, Orientation.Vertical],
            description: 'The orientation of the button group',
            defaultValue: Orientation.Horizontal,
        },
    },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup.Root>;

export const Base: Story = {
    render: (args) => (
        <ButtonGroup.Root {...args}>
            <ButtonGroup.Item>First</ButtonGroup.Item>
            <ButtonGroup.Item>Second</ButtonGroup.Item>
            <ButtonGroup.Item>Third</ButtonGroup.Item>
        </ButtonGroup.Root>
    ),
    args: {
        orientation: Orientation.Horizontal,
    },
};

export const Vertical: Story = {
    render: () => (
        <ButtonGroup.Root orientation={Orientation.Vertical}>
            <ButtonGroup.Item>Top</ButtonGroup.Item>
            <ButtonGroup.Item>Middle</ButtonGroup.Item>
            <ButtonGroup.Item>Bottom</ButtonGroup.Item>
        </ButtonGroup.Root>
    ),
};

export const WithDisabledItems: Story = {
    render: () => (
        <Flex direction="column" gap="4">
            <ButtonGroup.Root>
                <ButtonGroup.Item>Enabled</ButtonGroup.Item>
                <ButtonGroup.Item disabled>Disabled</ButtonGroup.Item>
                <ButtonGroup.Item>Enabled</ButtonGroup.Item>
            </ButtonGroup.Root>
        </Flex>
    ),
};

export const WithActiveItems: Story = {
    render: () => (
        <Flex direction="column" gap="4">
            <ButtonGroup.Root>
                <ButtonGroup.Item>Normal</ButtonGroup.Item>
                <ButtonGroup.Item active>Active</ButtonGroup.Item>
                <ButtonGroup.Item>Normal</ButtonGroup.Item>
            </ButtonGroup.Root>
        </Flex>
    ),
};

export const ComplexExample: Story = {
    render: () => (
        <Flex direction="column" gap="4">
            <ButtonGroup.Root>
                <ButtonGroup.Item disabled>Normal</ButtonGroup.Item>
                <ButtonGroup.Item active>Active</ButtonGroup.Item>
                <ButtonGroup.Item>Normal</ButtonGroup.Item>
            </ButtonGroup.Root>
        </Flex>
    ),
};

export const WithIcons: Story = {
    render: () => (
        <Flex direction="column" gap="4">
            <ButtonGroup.Root>
                <ButtonGroup.Item aria-label="Bold">
                    <Icon value="format_bold" />
                </ButtonGroup.Item>
                <ButtonGroup.Item aria-label="Italic">
                    <Icon value="format_italic" />
                </ButtonGroup.Item>
                <ButtonGroup.Item aria-label="Underline">
                    <Icon value="format_underline" />
                </ButtonGroup.Item>
            </ButtonGroup.Root>

            <ButtonGroup.Root>
                <ButtonGroup.Item>
                    <Icon value="format_align_left" />
                    Left
                </ButtonGroup.Item>
                <ButtonGroup.Item>
                    <Icon value="format_align_center" />
                    Center
                </ButtonGroup.Item>
                <ButtonGroup.Item>
                    <Icon value="format_align_right" />
                    Right
                </ButtonGroup.Item>
            </ButtonGroup.Root>
        </Flex>
    ),
};

export const InteractiveExample: Story = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <ButtonGroup.Root {...props}>
            {['First', 'Second', 'Third'].map((label, index) => (
                <ButtonGroup.Item
                    key={label}
                    active={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                >
                    {label}
                </ButtonGroup.Item>
            ))}
        </ButtonGroup.Root>
    );
};
