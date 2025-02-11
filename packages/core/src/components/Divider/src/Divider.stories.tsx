import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { Icon } from '@optimacros-ui/icon';
import { Orientation } from '@optimacros-ui/utils';
import { Divider, DividerProps } from './Divider';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const argTypes: ArgTypes<DividerProps> = {
    orientation: {
        control: { type: 'radio' },
        options: [Orientation.Horizontal, Orientation.Vertical],
        description: 'Orientation',
        table: {
            type: { summary: `Orientation` },
            defaultValue: { summary: `Orientation.Horizontal` },
        },
    },
    fluid: {
        control: 'boolean',
        description: 'Whether component has 100% width/height',
        table: {
            defaultValue: { summary: `false` },
        },
    },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
};

const meta: Meta<typeof Divider> = {
    title: 'UI Kit core/Divider',
    component: Divider,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Base: Story = {
    args: { orientation: Orientation.Horizontal, fluid: false },
};

export const Vertical: Story = {
    args: { orientation: Orientation.Vertical },
    render: (props) => {
        return (
            <Flex gap="3" align="center">
                <Icon value="format_align_left" />
                <Icon value="format_align_center" />
                <Icon value="format_align_right" />
                <Divider {...props} />
                <Icon value="format_bold" />
            </Flex>
        );
    },
};

export const HorizontalFluid: Story = {
    args: { orientation: Orientation.Horizontal, fluid: true },
    render: (props) => {
        return (
            <div style={{ width: '200px' }}>
                <Flex align="center" direction="column">
                    <Text.Paragraph>Full width variant below</Text.Paragraph>
                    <Divider {...props} />
                    <Text.Paragraph>Inset variant below</Text.Paragraph>
                    <Divider {...props} />
                    <Text.Paragraph>Middle variant below</Text.Paragraph>
                </Flex>
            </div>
        );
    },
};
