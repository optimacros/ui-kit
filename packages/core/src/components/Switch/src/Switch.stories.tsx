import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Switch } from '.';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';
import { ComponentProps } from 'react';
import { fn } from '@storybook/test';

const argTypes: Partial<ArgTypes<ComponentProps<typeof Switch.Root>>> = {
    checked: {
        control: 'boolean',
        description: 'Whether the switch is checked.',
    },
    defaultChecked: {
        control: 'boolean',
        description: 'Whether the switch is checked.',
    },
    onCheckedChange: {
        control: false,
        description: 'Function called once checked state is changed',
        table: { summary: { summary: '(details: CheckedChangeDetails) => void' } },
    },
    value: {
        control: 'text',
        description: 'The value of switch input. Useful for form submission.',
        table: { summary: { summary: 'string | number' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the component is disabled',
        table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
        control: 'boolean',
        description: 'Whether the component is read-only',
        table: { defaultValue: { summary: 'false' } },
    },
    required: {
        control: 'boolean',
        description: 'Whether the component is required',
        table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
        control: 'boolean',
        description: 'Whether the component is invalid',
        table: { defaultValue: { summary: 'false' } },
    },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
    id: { table: { disable: true } },
};

const meta: Meta<typeof Switch.Root> = {
    title: 'Ui kit core/Switch',
    component: Switch.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Switch.Root>;

export const Basic: Story = {
    args: {
        defaultChecked: true,
        onCheckedChange: fn(),
        value: 'checked',
        disabled: false,
        readOnly: false,
        required: false,
        invalid: false,
    },
    render: examples.Basic,
    play: scenarios.basic,
};

export const States: Story = {
    render: examples.States,
};

export const StatesHover: Story = {
    parameters: { pseudo: { hover: true } },
    render: examples.States,
};

export const Sizes: Story = {
    render: examples.Sizes,
};

export const Colors: Story = {
    render: examples.Colors,
};

export const ColorsHover: Story = {
    parameters: { pseudo: { hover: true } },
    render: examples.Colors,
};

export const Controlled: Story = {
    render: examples.Controlled,
    tags: ['skip-test-runner'],
};

export const LabelPlacement: Story = {
    render: examples.LabelPlacement,
};
