import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Favorite } from './index';

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

const meta: Meta<typeof Favorite> = {
    title: 'UI Kit internal/Favorite',
    component: Favorite,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Favorite>;

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
