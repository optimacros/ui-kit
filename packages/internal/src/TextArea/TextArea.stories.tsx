import { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './index';

const meta: Meta<typeof TextArea> = {
    title: 'UI Kit internal/TextArea',
    component: TextArea,
    tags: ['autodocs'],
    argTypes: {
        error: {
            control: 'text',
            description: 'Error message or element to display',
        },
        label: {
            control: 'text',
            description: 'Label text for the textarea',
            required: true,
        },
        className: {
            control: 'text',
            description: 'Additional CSS class for the textarea',
        },
        classNameContainer: {
            control: 'text',
            description: 'Additional CSS class for the container',
        },
        id: {
            control: 'text',
            description: 'ID attribute for the textarea',
        },
        readonly: {
            control: 'boolean',
            description: 'Whether the textarea is read-only',
        },
    },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {
    args: {},
};

export const Label: Story = {
    args: {
        label: 'Description',
    },
};

export const WithText: Story = {
    args: {
        label: 'Description',
        value: 'Eat those soft French buns and have some tea',
    },
};

export const WithError: Story = {
    args: {
        label: 'Error Description',
        error: 'This field has an error',
    },
};

export const ReadOnly: Story = {
    args: {
        label: 'Read-only Description',
        readonly: true,
    },
};
