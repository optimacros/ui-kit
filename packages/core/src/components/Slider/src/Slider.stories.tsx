import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Slider } from './index';
import { ComponentProps } from 'react';
import { fn } from '@storybook/test';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';

const argTypes: Partial<ArgTypes<ComponentProps<typeof Slider.Root>>> = {
    value: {
        control: 'object',
        description: 'The controlled value of the slider',
        table: { type: { summary: 'number[]' } },
    },
    defaultValue: {
        control: 'object',
        description: 'The initial value of the slider',
        table: { type: { summary: 'number[]' } },
    },
    onValueChange: {
        control: false,
        description: 'Function invoked when the value of the slider changes',
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    onValueChangeEnd: {
        control: false,
        description: 'Function invoked when the slider value change is done',
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    min: {
        control: 'number',
        description: 'Min slider value',
        table: { defaultValue: { summary: '0' } },
    },
    max: {
        control: 'number',
        description: 'Max slider value',
        table: { defaultValue: { summary: '100' } },
    },
    step: {
        control: 'number',
        description: 'The step value of the slider',
        table: { defaultValue: { summary: '1' } },
    },
    minStepsBetweenThumbs: {
        control: 'number',
        description: 'The minimum permitted steps between multiple thumbs.',
        table: { defaultValue: { summary: '0' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the slider is disabled',
        table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
        control: 'boolean',
        description: 'WWhether the slider is invalid',
        table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
        control: 'boolean',
        description: 'Whether the slider is read-only',
        table: { defaultValue: { summary: 'false' } },
    },
};

const meta: Meta<typeof Slider.Root> = {
    title: 'UI Kit core/Slider',
    component: Slider.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Slider.Root>;

export const Basic: Story = {
    args: {
        defaultValue: [33],
        onValueChange: fn(),
        onValueChangeEnd: fn(),
        min: 0,
        max: 100,
        step: 1,
        minStepsBetweenThumbs: 0,
        disabled: false,
    },
    render: examples.Basic,
    play: scenarios.basic,
};

export const Range: Story = {
    args: {
        defaultValue: [12, 34],
        onValueChange: fn(),
        onValueChangeEnd: fn(),
        min: 0,
        max: 100,
        step: 1,
        minStepsBetweenThumbs: 0,
        disabled: false,
    },
    render: examples.Basic,
    tags: ['skip-test-runner'], // тестируется в MinStepBetweenThumbs
};

export const States: Story = {
    args: {
        defaultValue: [33],
        onValueChange: fn(),
        onValueChangeEnd: fn(),
        min: 0,
        max: 100,
        step: 1,
        minStepsBetweenThumbs: 0,
        disabled: false,
    },
    render: examples.States,
};

export const MinMax: Story = {
    args: {
        defaultValue: [-100, 50],
        onValueChange: fn(),
        onValueChangeEnd: fn(),
        min: -100,
        max: 50,
        step: 1,
        minStepsBetweenThumbs: 0,
        disabled: false,
    },
    render: examples.Basic,
    tags: ['skip-test-runner'], // тестируется в MinStepBetweenThumbs
};

export const Step: Story = {
    args: {
        defaultValue: [1.2, 3.4],
        onValueChange: fn(),
        onValueChangeEnd: fn(),
        min: 0,
        max: 10,
        step: 0.1,
        minStepsBetweenThumbs: 0,
        disabled: false,
    },
    render: examples.Basic,
    tags: ['skip-test-runner'],
};

export const MinStepBetweenThumbs: Story = {
    args: {
        defaultValue: [1.2, 3.4],
        onValueChange: fn(),
        onValueChangeEnd: fn(),
        min: 0,
        max: 10,
        step: 0.1,
        minStepsBetweenThumbs: 1,
        disabled: false,
    },
    render: examples.Basic,
    play: scenarios.minStepBetweenThumbs,
};

export const Markers: Story = {
    args: {
        defaultValue: [9],
        onValueChange: fn(),
        onValueChangeEnd: fn(),
        min: 0,
        max: 20,
        step: 3,
        minStepsBetweenThumbs: 0,
        disabled: false,
    },
    render: examples.Markers,
};
