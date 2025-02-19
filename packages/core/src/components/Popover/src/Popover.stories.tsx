import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Popover } from '.';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';
import { fn } from '@storybook/test';

const argTypes: ArgTypes<typeof Popover.Root> = {
    open: {
        control: 'boolean',
        description: 'Whether the dialog is open',
    },
    'open.controlled': {
        control: 'boolean',
        description: 'Whether the dialog is controlled by the user',
        table: { defaultValue: { summary: 'false' } },
    },
    controllable: {
        control: 'boolean',
        description: 'Whether the component handles props update',
        table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
        control: false,
        description: 'Callback to be invoked when the dialog is opened or closed',
        table: { type: { summary: '(details: OpenChangeDetails) => void' } },
    },
    closeOnInteractOutside: {
        control: 'boolean',
        description: `Whether to close the dialog when the outside is clicked`,
        table: { defaultValue: { summary: 'true' } },
    },
    closeOnEscape: {
        control: 'boolean',
        description: `Whether to close the dialog when the escape key is pressed`,
        table: { defaultValue: { summary: 'true' } },
    },
    positioning: {
        control: 'object',
        description: 'The user provided options used to position the popover content',
        table: {
            defaultValue: {
                summary:
                    '{  strategy: "absolute",  placement: "bottom",  listeners: true,  gutter: 8,  flip: true,  slide: true,  overlap: false,  sameWidth: false,  fitViewport: false,  overflowPadding: 8,  arrowPadding: 4, offset: { mainAxis: undefined, crossAxis: undefined }, }',
            },
            type: { summary: 'PositioningOptions' },
        },
    },
    modal: {
        control: 'boolean',
        description:
            'Whether the popover should be modal. When set to `true`: - interaction with outside elements will be disabled - only popover content will be visible to screen readers - scrolling is blocked - focus is trapped within the popover',
        table: { defaultValue: { summary: 'false' } },
    },
    autoFocus: {
        control: 'boolean',
        description: `Whether to automatically set focus on the first focusable content within the popover when opened.`,
        table: { defaultValue: { summary: 'true' } },
    },
    initialFocusEl: {
        control: false,
        description: `Element to receive focus when the dialog is opened`,
        table: { type: { summary: '() => HTMLElement' } },
    },

    onEscapeKeyDown: {
        control: false,
        description: `Function called when the escape key is pressed`,
        table: { type: { summary: '(event: KeyboardEvent) => void' } },
    },
    onPointerDownOutside: {
        control: false,
        description: `Function called when the pointer is pressed down outside the component`,
        table: { type: { summary: '(event: PointerDownOutsideEvent) => void' } },
    },
    onFocusOutside: {
        control: false,
        description: `Function called when the focus is moved outside the component`,
        table: { type: { summary: '(event: FocusOutsideEvent) => void' } },
    },
    onInteractOutside: {
        control: false,
        description: `Function called when an interaction happens outside the component`,
        table: { type: { summary: '(event: InteractOutsideEvent) => void' } },
    },
    defaultContext: { table: { disable: true } },
    id: { table: { disable: true } },
};

const meta: Meta<typeof Popover.Root> = {
    title: 'UI Kit core/Popover',
    component: Popover.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Popover.Root>;

export const Basic: Story = {
    args: {
        controllable: false,
        open: false,
        'open.controlled': false,
        onOpenChange: fn(),
        onEscapeKeyDown: fn(),
        onPointerDownOutside: fn(),
        onFocusOutside: fn(),
        onInteractOutside: fn(),
        closeOnInteractOutside: true,
        closeOnEscape: true,
    },
    render: stories.Basic,
    play: scenarios.basic,
};

export const Placement: Story = {
    args: {
        controllable: false,
        open: true,
        'open.controlled': true,
        onOpenChange: fn(),
        onEscapeKeyDown: fn(),
        onPointerDownOutside: fn(),
        onFocusOutside: fn(),
        onInteractOutside: fn(),
        closeOnInteractOutside: true,
        closeOnEscape: true,
    },
    render: stories.Placement,
};

export const CustomPositioning: Story = {
    args: {
        controllable: true,
        open: true,
        positioning: {
            strategy: 'absolute',
            placement: 'right-start',
            listeners: true,
            gutter: 8,
            flip: true,
            slide: true,
            overlap: true,
            sameWidth: true,
            fitViewport: false,
            overflowPadding: 20,
            arrowPadding: 15,
            offset: { mainAxis: 30, crossAxis: -50 },
        },
    },
    render: stories.Basic,
    parameters: {
        layout: 'centered',
    },
    tags: ['skip-test-runner'],
};
