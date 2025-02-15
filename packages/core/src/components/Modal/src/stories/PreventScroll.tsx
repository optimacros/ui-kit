import { useState } from 'react';
import { Button } from '@optimacros-ui/button';
import { Modal } from '../index';

export const PreventScroll = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (details) => {
        setOpen(details.open);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open</Button>

            <Modal.Root
                {...props}
                open={open}
                onOpenChange={handleOpenChange}
                preventScroll={false}
                controllable
            >
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
                    </Modal.ScrollContainer>
                    <Modal.Footer>
                        <Modal.CloseTrigger asChild>
                            <Button>Close</Button>
                        </Modal.CloseTrigger>
                    </Modal.Footer>
                </Modal.Content>
            </Modal.Root>

            <div style={{ height: '110vh' }}></div>
        </>
    );
};
