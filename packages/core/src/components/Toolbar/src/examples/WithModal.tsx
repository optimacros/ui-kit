import { Button } from '@optimacros-ui/button';
import { Toolbar } from '../';
import { ComponentProps, useState } from 'react';
import { Modal } from '@optimacros-ui/modal';
import type { OpenChangeDetails } from '@zag-js/dialog';

export const WithModal = (props: ComponentProps<typeof Toolbar.Root>) => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (details: OpenChangeDetails) => {
        setOpen(details.open);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open Modal</Button>

            <Modal.Root open={open} onOpenChange={handleOpenChange}>
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
                    </Modal.ScrollContainer>

                    <div style={{ padding: '2rem', width: '100%', boxSizing: 'border-box' }}>
                        <Toolbar.Root {...props} isSmall>
                            <Button variant="primary" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="accent" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Toolbar.Root>
                    </div>
                </Modal.Content>
            </Modal.Root>
        </>
    );
};
