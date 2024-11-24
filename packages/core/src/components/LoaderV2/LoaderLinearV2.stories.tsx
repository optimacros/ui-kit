import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Loader } from './index';

const argTypes: Partial<ArgTypes> = {
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
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
    className: { control: 'text', description: 'Root element className' },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
    label: {
        control: 'text',
        description: 'Text to display above progress bar',
    },
};

const meta: Meta<typeof Loader.Linear> = {
    title: 'UI Kit core/LoaderV2 Linear',
    component: Loader.Linear,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Loader.Linear>;

export const Basic: Story = {
    args: {},
};

// export const Circular: Story = {
//     args: {
//         type: 'circular',
//         mode: 'indeterminate',
//     },
// };

// export const CircularMulticolor: Story = {
//     args: {
//         type: 'circular',
//         mode: 'indeterminate',
//         multicolor: true,
//     },
// };

// export const CircularDeterminate: Story = {
//     args: {
//         type: 'circular',
//         mode: 'determinate',
//         value: 25,
//     },
// };

// export const Linear: Story = {
//     args: {
//         type: 'linear',
//         mode: 'indeterminate',
//     },
// };

// export const LinearBuffer: Story = {
//     args: {
//         type: 'linear',
//         mode: 'determinate',
//         value: 23,
//         buffer: 40,
//         max: 100,
//     },
// };

// export const Disabled: Story = {
//     args: {
//         type: 'linear',
//         mode: 'determinate',
//         value: 23,
//         disabled: true,
//     },
// };
