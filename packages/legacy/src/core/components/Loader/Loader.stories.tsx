import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Loader } from './index';

const argTypes: Partial<ArgTypes> = {
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
    },
    multicolor: {
        control: 'boolean',
        description:
            ' If `true`, the circular progress bar will be changing its color. ' +
            'When type is `circular` and node is `indeterminate`.',
    },
    value: {
        control: 'number',
        description: 'Value of the current progress.',
    },
    min: {
        control: 'number',
        description: 'Minimum value permitted.',
    },
    max: {
        control: 'number',
        description: 'Maximum value permitted.',
    },
    buffer: {
        control: 'number',
        description: 'Value of a secondary progress bar useful for buffering.',
    },
    mode: {
        control: 'radio',
        options: ['determinate', 'indeterminate'],
        table: {
            defaultValue: { summary: 'indeterminate' },
        },
        description: 'Mode of the progress bar.',
    },
    type: {
        control: 'radio',
        options: ['circular', 'linear'],
        table: {
            defaultValue: { summary: 'linear' },
        },
        description: 'Type of the progress bar.',
    },
    theme: { table: { disable: true } },
    className: { table: { disable: true } },
    innerRef: { table: { disable: true } },
};

const meta: Meta<typeof Loader> = {
    title: 'legacy/Loader',
    component: Loader,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Loader>;

export const Basic: Story = {
    args: {},
};

export const Circular: Story = {
    args: {
        type: 'circular',
        mode: 'indeterminate',
    },
};

export const CircularMulticolor: Story = {
    args: {
        type: 'circular',
        mode: 'indeterminate',
        multicolor: true,
    },
};

export const CircularDeterminate: Story = {
    args: {
        type: 'circular',
        mode: 'determinate',
        value: 25,
    },
};

export const Linear: Story = {
    args: {
        type: 'linear',
        mode: 'indeterminate',
    },
};

export const LinearBuffer: Story = {
    args: {
        type: 'linear',
        mode: 'determinate',
        value: 23,
        buffer: 40,
        max: 100,
    },
};

export const Disabled: Story = {
    args: {
        type: 'linear',
        mode: 'determinate',
        value: 23,
        disabled: true,
    },
};
