import { Modal } from '../index';
import { useState } from 'react';
import { Button } from '@optimacros-ui/button';
import { flushSync } from 'react-dom';

export const Controlled = () => {
    const [open, setOpen] = useState(false);

    const handleRequestClose = () => {
        if (!window.confirm('close?')) {
            setOpen(true);
        }
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open</Button>

            <Modal.Root
                open={open}
                onOpenChange={(details) => {
                    flushSync(() => setOpen(details.open));
                }}
                onClose={handleRequestClose}
                controllable
            >
                <Modal.Header>
                    <Modal.Title>Click on overlay</Modal.Title>
                </Modal.Header>
                <Modal.ScrollContainer>
                    <p>Click on overlay</p>
                </Modal.ScrollContainer>
                <Modal.Footer>
                    <Modal.CloseTrigger>Close</Modal.CloseTrigger>
                </Modal.Footer>
            </Modal.Root>
        </>
    );
};
