import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Select } from './index';
import { Icon } from '@optimacros-ui/icon';
import { Field } from '@optimacros-ui/field';
import { useState } from 'react';
import { ValueChangeDetails } from '@zag-js/select';
import { Wrapper } from './stories/components';

const argTypes: Partial<ArgTypes> = {
    items: {
        control: 'object',
        description: 'Options array',
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
};

const meta: Meta<typeof Select.Root> = {
    title: 'UI Kit core/Select',
    component: Select.Root,
    argTypes,
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof Select.Root>;

export const Base: Story = {
    args: {},
    render: (props) => {
        const [value, setValue] = useState<string[]>([]);

        const handleValueChange = (details: ValueChangeDetails) => {
            setValue(details.value);
        };

        const items = [
            {
                label: 'item 0',
                value: 'item-value-0',
            },
            {
                label: 'item 1',
                value: 'item-value-1',
            },
            {
                label: 'item 2',
                value: 'item-value-2',
            },
            {
                label: 'item 3',
                value: 'item-value-3',
            },
        ];

        return (
            <Select.Root items={items} value={value} onValueChange={handleValueChange} {...props}>
                <Select.Control>
                    <Select.Api>
                        {(api) => (
                            <Field.Root status={api.disabled ? 'readonly' : 'default'}>
                                <Select.Trigger>
                                    <Field.TriggerInput
                                        value={api.empty ? 'choose value' : api.valueAsString}
                                    >
                                        <Field.Icon>
                                            <Icon value={'arrow_drop_down'} />
                                        </Field.Icon>
                                    </Field.TriggerInput>
                                </Select.Trigger>
                            </Field.Root>
                        )}
                    </Select.Api>
                </Select.Control>

                <Select.Positioner>
                    <Select.Content>
                        <Select.List>
                            {(item) => (
                                <Select.Item item={item} key={item.value}>
                                    {({ selected }) => (
                                        <>
                                            <div>
                                                {selected ? (
                                                    <Icon value="check_box" />
                                                ) : (
                                                    <Icon value="check_box_outline_blank" />
                                                )}
                                            </div>
                                            <Select.ItemLabel>{item.label}</Select.ItemLabel>
                                        </>
                                    )}
                                </Select.Item>
                            )}
                        </Select.List>
                    </Select.Content>
                </Select.Positioner>
            </Select.Root>
        );
    },
};

export {
    MultipleSelection,
    Deselectable,
    States,
    InputTrigger,
    VirtualSelect,
    ButtonTrigger,
    ButtonGroupTrigger,
    CloseOnSelect,
    Form,
} from './stories';
