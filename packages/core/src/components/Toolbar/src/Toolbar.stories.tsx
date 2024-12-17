import { Checkbox, Field } from '@optimacros-ui/core';
import { Modal } from '@optimacros-ui/modal';
import { useState } from 'react';
import { Toolbar } from './index';
import { Button } from '@optimacros-ui/button';
import { Align } from '@optimacros-ui/utils';

export default {
    title: 'UI Kit core/Toolbar',
    component: Toolbar.Root,
    tags: ['autodocs'],
    argTypes: {
        align: {
            control: 'radio',
            options: Align,
            table: {
                defaultValue: {
                    summary: Align.Left,
                },
            },
        },
        isSmall: {
            control: 'boolean',
            description: 'If `true`, toolbar will have less margin top.',
        },
    },
};

const Children = (
    <>
        <Button variant="accent"> Cancel </Button>
        <Button variant="primary"> Submit </Button>
    </>
);

export const Base = (props) => {
    return <Toolbar.Root {...props}>{Children}</Toolbar.Root>;
};

export const Left = (props) => {
    return (
        <Toolbar.Root {...props} align={Align.Left}>
            {Children}
        </Toolbar.Root>
    );
};

export const Center = (props) => {
    return (
        <Toolbar.Root {...props} align={Align.Center}>
            {Children}
        </Toolbar.Root>
    );
};

export const RightInRow = (props) => {
    return (
        <Toolbar.Root {...props} align={Align.RightInRow}>
            {Children}
        </Toolbar.Root>
    );
};

export const Small = (props) => {
    return (
        <Toolbar.Root {...props} isSmall>
            {Children}
        </Toolbar.Root>
    );
};

export const WithModal = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (details) => {
        setOpen(details.open);
    };
    return (
        <>
            <Button onClick={() => setOpen(true)}>Open Modal</Button>

            <Modal.Root open={open} onOpenChange={handleOpenChange}>
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
            </Modal.Root>
        </>
    );
};

export const WithForm = (props) => {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            style={{
                width: '400px',
            }}
        >
            <Field.Root>
                <Field.FloatingLabel htmlFor="fn">First Name</Field.FloatingLabel>
                <Field.Input id="fn" />
            </Field.Root>
            <Field.Root>
                <Field.FloatingLabel htmlFor="ln">Last Name</Field.FloatingLabel>
                <Field.Input id="ln" />
            </Field.Root>
            <Checkbox.Root>
                <Checkbox.BoxControl />
                <Checkbox.Label>I agree to the processing of personal data</Checkbox.Label>
            </Checkbox.Root>
            <Toolbar.Root {...props} isSmall align={Align.Center}>
                <Button variant="primary">Cancel</Button>
                <Button variant="accent">Submit</Button>
            </Toolbar.Root>
        </form>
    );
};
