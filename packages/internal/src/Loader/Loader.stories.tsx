import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Loader } from '@optimacros-ui/kit-internal';

const meta: Meta<typeof Loader> = {
    title: 'UI Kit internal/Loader',
    component: Loader,
    tags: ['autodocs'],
    argTypes: {
        buffer: {
            control: 'number',
            description: 'Value of the secondary progress bar',
            defaultValue: 0,
        },
        className: {
            control: 'text',
            description: 'Additional CSS class',
        },
        max: {
            control: 'number',
            description: 'Maximum value of determinate type loader',
            defaultValue: 100,
        },
        min: {
            control: 'number',
            description: 'Minimum value of determinate type loader',
            defaultValue: 0,
        },
        mode: {
            control: 'radio',
            options: ['determinate', 'indeterminate'],
            description: 'Mode of the loader',
            defaultValue: 'indeterminate',
        },
        type: {
            control: 'radio',
            options: ['linear', 'circular'],
            description: 'Visual type of the loader',
            defaultValue: 'linear',
        },
        value: {
            control: 'number',
            description: 'Current progress value for determinate mode',
        },
        theme: {
            control: 'object',
            description: 'Theme customization object',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the loader',
            defaultValue: false,
        },
    },
};

const meta: Meta<typeof Loader> = {
    title: 'UI KIT Internal/Loader',
    component: Loader,
    argTypes,
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
};
export default meta;

type Story = StoryObj<typeof Loader>;

export const Basic: Story = {
    args: {
        type: 'linear',
        mode: 'indeterminate',
    },
};

export const Circular: Story = {
    args: {
        type: 'circular',
        mode: 'indeterminate',
    },
};

export const Linear: Story = {
    args: {
        type: 'linear',
        mode: 'indeterminate',
    },
};

export const Determinate: Story = {
    args: {
        type: 'linear',
        mode: 'determinate',
        value: 60,
        max: 100,
        min: 0,
    },
};

export const CircularDeterminate: Story = {
    args: {
        type: 'circular',
        mode: 'determinate',
        value: 25,
    },
};

export const Disabled: Story = {
    args: {
        type: 'linear',
        disabled: true,
    },
};
