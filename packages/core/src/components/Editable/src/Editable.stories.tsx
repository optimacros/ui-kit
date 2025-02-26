import type { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Editable } from '.';
import { Flex } from '@optimacros-ui/flex';
import { Button } from '@optimacros-ui/button';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';
import { EditableProps } from './Editable';
import { fn } from '@storybook/test';

const argTypes: ArgTypes<Partial<EditableProps>> = {
    defaultValue: {
        control: 'text',
        description: 'The value of the editable in both edit and preview mode',
    },
    value: {
        control: 'text',
        description: 'The value of the editable in both edit and preview mode',
    },
    onValueChange: {
        control: false,
        description: `The callback that is called when the editable's value is changed`,
        table: {
            type: { summary: `(details: ValueChangeDetails) => void` },
        },
    },
    onValueCommit: {
        control: false,
        description: `The callback that is called when the editable's value is submitted.`,
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    submitMode: {
        control: 'select',
        options: ['blur', 'enter', 'both', 'none'],
        description: `The action that triggers submit in the edit mode`,
        table: {
            type: { summary: 'blur | enter | both | none' },
            defaultValue: { summary: 'both' },
        },
    },
    edit: {
        control: 'boolean',
        description: 'Whether the editable is in edit mode.',
        table: { defaultValue: { summary: 'false' } },
    },
    'edit.controlled': {
        control: 'boolean',
        description: 'Whether the editable is controlled',
        table: { defaultValue: { summary: 'false' } },
    },
    onEditChange: {
        control: false,
        description: `The callback that is called when the edit mode is changed`,
        table: { type: { summary: '(details: EditChangeDetails) => void' } },
    },
    selectOnFocus: {
        control: 'boolean',
        description: `Whether to select the text in the input when it is focused`,
        table: { defaultValue: { summary: 'true' } },
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
    args: {
        defaultValue: '',
    },
};

export default meta;

type Story = StoryObj<typeof Editable.RootProvider>;

export const Basic: Story = {
    args: {
        submitMode: 'both',
        defaultValue: 'value',

        invalid: false,
        disabled: false,
        readOnly: false,
        required: false,
        placeholder: 'placeholder',
        maxLength: undefined,
        autoResize: false,
        onValueChange: fn(),
        onValueCommit: fn(),
    },
    render: stories.Basic,
    play: scenarios.basic,
};

export const Controlled: Story = {
    args: {
        submitMode: 'both',
        invalid: false,
        disabled: false,
        readOnly: false,
        required: false,
        placeholder: 'placeholder',
        maxLength: undefined,
        autoResize: false,
    },
    render: stories.Controlled,
};

export const TextArea: Story = {
    args: {
        defaultEdit: true,
        defaultValue:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    },
    render: (props) => (
        <Editable.RootProvider {...props}>
            {(api) => (
                <Editable.Root>
                    <Editable.Area>
                        <Editable.TextArea />
                        <Editable.Preview />
                    </Editable.Area>

                    {!api.editing ? (
                        <Editable.EditTrigger asChild>
                            <Button variant="accent">Edit</Button>
                        </Editable.EditTrigger>
                    ) : (
                        <Flex align="center" gap={2}>
                            <Editable.SubmitTrigger asChild>
                                <Button variant="accent">Save</Button>
                            </Editable.SubmitTrigger>
                            <Editable.CancelTrigger asChild>
                                <Button variant="accent">Cancel</Button>
                            </Editable.CancelTrigger>
                        </Flex>
                    )}
                </Editable.Root>
            )}
        </Editable.RootProvider>
    ),
};

export const AutoResize = {
    args: {
        placeholder: 'start typing',
        autoResize: true,
        onValueChange: fn(),
    },
    render: stories.Basic,
    play: scenarios.autoResize,
};

export const Placeholder = {
    args: { placeholder: 'placeholder' },
    render: stories.Basic,
    play: scenarios.placeholder,
};

export const States = {
    args: { selectOnFocus: false, onEditChange: fn() },
    render: stories.States,
    play: scenarios.states,
};

export const MaxLength = {
    args: {
        placeholder: 'max length = 10',
        maxLength: 10,
        onValueChange: fn(),
    },
    render: stories.Basic,
    play: scenarios.maxLength,
};
