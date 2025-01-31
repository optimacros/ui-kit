//@ts-nocheck

import React from 'react';
import type { InputTheme } from '../Input';
import { Field, Icon, IconButton, Select } from '@optimacros-ui/kit';
import { Flex } from '@optimacros-ui/kit';

export type SelectBoxTheme = {
    active: string;
    disabled: string;
    dropdown: string;
    error: string;
    errored: string;
    field: string;
    label: string;
    required: string;
    selected: string;
    focused: string;
    templateValue: string;
    up: string;
    value: string;
    values: string;
    Title: string;
};

type SelectBoxSourceLabel = keyof SelectBoxProps['source'][number];
type SelectBoxSourceValue = SelectBoxProps['source'][number][SelectBoxSourceLabel];

export interface SelectBoxProps {
    theme?: Partial<SelectBoxTheme & InputTheme>;
    multiSelect?: boolean;
    onChange?: (value: string | number | (string | number)[]) => void;
    options: any[];
    source: { [key: string]: any }[];
    labelKey?: string;
    valueKey?: string;
    name?: string;
    label?: string;
    value?: SelectBoxSourceValue | SelectBoxSourceValue[];
    allowBlank?: boolean;
    auto?: boolean;
    className?: string;
    disabled?: boolean;
    error?: string | null;
    onBlur?: (event: React.SyntheticEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    required?: boolean;
    template?: (item: SelectBoxProps['source'][number] | undefined) => React.ReactNode;
}

const getStatus = (disabled: boolean, error: boolean) => {
    switch (true) {
        case disabled:
            return 'readonly';
        case error:
            return 'error';
        default:
            return 'default';
    }
};

export const SelectBox: React.FC<SelectBoxProps> = ({
    label,
    className,
    multiSelect,
    theme: customTheme = {},
    value,
    source,
    options,
    onChange,
    required,
    error,
    ...rest
}) => {
    const handleChange = (newValue) => {
        const updatedValueArr = newValue.value;

        if (multiSelect && Array.isArray(value)) {
            onChange(updatedValueArr);
        } else {
            onChange(updatedValueArr[0]);
        }
    };

    return (
        <>
            {!multiSelect ? (
                <Select.Root
                    items={source || options}
                    value={value}
                    onValueChange={handleChange}
                    {...rest}
                >
                    <Select.Control>
                        <Select.Api>
                            {(api) => (
                                <Field.Root
                                    status={getStatus(api.disabled, Boolean(error))}
                                    required={required}
                                    invalid={error}
                                >
                                    <Select.Trigger>
                                        {label && (
                                            <Field.FloatingLabel>{label}</Field.FloatingLabel>
                                        )}
                                        <Field.TriggerInput
                                            value={api.empty ? 'choose value' : api.valueAsString}
                                        >
                                            <Field.Icon>
                                                <Icon value={'arrow_drop_down'} />
                                            </Field.Icon>
                                        </Field.TriggerInput>
                                        {error && <span>{error}</span>}
                                    </Select.Trigger>
                                </Field.Root>
                            )}
                        </Select.Api>
                    </Select.Control>

                    <Select.Positioner>
                        <Select.Content>
                            <Select.List>
                                {(item) => (
                                    <Select.Item item={item} key={item.key || item.value}>
                                        <Select.ItemLabel>
                                            {item.label || item.title}
                                        </Select.ItemLabel>
                                    </Select.Item>
                                )}
                            </Select.List>
                        </Select.Content>
                    </Select.Positioner>
                </Select.Root>
            ) : (
                <Select.Root
                    items={source || options}
                    value={value}
                    onValueChange={handleChange}
                    multiple={true}
                    {...rest}
                >
                    <Flex gap={5} direction="column">
                        <Flex gap={3} wrap="wrap">
                            Selected values:
                            <Select.Api>
                                {(api) =>
                                    api.value.map((value, i) => {
                                        return (
                                            <div key={i}>
                                                {value}
                                                <Select.ItemDeleteTrigger item={{ value }} asChild>
                                                    <IconButton size="sm" squared icon="close" />
                                                </Select.ItemDeleteTrigger>
                                            </div>
                                        );
                                    })
                                }
                            </Select.Api>
                        </Flex>
                        <Select.Control>
                            <Select.Api>
                                {(api) => (
                                    <Field.Root
                                        status={getStatus(api.disabled, Boolean(error))}
                                        required={required}
                                    >
                                        {label && (
                                            <Field.FloatingLabel>{label}</Field.FloatingLabel>
                                        )}
                                        <Select.Trigger {...api.getTriggerProps()}>
                                            <Field.TriggerInput
                                                value={
                                                    api.empty ? 'choose value' : api.valueAsString
                                                }
                                            >
                                                <Field.Icon>
                                                    <Icon value="arrow_drop_down" />
                                                </Field.Icon>
                                            </Field.TriggerInput>
                                        </Select.Trigger>

                                        {error && <span>{error}</span>}
                                    </Field.Root>
                                )}
                            </Select.Api>
                        </Select.Control>
                    </Flex>

                    <Select.Positioner>
                        <Select.Content>
                            <Select.List>
                                {(item) => (
                                    <Select.Item item={item} key={`select-${item.value}`}>
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
            )}
        </>
    );
};
