//@ts-nocheck

import { Checkbox, Field } from '@optimacros-ui/kit';
import { Modal } from '@optimacros-ui/modal';
import { useState } from 'react';
import { Toolbar } from './index';
import { Button } from '@optimacros-ui/button';
import { Align } from '@optimacros-ui/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const argTypes: Partial<ArgTypes> = {
    align: {
        control: 'radio',
        options: Object.values(Align) as string[],
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
};

const meta: Meta<typeof Toolbar.Root> = {
    title: 'UI Kit core/Toolbar',
    component: Toolbar.Root,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Toolbar.Root>;

const Children = (
    <>
        <Button variant="accent"> Cancel </Button>
        <Button variant="primary"> Submit </Button>
    </>
);

export const Base: Story = { args: { children: Children } };

export const Left: Story = { args: { children: Children, align: Align.Left } };

export const Center: Story = { args: { children: Children, align: Align.Center } };

export const RightInRow: Story = { args: { children: Children, align: Align.RightInRow } };

export const Small: Story = { args: { children: Children, isSmall: true } };

export const WithModal: Story = {
    args: { isSmall: true },
    render: (props) => {
        const [open, setOpen] = useState(false);

        const handleOpenChange = (details) => {
            setOpen(details.open);
        };

        return (
            <>
                <Button onClick={() => setOpen(true)}>Open Modal</Button>
                <Modal.Root open={open} onOpenChange={handleOpenChange} controllable>
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
    },
};

export const WithForm: Story = {
    args: { align: Align.Center, isSmall: true },
    render: (props) => {
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
                <Toolbar.Root {...props}>
                    <Button variant="primary">Cancel</Button>
                    <Button variant="accent">Submit</Button>
                </Toolbar.Root>
            </form>
        );
    },
};
