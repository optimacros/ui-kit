import { ArgTypes, StoryObj, Meta } from '@storybook/react';
import { Sidebar } from '.';
import { ComponentProps } from 'react';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';
import { fn } from '@storybook/test';

const argTypes: Partial<ArgTypes<ComponentProps<typeof Sidebar.Root>>> = {
    open: {
        description: 'Whether the collapsible is open when component is loaded',
        control: 'boolean',
        table: { defaultValue: { summary: 'false' } },
    },
    defaultOpen: {
        control: 'boolean',
        description: 'Whether the collapsible is controlled by the user',
        table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
        control: false,
        description: 'Callback to be invoked when the collapsible is opened or closed',
        table: { type: { summary: '(details: OpenChangeDetails) => void' } },
    },
    disabled: {
        description: 'Whether the collapsible is disabled',
        control: 'boolean',
        table: { defaultValue: { summary: 'false' } },
    },
    position: {
        description: 'Sidebar position',
        control: false,
        table: { type: { summary: 'left | right' }, defaultValue: { summary: 'right' } },
    },
    width: {
        description: 'Panel width',
        control: 'object',
        table: { type: { summary: 'number | string' }, defaultValue: { summary: '300' } },
    },
};

const meta: Meta<typeof Sidebar.Root> = {
    title: 'UI Kit core/Sidebar',
    component: Sidebar.Root,
    argTypes,
    args: {
        defaultOpen: false,
    },
};

export default meta;

type Story = StoryObj<typeof Sidebar.Root>;

export const Basic: Story = {
    args: {
        position: 'right',
        onOpenChange: fn(),
        disabled: false,
        width: 300,
    },
    play: scenarios.basic,
    render: examples.Basic,
};

export const PositionLeft = {
    args: {
        defaultOpen: false,
        position: 'left',
    },
    render: examples.Basic,
};

export const Disabled = {
    args: {
        disabled: true,
        defaultOpen: false,
        position: 'right',
    },
    render: examples.Basic,
};

export const FullWidth = {
    args: {
        defaultOpen: true,
        width: '100%',
    },
    render: examples.Basic,
};
