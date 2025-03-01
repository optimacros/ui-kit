import { Virtual } from '.';
import { Meta, StoryObj } from '@storybook/react';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';
import { createMockItems } from './examples/mock';

const meta: Meta<typeof Virtual.List> = {
    title: 'UI Kit core/Virtual',
    component: Virtual.List,
};

export default meta;

type Story = StoryObj<typeof Virtual.List>;

export const Basic: Story = {
    args: {
        topItemCount: 1,
        data: createMockItems(100),
    },
    render: examples.Basic,
    play: scenarios.basic,
};
