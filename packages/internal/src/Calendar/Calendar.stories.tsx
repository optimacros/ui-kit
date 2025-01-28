import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@optimacros-ui/kit-internal';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof Calendar> = {
    title: 'UI Kit internal/Calendar',
    component: Calendar,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const Basic: Story = {
    args: {
        value: new Date('2025-01-27T12:00:00'),
    },
};
