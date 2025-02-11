import { useState } from 'react';
import { Button } from '@optimacros-ui/button';
import { Modal } from '../index';

export const Events = () => {
    const [open, setOpen] = useState(false);

    const handleEvent = (e) => {
        document.querySelector('#lastEventName').innerHTML = e.type;
        e.preventDefault();
    };

    const props = {
        'open.controlled': true,
        trapFocus: false,
        onEscapeKeyDown: handleEvent,
        onPointerDownOutside: handleEvent,
        onFocusOutside: handleEvent,
        onInteractOutside: handleEvent,
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open</Button>

            <div id="lastEventName">lastEventName</div>

            <Modal.Root open={open} {...props}>
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
