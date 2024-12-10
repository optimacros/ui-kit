import { Modal } from '../index';
import { useState } from 'react';
import { Button } from '../../Button';

export const PreventScroll = () => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (details) => {
        setOpen(details.open);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open</Button>

            <Modal.Root open={open} onOpenChange={handleOpenChange} preventScroll={false}>
                <Modal.Header>
                    <Modal.Title>Edit profile</Modal.Title>
                </Modal.Header>
                <Modal.ScrollContainer>
                    <p>Make changes to your profile here. Click save when you are done.</p>
                    <div>
                        <input placeholder="Enter name..." />
                        <button>Save</button>
                    </div>
                </Modal.ScrollContainer>
                <Modal.Footer>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </Modal.Footer>
            </Modal.Root>

            <div style={{ height: '110vh' }}></div>
        </>
    );
};
