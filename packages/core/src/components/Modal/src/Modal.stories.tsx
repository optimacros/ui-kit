import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Modal } from './index';
import { interactionTasks } from './interactions';
import * as stories from './stories';
import { fn } from '@storybook/test';
import { Flex } from '@optimacros-ui/flex';

const argTypes: ArgTypes<Partial<Modal.Props>> = {
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
    onClose: {
        control: false,
        description: 'Callback function that is called on close attempt',
        table: { type: { summary: '() => void' } },
    },
    preventScroll: {
        control: 'boolean',
        description: `Whether to prevent scrolling behind the dialog when it's opened`,
        table: { defaultValue: { summary: 'true' } },
    },
    trapFocus: {
        control: 'boolean',
        description: `Whether to trap focus inside the dialog when it's opened`,
        table: { defaultValue: { summary: 'true' } },
    },
    initialFocusEl: {
        description: `Element to receive focus when the dialog is opened`,
        table: { type: { summary: '() => HTMLElement' } },
    },
    finalFocusEl: {
        description: `Element to receive focus when the dialog is closed`,
        table: { type: { summary: '() => HTMLElement' } },
    },
    closeOnInteractOutside: {
        description: `Whether to close the dialog when the outside is clicked`,
        table: { defaultValue: { summary: 'true' } },
    },
    closeOnEscape: {
        description: `Whether to close the dialog when the escape key is pressed`,
        table: { defaultValue: { summary: 'true' } },
    },
    onEscapeKeyDown: {
        description: `Function called when the escape key is pressed`,
        table: { type: { summary: '(event: KeyboardEvent) => void' } },
    },
    onPointerDownOutside: {
        description: `Function called when the pointer is pressed down outside the component`,
        table: { type: { summary: '(event: PointerDownOutsideEvent) => void' } },
    },
    onFocusOutside: {
        description: `Function called when the focus is moved outside the component`,
        table: { type: { summary: '(event: FocusOutsideEvent) => void' } },
    },
    onInteractOutside: {
        description: `Function called when an interaction happens outside the component`,
        table: { type: { summary: '(event: InteractOutsideEvent) => void' } },
    },
};

const meta: Meta<typeof Modal.Root> = {
    title: 'UI Kit core/Modal',
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Modal.Root>;

export const Basic: Story = {
    args: {
        controllable: false,
        open: false,
        onOpenChange: fn(),
        onClose: fn(),
        preventScroll: true,
        closeOnEscape: true,
    },
    parameters: {
        performance: {
            interactions: interactionTasks,
        },
    },
    render: stories.Basic,
};

export const Controlled: Story = {
    args: { controllable: true, 'open.controlled': true },
    render: stories.Controlled,
};

export const Events: Story = {
    args: { open: true, trapFocus: false },
    render: stories.Events,
};

export const Focus: Story = {
    render: stories.Focus,
};

export const PreventScrollDisabled: Story = {
    args: { open: true, preventScroll: false },
    render: stories.Basic,
    decorators: [
        (Story) => (
            <Flex style={{ height: '200vh' }}>
                <Story />
            </Flex>
        ),
    ],
};

export const CloseOnEscapeDisabled: Story = {
    args: { open: true, closeOnEscape: false },
    render: stories.Basic,
};

export const CloseOnInteractOutsideDisabled: Story = {
    args: { open: true, closeOnInteractOutside: false },
    render: stories.Basic,
};

export const CloseIcon: Story = {
    args: { open: true },
    render: stories.CloseIcon,
};

export const Draggable: Story = {
    args: { open: true },
    render: stories.Draggable,
};
