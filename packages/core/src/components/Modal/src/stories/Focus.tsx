import { Button } from '@optimacros-ui/button';
import { Modal } from '../index';
import { useRef } from 'react';

export const Focus = (props: Modal.Props) => {
    const initialFocusEl = useRef<HTMLInputElement>(null);
    const finalFocusEl = useRef<HTMLInputElement>(null);

    return (
        <>
            <input placeholder="Enter name..." id="modal-input-3" ref={finalFocusEl} />

            <Modal.Root
                {...props}
                initialFocusEl={() => initialFocusEl.current}
                finalFocusEl={() => finalFocusEl.current}
                restoreFocus
            >
                <Modal.Trigger>Open</Modal.Trigger>

                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Edit profile</Modal.Title>
                    </Modal.Header>
                    <Modal.ScrollContainer>
                        <p>Make changes to your profile here. Click save when you are done.</p>
                        <div>
                            <input
                                placeholder="Enter name..."
                                id="modal-input-1"
                                ref={initialFocusEl}
                            />
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
