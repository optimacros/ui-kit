import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from '../RadioButton';
import { RadioGroup } from '.';

const meta: Meta<typeof RadioGroup> = {
    title: 'UI Kit internal/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    argTypes: {
        options: {
            control: 'object',
            description: 'Array of options for radio buttons',
        },
        classNameButton: {
            control: 'text',
            description: 'Additional CSS class for radio buttons',
        },
        children: {
            control: false,
            description: 'Custom content inside radio group',
        },
        theme: {
            control: 'object',
            description: 'Theme customization object',
        },
        onChange: {
            action: 'changed',
            description: 'Handler called when selection changes',
        },
    },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const defaultOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
];

export const Basic: Story = {
    args: {
        options: defaultOptions,
    },
};

export const WithRadioButton: Story = {
    args: {
        children: [
            <RadioButton key={1} label="Radio 1" value="1" />,
            <RadioButton key={2} label="Radio 2" value="2" />,
        ],
    },
};

export const WithCustomOptions: Story = {
    args: {
        options: [
            { value: 'apple', label: '🍎 Apple' },
            { value: 'banana', label: '🍌 Banana' },
            { value: 'orange', label: '🍊 Orange' },
        ],
    },
};
