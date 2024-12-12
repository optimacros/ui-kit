import { Modal } from '../index';
import { useState } from 'react';
import { Button } from '@optimacros-ui/button';

export const Controlled = () => {
    const [open, setOpen] = useState(false);

    const handleRequestClose = () => {
        setOpen(!window.confirm('close?'));
    };

    const controlledProps = {
        'open.controlled': true,
        onRequestClose: handleRequestClose,
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open</Button>

            <Modal.Root open={open} {...controlledProps}>
                <Modal.Header>
                    <Modal.Title>Click on overlay</Modal.Title>
                </Modal.Header>
                <Modal.ScrollContainer>
                    <p>Click on overlay</p>
                </Modal.ScrollContainer>
                <Modal.Footer>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </Modal.Footer>
            </Modal.Root>
        </>
    );
};
