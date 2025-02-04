import { ArgTypes, Meta } from '@storybook/react';
import { Modal } from './index';
import { useState } from 'react';
import { Button } from '@optimacros-ui/button';
import { interactionTasks } from './interactions';
import * as stories from './stories';

const argTypes: Partial<ArgTypes> = {
    open: {
        control: 'boolean',
        description: 'Whether the dialog is open',
    },
    controllable: {
        control: 'boolean',
        description: 'Whether the dialog is controlled by the user',
    },
    onOpenChange: {
        control: false,
        description: 'Callback to be invoked when the dialog is opened or closed',
        table: { type: { summary: '(details: OpenChangeDetails) => void' } },
    },
    onRequestClose: {
        control: false,
        description: 'Callback function that is called on close attempt',
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

const meta: Meta<typeof Modal> = {
    title: 'UI Kit core/Modal',
    argTypes,
    decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
    parameters: {
        performance: {
            interactions: interactionTasks,
        },
    },
    render: () => {
        const [open, setOpen] = useState(false);

        const handleOpenChange = (details) => {
            setOpen(details.open);
        };

        return (
            <>
                <Button onClick={() => setOpen(true)} data-test="open-trigger">
                    Open
                </Button>

                <Modal.Root open={open} onOpenChange={handleOpenChange} controllable>
                    <Modal.Content>
                        <Modal.Header>
                            <Modal.Title>Edit profile</Modal.Title>
                        </Modal.Header>
                        <Modal.ScrollContainer>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                            <p>Make changes to your profile here. Click save when you are done.</p>
                            <div>
                                <input placeholder="Enter name..." />
                                <button>Save</button>
                            </div>
                        </Modal.ScrollContainer>
                        <Modal.Footer>
                            <Modal.CloseTrigger asChild>
                                <Button>Close</Button>
                            </Modal.CloseTrigger>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal.Root>
            </>
        );
    },
};

export const Controlled: Story = {
    render: stories.Controlled,
};

export const Focus: Story = {
    render: stories.Focus,
};

export const PreventScroll: Story = {
    render: stories.PreventScroll,
};

export const CloseOnEscape: Story = {
    render: stories.CloseOnEscape,
};

export const CloseOnInteractOutside: Story = {
    render: stories.CloseOnInteractOutside,
};

export const CloseIcon: Story = {
    render: stories.CloseIcon,
};

export const Draggable: Story = {
    render: stories.Draggable,
};
