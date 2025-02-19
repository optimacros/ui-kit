import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';
import { Modal } from '../index';

export const CloseIcon = (props: Modal.Props) => {
    return (
        <>
            <Modal.Root {...props}>
                <Modal.Trigger data-testid="open-trigger">Open</Modal.Trigger>

                <Modal.Content data-testid="content">
                    <Modal.Header>
                        <Modal.Title>Edit profile</Modal.Title>
                        <Modal.CloseTrigger asChild data-testid="close-icon">
                            <IconButton variant="primary" icon="close" />
                        </Modal.CloseTrigger>
                    </Modal.Header>
                    <Modal.ScrollContainer>
                        <p>Make changes to your profile here. Click save when you are done.</p>
                        <div>
                            <input placeholder="Enter name..." id="modal-input-1" />
                            <button>Save</button>
                        </div>
                    </Modal.ScrollContainer>
                    <Modal.Footer>
                        <Modal.CloseTrigger asChild>
                            <Button variant="primary">Close</Button>
                        </Modal.CloseTrigger>
                    </Modal.Footer>
                </Modal.Content>
            </Modal.Root>
        </>
    );
};
