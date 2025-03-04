import { useState } from 'react';
import { Button } from '@optimacros-ui/button';
import { Modal } from '../index';

export const Controlled = ({ open: openProp, ...rest }: Modal.Props) => {
    const [open, setOpen] = useState(openProp);

    const handleRequestClose = () => {
        if (!window.confirm('close?')) {
            setOpen(true);
        }
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open</Button>

            <Modal.Root
                {...rest}
                open={open}
                onOpenChange={(details) => {
                    setOpen(details.open);
                }}
                onClose={handleRequestClose}
            >
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Click on overlay</Modal.Title>
                    </Modal.Header>
                    <Modal.ScrollContainer>
                        <p>Click on overlay</p>
                    </Modal.ScrollContainer>
                    <Modal.Footer>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal.Root>
        </>
    );
};
