import { ArgTypes, Meta } from '@storybook/react';
import { Modal } from './index';
import { useState } from 'react';
import { Button } from '@optimacros-ui/button';

const argTypes: Partial<ArgTypes> = {
    open: {
        control: 'boolean',
        description: 'Whether the dialog is open',
    },
    'open.controlled': {
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
};

export default meta;

export const Basic = () => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (details) => {
        setOpen(details.open);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open</Button>

            <Modal.CustomRoot open={open} onOpenChange={handleOpenChange} controllable>
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
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </Modal.Footer>
            </Modal.CustomRoot>
        </>
    );
};

export {
    Controlled,
    Focus,
    PreventScroll,
    CloseOnEscape,
    CloseOnInteractOutside,
} from './stories';
