import { Button } from '@optimacros-ui/button';
import { Modal } from '../index';

export const Events = (storyProps: Modal.Props) => {
    const handleEvent = (e) => {
        document.querySelector('#lastEventName').innerHTML = e.type;
        e.preventDefault();
    };

    const props = {
        ...storyProps,
        onEscapeKeyDown: handleEvent,
        onPointerDownOutside: handleEvent,
        onFocusOutside: handleEvent,
        onInteractOutside: handleEvent,
    };

    return (
        <>
            <div id="lastEventName">lastEventName</div>

            <Modal.Root {...props}>
                <Modal.Trigger>Open</Modal.Trigger>

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
