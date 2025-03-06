import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Modal } from './index';
import { interactionTasks } from './interactions';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';
import { fn } from '@storybook/test';
import { Flex } from '@optimacros-ui/flex';

const argTypes: ArgTypes<Partial<Modal.Props>> = {
    open: {
        control: 'boolean',
        description: 'Whether the dialog is open',
    },
    defaultOpen: {
        control: 'boolean',
        description: 'Whether the dialog is controlled by the user',
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
    id: { table: { disable: true } },
};

const meta: Meta<typeof Modal.Root> = {
    title: 'UI Kit core/Modal',
    component: Modal.Root,
    argTypes,
    args: {
        open: undefined,
        defaultOpen: false,
        closeOnInteractOutside: true,
    },
};

export default meta;

type Story = StoryObj<typeof Modal.Root>;

export const Basic: Story = {
    args: {
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
    play: scenarios.basic,
};

export const Controlled: Story = {
    args: {},
    render: stories.Controlled,
    tags: ['skip-test-runner'],
};

export const Events: Story = {
    args: { trapFocus: false },
    render: stories.Events,
    tags: ['skip-test-runner'],
};

export const Focus: Story = {
    render: stories.Focus,
    tags: ['skip-test-runner'],
};

export const PreventScrollDisabled: Story = {
    args: { preventScroll: false },
    render: stories.Basic,
    decorators: [
        (Story) => (
            <Flex style={{ height: '200vh' }}>
                <Story />
            </Flex>
        ),
    ],
    tags: ['skip-test-runner'],
};

export const CloseOnEscapeDisabled: Story = {
    args: {
        onOpenChange: fn(),
        onEscapeKeyDown: fn(),
        onPointerDownOutside: fn(),
        onInteractOutside: fn(),
        closeOnEscape: false,
    },
    render: stories.Basic,
    play: scenarios.closeOnEscape,
};

export const CloseOnInteractOutsideDisabled: Story = {
    args: {
        closeOnInteractOutside: false,
        onOpenChange: fn(),
        onEscapeKeyDown: fn(),
        onPointerDownOutside: fn(),
        onInteractOutside: fn(),
    },
    render: stories.Basic,
    play: scenarios.closeOnInteractOutside,
};

export const CloseIcon: Story = {
    render: stories.CloseIcon,
    play: scenarios.closeIcon,
};

export const Draggable: Story = {
    render: stories.Draggable,
    play: scenarios.drag,
};
