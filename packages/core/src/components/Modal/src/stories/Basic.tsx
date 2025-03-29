import { Button } from '@optimacros-ui/button';
import { Modal } from '../index';
import { Menu } from '@optimacros-ui/menu';
import { Select } from '@optimacros-ui/select';
import {} from '@optimacros-ui/select';

const options = new Array(20).fill(0).map((_, i) => {
    return {
        label: `item ${i}`,
        value: `item-value-${i}`,
        key: `item-value-${i}`,
        index: i,
    };
});

export const Basic = (props: Modal.Props) => {
    return (
        <>
            <Modal.Root {...props}>
                <Modal.Trigger data-testid="open-trigger">Open</Modal.Trigger>

                <Modal.Content data-testid="content">
                    <Modal.Header>
                        <Modal.Title>Edit profile</Modal.Title>
                    </Modal.Header>
                    <Modal.ScrollContainer>
                        <Menu.Examples.Nested hoverable />
                        <Select.Examples.Basic items={options} />
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
                    <Modal.Footer>
                        <Modal.CloseTrigger asChild data-testid="close-trigger">
                            <Button>Close</Button>
                        </Modal.CloseTrigger>
                    </Modal.Footer>
                </Modal.Content>
            </Modal.Root>
        </>
    );
};
