import { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectBox } from '.';

const meta: Meta<typeof SelectBox> = {
    title: 'UI Kit internal/SelectBox',
    component: SelectBox,
    tags: ['autodocs'],
    argTypes: {
        theme: {
            control: 'object',
            description: 'Theme customization object for SelectBox and Input',
        },
        multiSelect: {
            control: 'boolean',
            description: 'Enable multiple selection mode',
            defaultValue: false,
        },
        onChange: {
            action: 'changed',
            description: 'Handler called when selection changes',
        },
        options: {
            control: 'object',
            description: 'Array of options for selection',
        },
        source: {
            control: 'object',
            description: 'Source items array',
        },
        labelKey: {
            control: 'text',
            description: 'Key for label in source items',
            defaultValue: 'label',
        },
        valueKey: {
            control: 'text',
            description: 'Key for value in source items',
            defaultValue: 'value',
        },
        name: {
            control: 'text',
            description: 'Input name attribute',
        },
        label: {
            control: 'text',
            description: 'Label text for the select box',
        },
        value: {
            control: 'object',
            description: 'Selected value(s)',
        },
        allowBlank: {
            control: 'boolean',
            description: 'Allow empty selection',
            defaultValue: false,
        },
        auto: {
            control: 'boolean',
            description: 'Enable auto-completion',
            defaultValue: false,
        },
        className: {
            control: 'text',
            description: 'Additional CSS class',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the select box',
            defaultValue: false,
        },
        error: {
            control: 'text',
            description: 'Error message to display',
        },
        required: {
            control: 'boolean',
            description: 'Mark field as required',
            defaultValue: false,
        },
    },
    args: {
        onChange: undefined,
    },
};

export default meta;

type Story = StoryObj<typeof SelectBox>;

const defaultSource = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
];

const customSource = [
    { title: 'One', key: 1 },
    { title: 'Two', key: 2 },
];

const sourceWithNull = [{ label: 'Не выбрано', value: null }];

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px' }}>{children}</div>
);

export const Basic: Story = {
    args: {
        source: defaultSource,
        label: 'Select an option',
    },
    render: (args) => (
        <Wrapper>
            <SelectBox {...args} />
        </Wrapper>
    ),
};

export const DefaultValue: Story = {
    args: {
        source: defaultSource,
        label: 'Select an option',
        value: '2',
    },
    render: (args) => (
        <Wrapper>
            <SelectBox {...args} />
        </Wrapper>
    ),
};

export const SourceWithNull: Story = {
    args: {
        source: sourceWithNull,
        label: 'Select an option',
        value: null,
    },
    render: (args) => (
        <Wrapper>
            <SelectBox {...args} />
        </Wrapper>
    ),
};

export const MultiSelect: Story = {
    args: {
        source: defaultSource,
        label: 'Select multiple options',
        multiSelect: true,
    },
    render: (args) => (
        <Wrapper>
            <SelectBox {...args} />
        </Wrapper>
    ),
};

export const CustomSource: Story = {
    args: {
        name: 'sort',
        label: 'Sort',
        labelKey: 'title',
        valueKey: 'key',
        source: customSource,
    },
    render: (args) => (
        <Wrapper>
            <SelectBox {...args} />
        </Wrapper>
    ),
};

export const Required: Story = {
    args: {
        source: defaultSource,
        label: 'Required field',
        required: true,
    },
    render: (args) => (
        <Wrapper>
            <SelectBox {...args} />
        </Wrapper>
    ),
};

export const Error: Story = {
    args: {
        source: defaultSource,
        label: 'Select with error',
        error: 'This field has an error',
    },
    render: (args) => (
        <Wrapper>
            <SelectBox {...args} />
        </Wrapper>
    ),
};

export const Disabled: Story = {
    args: {
        source: defaultSource,
        label: 'Disabled select',
        disabled: true,
    },
    render: (args) => (
        <Wrapper>
            <SelectBox {...args} />
        </Wrapper>
    ),
};

export const Placeholder: Story = {
    args: {
        source: defaultSource,
        label: 'Select',
        placeholder: 'Placeholder',
    },
    render: (args) => (
        <Wrapper>
            <SelectBox {...args} />
        </Wrapper>
    ),
};
