import type { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Editable } from '@optimacros-ui/editable';
import { useState } from 'react';
import { Flex } from '@optimacros-ui/flex';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: 'text',
        description: 'The value of the editable in both edit and preview mode',
    },
    onValueCommit: {
        control: false,
        description: `The callback that is called when the editable's value is submitted.`,
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    edit: {
        control: 'boolean',
        description: 'Whether the editable is in edit mode.',
        table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
        control: 'boolean',
        description: `Whether the input's value is invalid.`,
        table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the editable is disabled',
        table: { defaultValue: { summary: 'false' } },
    },
    required: {
        control: 'boolean',
        description: 'Whether the editable is required',
        table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
        control: 'boolean',
        description: 'Whether the editable is readonly',
        table: { defaultValue: { summary: 'false' } },
    },
    placeholder: {
        control: 'text',
        description: 'The placeholder value to show when the `value` is empty',
        table: {
            defaultValue: { summary: '' },
        },
    },
    maxLength: {
        control: 'number',
        description: 'The maximum number of characters allowed in the editable',
        table: {
            defaultValue: { summary: '' },
        },
    },
    autoResize: {
        control: 'boolean',
        description: 'Whether the editable should auto-resize to fit the content.',
        table: { defaultValue: { summary: 'false' } },
    },
};

const meta: Meta<typeof Editable.RootProvider> = {
    title: 'UI Kit core/Editable',
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Editable.RootProvider>;

export const Basic: Story = {
    render: (props) => {
        const [value, setValue] = useState('value');

        const handleCommit = (details) => {
            setValue(details.value);
        };

        return (
            <Editable.RootProvider value={value} onValueCommit={handleCommit} {...props}>
                {(api) => (
                    <Editable.Root>
                        <Editable.Area>
                            <Editable.Input />
                            <Editable.Preview />
                        </Editable.Area>

                        {!api.editing ? (
                            <Editable.EditTrigger>Edit</Editable.EditTrigger>
                        ) : (
                            <Flex align="center" gap={2}>
                                <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
                                <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
                            </Flex>
                        )}
                    </Editable.Root>
                )}
            </Editable.RootProvider>
        );
    },
};

export const TextArea: Story = {
    render: (props) => (
        <Editable.RootProvider {...props}>
            {(api) => (
                <Editable.Root>
                    <Editable.Area>
                        <Editable.TextArea />
                        <Editable.Preview />
                    </Editable.Area>

                    {!api.editing ? (
                        <Editable.EditTrigger>Edit</Editable.EditTrigger>
                    ) : (
                        <Flex align="center" gap={2}>
                            <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
                            <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
                        </Flex>
                    )}
                </Editable.Root>
            )}
        </Editable.RootProvider>
    ),
};

export { Controlled, States, Placeholder, MaxLength, AutoResize } from './stories';
