import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Favourite } from './index';

const argTypes: Partial<ArgTypes> = {
    label: {
        control: 'text',
        description: 'The text to use for the label element.',
    },
    checked: {
        control: 'boolean',
        description: ' If `true`, component will be checked.',
    },
    onChange: {
        table: { disable: true },
    },
};

const meta: Meta<typeof Favourite> = {
    title: 'UI Kit internal/Favourite',
    component: Favourite,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Favourite>;

export const Basic: Story = {
    args: {},
};

export const Checked: Story = {
    args: {
        checked: true,
    },
};

export const Label: Story = {
    args: {
        label: 'Label',
        checked: true,
    },
};
