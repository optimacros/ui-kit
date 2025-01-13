import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Calendar } from './index';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof Calendar> = {
    title: 'legacy/Calendar',
    component: Calendar,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const Basic: Story = {
    args: {},
};
