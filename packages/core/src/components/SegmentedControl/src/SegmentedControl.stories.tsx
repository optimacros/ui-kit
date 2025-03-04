import { SegmentedControl } from './index';
import * as examples from './examples';
import { Meta, ArgTypes, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { fn } from '@storybook/test';
import { items } from './examples/mock';
import * as scenarios from './__tests__/scenarios';

const argTypes: Partial<ArgTypes<ComponentProps<typeof SegmentedControl.Root>>> = {
    value: {
        control: 'text',
        description: 'Checked value',
    },
    onValueChange: {
        control: false,
        description: 'Function called once a value is changed',
        table: { summary: { summary: '(details: ValueChangeDetails) => void' } },
    },
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled',
        table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
        control: 'boolean',
        description: 'Whether the checkbox is read-only',
        table: { defaultValue: { summary: 'false' } },
    },
    as: {
        table: { disable: true },
    },
    asChild: {
        table: { disable: true },
    },
    children: {
        table: { disable: true },
    },
    id: {
        table: { disable: true },
    },
};

const meta: Meta<SegmentedControl.RootProps> = {
    title: 'UI Kit core/SegmentedControl',
    component: SegmentedControl.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<SegmentedControl.RootProps>;

export const Basic: Story = {
    args: {
        defaultValue: items[0],
        onValueChange: fn(),
        disabled: false,
        readOnly: false,
    },
    render: examples.Basic,
    play: scenarios.basic,
};

export const States: Story = {
    args: {
        defaultValue: items[0],
        onValueChange: fn(),
        disabled: false,
        readOnly: false,
    },
    render: examples.States,
};
