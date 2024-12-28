import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { TextArea } from './index';

const argTypes: Partial<ArgTypes> = {
    label: {
        control: 'text',
        description: 'The label content.',
    },
    error: {
        control: 'text',
        description: 'The error content.',
    },
    className: { table: { disable: true } },
    classNameContainer: { table: { disable: true } },
};

const meta: Meta<typeof TextArea> = {
    title: 'legacy/TextArea',
    component: TextArea,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {
    args: {
        label: 'Description',
    },
};

export const Error: Story = {
    args: {
        label: 'Description',
        error: 'Error description',
    },
};
