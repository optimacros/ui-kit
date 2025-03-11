import { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { Orientation } from '@optimacros-ui/utils';
import * as examples from './examples';
import { Scroll } from './index';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof Scroll.Root> = {
    title: 'UI Kit core/Scroll',
    component: Scroll.Root,
    argTypes,
    decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof Scroll.Root>;

export const Basic: Story = {
    render: examples.Basic,
};

export const Horizontal: Story = {
    args: { orientation: Orientation.Horizontal },
    render: examples.Horizontal,
};
