import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Divider } from './index';

const argTypes: Partial<ArgTypes> = {
    vertical: {
        control: 'boolean',
        description: 'If `true`, divider will be vertical.',
    },
};

const meta: Meta<typeof Divider> = {
    title: 'legacy/Divider',
    component: Divider,
    argTypes,
    tags: ['skip-test-runner'],
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
