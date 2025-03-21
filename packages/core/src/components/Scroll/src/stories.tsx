import { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { Orientation } from '@optimacros-ui/utils';
import * as examples from './examples';
import { Scroll } from './index';
import { Flex } from '@optimacros-ui/flex';

const argTypes: Partial<ArgTypes> = {
    orientation: {
        control: 'radio',
        options: ['horizontal', 'vertical'],
        table: {
            defaultValue: { summary: 'vertical' },
        },
        description: 'The orientation of the scroll',
    },
};

const meta: Meta<typeof Scroll.Root> = {
    title: 'UI Kit core/Scroll',
    component: Scroll.Root,
    argTypes,
    decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof Scroll.Root>;

const getTags = (length) =>
    Array.from({ length: length }).map((_, i, a) => (
        <div key={i}>{`v1.2.0-beta.${a.length - i}`}</div>
    ));

export const Basic: Story = {
    render: () => (
        <div style={{ width: '200px', height: '300px' }}>
            <examples.Basic>{getTags(1600)}</examples.Basic>
        </div>
    ),
};

export const Horizontal: Story = {
    args: { orientation: Orientation.Horizontal },
    render: (args) => (
        <div style={{ width: '300px' }}>
            <examples.Horizontal {...args}>{getTags(1600)}</examples.Horizontal>
        </div>
    ),
};

export const DifferentContentSize: Story = {
    render: () => (
        <Flex direction="row" gap={16} style={{ height: '300px', width: '800px' }}>
            <examples.Basic> {getTags(200)}</examples.Basic>
            <examples.Basic> {getTags(26)}</examples.Basic>
            <examples.Basic> {getTags(14)}</examples.Basic>
        </Flex>
    ),
};
