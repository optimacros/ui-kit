import { useState } from 'react';
import { Button } from '@optimacros-ui/button';
import { Modal } from '../index';

export const Focus = () => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (details) => {
        setOpen(details.open);
    };

    const initialFocusEl = () => document.querySelector('#modal-input-2') as HTMLInputElement;
    const finalFocusEl = () => document.querySelector('#modal-input-3') as HTMLInputElement;

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open</Button>
            <input placeholder="Enter name..." id="modal-input-3" />

            <Modal.Root
                open={open}
                onOpenChange={handleOpenChange}
                initialFocusEl={initialFocusEl}
                finalFocusEl={finalFocusEl}
                controllable
            >
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Edit profile</Modal.Title>
                    </Modal.Header>
                    <Modal.ScrollContainer>
                        <p>Make changes to your profile here. Click save when you are done.</p>
                        <div>
                            <input placeholder="Enter name..." id="modal-input-1" />
                            <input placeholder="Enter name..." id="modal-input-2" />
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
};
