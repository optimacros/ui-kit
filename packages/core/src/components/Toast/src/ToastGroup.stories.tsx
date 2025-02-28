import { ToastGroup } from '.';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';
import { ComponentProps } from 'react';

const argTypes: Partial<ArgTypes<ComponentProps<typeof ToastGroup.RootProvider>>> = {
    pauseOnPageIdle: {
        control: 'boolean',
        description: 'Whether to pause toast when the user leaves the browser tab',
        table: { defaultValue: { summary: 'false' } },
    },
    gap: {
        control: 'number',
        description: 'The gap or spacing between toasts',
        table: { defaultValue: { summary: '16' } },
    },
    max: {
        control: 'number',
        description: 'The maximum number of toasts that can be shown at once',
        table: { defaultValue: { summary: 'Number.MAX_SAFE_INTEGER' } },
    },
    overlap: {
        control: 'boolean',
        description:
            "Whether the toasts should overlap each other. When using overlap, the toast's `placement` must match the placement of the toast group (which is `bottom` by default).",
        table: { defaultValue: { summary: 'false' } },
    },
    duration: { control: 'number', description: 'The default duration the toast will be visible' },
    removeDelay: {
        control: 'number',
        description:
            'The default duration for the toast to kept alive before it is removed. Useful for exit transitions.',
    },
    placement: {
        control: 'select',
        options: ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'],
        description: 'The default placement of the toast',
        table: { defaultValue: { summary: 'bottom' } },
    },
    controllable: { table: { disable: true } },
    id: { table: { disable: true } },
    defaultContext: { table: { disable: true } },
};

const meta: Meta<typeof ToastGroup.RootProvider> = {
    title: 'UI Kit core/Toast/ToastGroup',
    component: ToastGroup.RootProvider,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof ToastGroup.RootProvider>;

export const Basic: Story = {
    args: {
        controllable: false,
        pauseOnPageIdle: false,
        gap: 16,
        max: Number.MAX_SAFE_INTEGER,
        overlap: false,
        duration: undefined,
        removeDelay: undefined,
        placement: 'bottom',
    },
    render: examples.Basic,
    play: scenarios.basic,
};

export const Types: Story = {
    args: {},
    render: examples.Types,
};

export const Placements: Story = {
    args: {},
    render: examples.Placements,
};

export const Gap: Story = {
    args: { gap: 40 },
    render: examples.Types,
};

export const Overlap: Story = {
    args: { overlap: true, max: 10, placement: 'top-start' },
    render: examples.Types,
};
