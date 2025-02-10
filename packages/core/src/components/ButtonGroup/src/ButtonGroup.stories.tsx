import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@optimacros-ui/flex';
import { Icon } from '@optimacros-ui/icon';
import { Orientation } from '@optimacros-ui/utils';
import { ButtonGroup } from '.';

const meta: Meta<typeof ButtonGroup.Root> = {
    title: 'UI Kit core/ButtonGroup',
    component: ButtonGroup.Root,
    argTypes: {
        orientation: {
            control: 'select',
            options: [Orientation.Horizontal, Orientation.Vertical],
            description: 'The orientation of the button group',
            defaultValue: Orientation.Horizontal,
        },
        as: { table: { disable: true } },
        asChild: { table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup.Root>;

export const Base: Story = {
    args: { orientation: Orientation.Horizontal },
    render: (props) => {
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
    },
};

export const Vertical: Story = {
    args: { orientation: Orientation.Vertical },
    render: Base.render,
};

export const ComplexExample: Story = {
    render: (props) => (
        <Flex direction="column" gap="4">
            <ButtonGroup.Root {...props}>
                <ButtonGroup.Item disabled>Disabled</ButtonGroup.Item>
                <ButtonGroup.Item active>Active</ButtonGroup.Item>
                <ButtonGroup.Item>Normal</ButtonGroup.Item>
            </ButtonGroup.Root>
        </Flex>
    ),
};

export const WithIcons: Story = {
    render: (props) => (
        <Flex direction="column" gap="4">
            <ButtonGroup.Root {...props}>
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

            <ButtonGroup.Root {...props}>
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
