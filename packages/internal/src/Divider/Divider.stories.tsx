import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Divider } from './index';

const argTypes: Partial<ArgTypes> = {
    vertical: {
        control: 'boolean',
        description: 'If `true`, divider will be vertical.',
    },
};

const meta: Meta<typeof Divider> = {
    title: 'UI Kit internal/Divider',
    component: Divider,
    argTypes,
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
    args: {
        vertical: false,
    },
};

export const Vertical: Story = {
    args: {
        vertical: true,
    },
};
