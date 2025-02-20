import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Select } from './index';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';
import { fn } from '@storybook/test';
import { createSelectBoxItems, mockItems } from './mock';

const argTypes: Partial<ArgTypes> = {
    items: {
        control: false,
        description: 'Options array',
        type: {
            // вот это вот все ради required=true
            name: 'array',
            value: {
                name: 'object',
                value: {
                    value: { name: 'string' },
                    label: { name: 'string' },
                    index: { name: 'number' },
                },
            },
            required: true,
        },
        table: { type: { summary: 'ItemBase[]' } },
    },
    onValueChange: {
        description: `The callback fired when the selected item changes`,
        table: { type: { summary: '(details: ValueChangeDetails<T>) => void' } },
    },
    value: {
        description: `The keys of the selected items`,
        table: { type: { summary: 'string[]' } },
    },
    deselectable: {
        control: 'boolean',
        description:
            'Whether the value can be cleared by clicking the selected item. **Note:** this is only applicable for single selection',
        table: { defaultValue: { summary: 'false' } },
    },
    multiple: {
        control: 'boolean',
        description: 'Whether to allow multiple selection',
        table: { defaultValue: { summary: 'false' } },
    },
    closeOnSelect: {
        control: 'boolean',
        description: 'Whether the select should close after an item is selected',
        table: { defaultValue: { summary: 'true' } },
    },
    open: {
        control: 'boolean',
        description: 'Whether the dialog is open',
    },
    'open.controlled': {
        control: 'boolean',
        description: 'Whether the dialog is controlled by the user',
        table: { defaultValue: { summary: 'false' } },
    },
    controllable: {
        control: 'boolean',
        description: 'Whether the component handles props update',
        table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
        control: false,
        description: 'Callback to be invoked when the dialog is opened or closed',
        table: { type: { summary: '(details: OpenChangeDetails) => void' } },
    },

    disabled: {
        control: 'boolean',
        description: 'Whether the select is disabled',
        table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
        control: 'boolean',
        description: 'Whether the select is read-only',
        table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
        control: 'boolean',
        description: 'Whether the select is invalid',
        table: { defaultValue: { summary: 'false' } },
    },
    required: {
        control: 'boolean',
        description: 'Whether the select is required',
        table: { defaultValue: { summary: 'false' } },
    },
    positioning: {
        control: 'object',
        description: 'The user provided options used to position the popover content',
        table: {
            defaultValue: {
                summary:
                    '{  strategy: "absolute",  placement: "bottom-start",  listeners: true,  gutter: 8,  flip: true,  slide: true,  overlap: false,  sameWidth: false,  fitViewport: false,  overflowPadding: 8,  arrowPadding: 4, offset: { mainAxis: undefined, crossAxis: undefined }, }',
            },
            type: { summary: 'PositioningOptions' },
        },
    },
    defaultContext: { table: { disable: true } },
    id: { table: { disable: true } },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
};

const meta: Meta<typeof Select.Root> = {
    title: 'UI Kit core/Select',
    component: Select.Root,
    argTypes,
    decorators: [
        (Story) => (
            <div style={{ width: '400px' }}>
                <Story />
            </div>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof Select.Root>;

export const Basic: Story = {
    args: {
        controllable: true,
        items: mockItems,
        onOpenChange: fn(() => {
            console.info(1);
        }),
    },
    render: stories.Basic,
    play: scenarios.basic,
};

export const MultipleSelection: Story = {
    args: { items: mockItems, multiple: true, onValueChange: fn() },
    render: stories.MultipleSelection,
    play: scenarios.multipleSelection,
};

export const Deselectable: Story = {
    args: { controllable: true, items: mockItems, deselectable: true, closeOnSelect: false },
    render: stories.Deselectable,
    play: scenarios.select,
};

export const States: Story = {
    args: { items: mockItems },
    render: stories.States,
};

export const Positioning: Story = {
    args: {
        open: true,
        items: mockItems,
        positioning: {
            strategy: 'absolute',
            placement: 'bottom-start',
            listeners: true,
            gutter: 8,
            flip: true,
            slide: true,
            overlap: false,
            sameWidth: true,
            fitViewport: false,
            overflowPadding: 8,
            arrowPadding: 4,
            offset: { mainAxis: undefined, crossAxis: undefined },
        },
    },
    render: stories.Basic,
};

export const InputTrigger: Story = {
    args: { items: mockItems },
    render: stories.InputTrigger,
    tags: ['skip-test-runner'],
};

const mockManyItems = createSelectBoxItems(2000);

export const VirtualSelect: Story = {
    args: { items: mockManyItems },
    render: stories.VirtualSelect,
    tags: ['skip-test-runner'], // TODO включить когда-нибудь. сейчас не работает
};

export const ButtonTrigger: Story = {
    args: { items: mockItems },
    render: stories.ButtonTrigger,
    tags: ['skip-test-runner'],
};

export const ButtonGroupTrigger: Story = {
    args: { items: mockItems },
    render: stories.ButtonGroupTrigger,
    tags: ['skip-test-runner'],
};

export const CloseOnSelect: Story = {
    args: { items: mockItems, closeOnSelect: false, deselectable: true },
    render: stories.CloseOnSelect,
    tags: ['skip-test-runner'],
};

export const Form: Story = {
    args: { items: mockItems, form: 'form', name: 'select-story-1' },
    render: stories.Form,
    tags: ['skip-test-runner'],
};
