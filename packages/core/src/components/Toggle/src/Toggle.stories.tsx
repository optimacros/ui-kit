import { Toggle } from './';

import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';
import { ComponentProps } from 'react';
import { fn } from '@storybook/test';

const argTypes: Partial<ArgTypes<ComponentProps<typeof Toggle>>> = {
    checked: {
        control: 'boolean',
        description: 'Whether the toggle is checked.',
    },
    onCheckedChange: {
        control: false,
        description: 'Function called once checked state is changed',
        table: { summary: { summary: '(details: CheckedChangeDetails) => void' } },
    },
    value: {
        control: 'text',
        description: 'The value of toggle input. Useful for form submission.',
        table: { summary: { summary: 'string | number' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the component is disabled',
        table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
        control: 'boolean',
        description: 'Whether the component is invalid',
        table: { defaultValue: { summary: 'false' } },
    },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
    defaultContext: { table: { disable: true } },
    id: { table: { disable: true } },
};

const meta: Meta<typeof Toggle> = {
    title: 'UI Kit core/Toggle',
    component: Toggle,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Basic: Story = {
    args: {
        checked: true,
        onCheckedChange: fn(),
        value: 'checked',
        disabled: false,
        readOnly: false,
        invalid: true,
        controllable: false,
    },
    render: examples.Basic,
    play: scenarios.basic,
};

export const States: Story = {
    args: {
        checked: true,
        onCheckedChange: fn(),
        value: 'checked',
        disabled: true,
        controllable: false,
    },
    render: examples.States,
    tags: ['skip-test-runner'], // смысла 0, будет 6 одинаковых кнопок
};
