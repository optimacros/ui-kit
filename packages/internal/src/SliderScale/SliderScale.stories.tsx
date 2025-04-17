import { SliderScale } from './index';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SliderScale> = {
    title: 'UI Kit internal/SliderScale',
    component: SliderScale,
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
    argTypes: {
        buffer: {
            control: 'number',
            description: 'Secondary progress value',
        },
        className: {
            control: 'text',
            description: 'Additional CSS class',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the slider is disabled',
            defaultValue: false,
        },
        editable: {
            control: 'boolean',
            description: 'Allow direct value input',
            defaultValue: false,
        },
        max: {
            control: 'number',
            description: 'Maximum value',
            defaultValue: 100,
        },
        min: {
            control: 'number',
            description: 'Minimum value',
            defaultValue: 0,
        },
        onChange: {
            action: 'changed',
            description: 'Handler called when value changes',
        },
        onDragStart: {
            action: 'dragStarted',
            description: 'Handler called when dragging starts',
        },
        onDragStop: {
            action: 'dragStopped',
            description: 'Handler called when dragging stops',
        },
        pinned: {
            control: 'boolean',
            description: 'Show pin with current value',
            defaultValue: false,
        },
        snaps: {
            control: 'boolean',
            description: 'Enable snap points',
            defaultValue: false,
        },
        step: {
            control: 'number',
            description: 'Step increment value',
            defaultValue: 1,
        },
        dataMax: {
            control: 'number',
            description: 'Maximum data value',
        },
        name: {
            control: 'text',
            description: 'Input name attribute',
        },
        theme: {
            control: 'object',
            description: 'Theme customization object',
        },
        value: {
            control: 'number',
            description: 'Current value',
        },
        label: {
            control: 'text',
            description: 'Label text for the slider',
        },
    },
    args: {
        onChange: undefined,
    },
};

export default meta;

type Story = StoryObj<typeof SliderScale>;

export const Basic: Story = {
    args: {
        label: 'Basic Slider',
        name: 'Basic',
    },
};

export const Pinned: Story = {
    args: {
        min: 0,
        max: 100,
        value: 50,
        pinned: true,
        label: 'Pinned Value',
    },
};

export const Snaps: Story = {
    args: {
        min: 0,
        max: 100,
        value: 50,
        pinned: true,
        snaps: true,
        step: 10,
        label: 'With Snap Points',
    },
};

export const Editable: Story = {
    args: {
        min: 0,
        max: 100,
        value: 50,
        editable: true,
        label: 'Editable Slider',
    },
};

export const Disabled: Story = {
    args: {
        min: 0,
        max: 100,
        value: 50,
        disabled: true,
        label: 'Disabled Slider',
    },
};

export const CustomStep: Story = {
    args: {
        min: 0,
        max: 100,
        value: 50,
        step: 50,
        label: 'Step: 50',
    },
};
