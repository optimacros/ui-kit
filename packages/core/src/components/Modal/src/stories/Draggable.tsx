import { Modal } from '../index';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';

export const Draggable = (props: Modal.Props) => {
    return (
        <>
            <Modal.Root {...props}>
                <Modal.Trigger>Open</Modal.Trigger>

                <Modal.DraggableContent>
                    <Modal.DragHandle style={{ border: '1px gray dashed' }} asChild>
                        <Modal.Header>
                            <Modal.Title>Edit profile</Modal.Title>
                            <Modal.CloseTrigger asChild>
                                <IconButton icon="close" />
                            </Modal.CloseTrigger>
                        </Modal.Header>
                    </Modal.DragHandle>

                    <Modal.ScrollContainer>
                        <p>Make changes to your profile here. Click save when you are done.</p>
                        <div>
                            <input placeholder="Enter name..." id="modal-input-1" />
                            <button>Save</button>
                        </div>
                        <Modal.DragHandle style={{ border: '1px gray dashed' }}>
                            Another drag handle
                        </Modal.DragHandle>
                    </Modal.ScrollContainer>
                    <Modal.Footer>
                        <Modal.CloseTrigger asChild>
                            <Button>Close</Button>
                        </Modal.CloseTrigger>
                    </Modal.Footer>
                </Modal.DraggableContent>
            </Modal.Root>
        </>
    );
};
