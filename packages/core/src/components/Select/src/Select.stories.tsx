import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Select } from './index';
import { createSelectBoxItems } from './mock';
import { Icon } from '@optimacros-ui/icon';
import { Field } from '@optimacros-ui/field';
import { ReactNode } from 'react';
import { Button } from '@optimacros-ui/button';
import { ButtonGroup } from '@optimacros-ui/button-group';
import { IconButton } from '@optimacros-ui/icon-button';

const argTypes: Partial<ArgTypes> = {
    allowBlank: {
        control: 'boolean',
        description:
            'If `true`, the select box value can be empty. If `false` - value is first item of source.',
    },
    disabled: {
        control: 'boolean',
        description: 'If `true`, the select box will be disabled.',
    },
    required: {
        control: 'boolean',
        description: 'If `true`, the input element is required.',
    },
    auto: {
        control: 'boolean',
        description:
            'If `true`, then depending on the position of the select box on the page, ' +
            'the dropdown will appear above or below the select box.',
    },
    multiSelect: {
        control: 'boolean',
        description:
            'If `true`, value must be an array and the menu will support multiple selections.',
    },
    label: {
        control: 'text',
        description: 'The label of the select box container.',
    },
    labelKey: {
        control: 'text',
        description: 'Name of property used for display options names.',
    },
    value: {
        control: 'text',
        description: 'The value of the input element.',
    },
    valueKey: {
        control: 'text',
        description: 'Name of property used like select box value.',
    },
    name: {
        control: 'text',
        description: 'Name attribute of the input element.',
    },
    error: {
        control: 'text',
        description: 'If not empty, the error will be shown.',
    },
    source: {
        control: 'object',
        description: 'Array of options for select.',
    },
    theme: { table: { disable: true } },
    template: { table: { disable: true } },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onFocus: { table: { disable: true } },
};
const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px' }}>{children}</div>
);
const meta: Meta<typeof Select> = {
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

type Story = StoryObj<typeof Select>;
const mockItems = createSelectBoxItems(20);
const defaultContext = {
    name: 'select-story-1',
    closeOnSelect: false,
    multiple: true,
    deselectable: true,
    // value: [mockItems[0].value],
};

const ControlTemplate = ({ children, ...rest }) => {
    return (
        <Select.Root items={mockItems} {...rest} {...defaultContext}>
            <div className="flex">
                <Select.Api>
                    {(api) =>
                        api.value.map((value) => {
                            return (
                                <div className="bg-primary p-1.5 rounded-xs">
                                    {value}
                                    <Select.ItemDeleteTrigger item={{ value }} asChild>
                                        <IconButton size="sm" squared>
                                            <Icon value={'close'} />
                                        </IconButton>
                                    </Select.ItemDeleteTrigger>
                                </div>
                            );
                        })
                    }
                </Select.Api>
            </div>

            <Select.Control>{children}</Select.Control>

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
};

export const InputTrigger = (props) => {
    return (
        <ControlTemplate {...props}>
            <Select.Api>
                {(api) => (
                    <Field.Root status={api.disabled ? 'readonly' : 'default'}>
                        <Field.FloatingLabel>label</Field.FloatingLabel>

                        <Select.HiddenInput />

                        <Field.TriggerInput
                            {...api.getTriggerProps()}
                            value={api.empty ? 'choose value' : api.valueAsString}
                        >
                            <Field.Icon>
                                <Icon value={'arrow_drop_down'} />
                            </Field.Icon>
                        </Field.TriggerInput>
                    </Field.Root>
                )}
            </Select.Api>
        </ControlTemplate>
    );
};

export const ButtonTrigger = (props) => {
    return (
        <ControlTemplate {...props}>
            <Select.Api>
                {(api) => (
                    <Button {...api.getTriggerProps()} variant="bordered">
                        {api.empty ? 'choose value' : api.valueAsString}
                        <div className="data-[active=true]:rotate-180" data-active={api.open}>
                            <Icon value={'arrow_drop_down'} />
                        </div>
                    </Button>
                )}
            </Select.Api>
        </ControlTemplate>
    );
};

export const ButtonGroupTrigger = (props) => {
    return (
        <ControlTemplate {...props}>
            <Select.Api>
                {(api) => (
                    <ButtonGroup.Root>
                        <ButtonGroup.Item>
                            {api.empty ? 'choose value' : api.valueAsString}
                        </ButtonGroup.Item>
                        <ButtonGroup.Item {...api.getTriggerProps()}>
                            <div className="data-[active=true]:rotate-180" data-active={api.open}>
                                <IconButton>
                                    <Icon value={'arrow_drop_down'} />
                                </IconButton>
                            </div>
                        </ButtonGroup.Item>
                    </ButtonGroup.Root>
                )}
            </Select.Api>
        </ControlTemplate>
    );
};

const mockManyItems = createSelectBoxItems(2000);
export const VirtualSelect = ({ children, ...rest }) => {
    return (
        <Select.Root items={mockManyItems} {...rest} {...defaultContext}>
            <Select.Control>
                <Select.Trigger>open</Select.Trigger>
            </Select.Control>
            <Select.Positioner>
                <Select.Content>
                    <Select.FloatingCloseTrigger>
                        <Icon value="close" />
                    </Select.FloatingCloseTrigger>

                    <Select.VirtualList>
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
                    </Select.VirtualList>
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
};
