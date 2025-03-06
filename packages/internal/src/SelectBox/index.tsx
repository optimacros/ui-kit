import type React from 'react';
import { Field } from '@optimacros-ui/field';
import { Icon } from '@optimacros-ui/icon';
import { IconButton } from '@optimacros-ui/icon-button';
import { Select } from '@optimacros-ui/select';
import { Flex } from '@optimacros-ui/flex';
import { forward } from '@optimacros-ui/store';
import type { InputTheme } from '../Input';
import { clsx, isUndefined } from '@optimacros-ui/utils';
import './styles.css';

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
type SourceItem = { [key: string]: any };

export interface SelectBoxProps {
    theme?: Partial<SelectBoxTheme & InputTheme>;
    multiSelect?: boolean;
    onChange?: (value: string | number | (string | number)[]) => void;
    options?: any[];
    source: SourceItem[];
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
    placeholder?: string;
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

export const SelectBox = forward<SelectBoxProps, HTMLSelectElement>(
    (
        {
            label,
            className,
            multiSelect,
            theme = {},
            value,
            source,
            options,
            onChange,
            required,
            error,
            labelKey,
            valueKey,
            placeholder = 'choose value',
            disabled,
            ...rest
        },
        ref,
    ) => {
        const handleChange = (newValue) => {
            const updatedValueArr = newValue.value;

            if (multiSelect && Array.isArray(value)) {
                onChange?.(updatedValueArr);
            } else {
                onChange?.(updatedValueArr[0]);
            }
        };

        const itemToString = (item: SourceItem) => item[labelKey];
        const itemToValue = (item: SourceItem) => item[valueKey];

        let items = source || options;
        let curValue = !value || Array.isArray(value) ? value : [value];

        const isNullInItems = items.some((item) => item.value === null);
        if (isNullInItems) {
            curValue = ['null'];
            items = items.map((item) => (item.value === null ? { ...item, value: 'null' } : item));
        }

        const cn = clsx(
            theme.dropdown,
            {
                [theme.disabled]: disabled ?? false,
                [theme.required]: required ?? false,
            },
            className,
        );

        return (
            <>
                {!multiSelect ? (
                    <Select.Root
                        data-tag="internal"
                        items={items}
                        defaultValue={curValue}
                        value={isUndefined(onChange) ? undefined : curValue}
                        onValueChange={handleChange}
                        itemToString={itemToString}
                        itemToValue={itemToValue}
                        {...rest}
                    >
                        <Select.HiddenInput ref={ref}>
                            {items.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select.HiddenInput>

                        <Select.Control>
                            <Select.Api>
                                {(api) => (
                                    <Field.Root
                                        status={getStatus(api.disabled, Boolean(error))}
                                        required={required}
                                    >
                                        <Select.Trigger>
                                            {label && (
                                                <Field.FloatingLabel>{label}</Field.FloatingLabel>
                                            )}
                                            <Field.TriggerInput
                                                value={api.empty ? placeholder : api.valueAsString}
                                                className={theme.value}
                                            >
                                                <Field.Icon>
                                                    <Icon value="arrow_drop_down" />
                                                </Field.Icon>
                                            </Field.TriggerInput>
                                            {error && <span>{error}</span>}
                                        </Select.Trigger>
                                    </Field.Root>
                                )}
                            </Select.Api>
                        </Select.Control>

                        <Select.Positioner>
                            <Select.Content className={cn}>
                                <Select.List>
                                    {(item: SourceItem) => (
                                        <Select.Item
                                            item={item as Select.ItemBase}
                                            key={item.key || item.value}
                                        >
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
                        items={items}
                        value={curValue}
                        onValueChange={handleChange}
                        multiple={true}
                        itemToString={itemToString}
                        itemToValue={itemToValue}
                        {...rest}
                    >
                        <Select.HiddenInput ref={ref}>
                            {items.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select.HiddenInput>

                        <Flex gap={5} direction="column">
                            <Flex gap={3} wrap="wrap">
                                Selected values:
                                <Select.Api>
                                    {(api) =>
                                        api.value.map((value, i) => {
                                            return (
                                                <div key={i}>
                                                    {value}
                                                    <Select.ItemDeleteTrigger
                                                        item={{ value }}
                                                        asChild
                                                    >
                                                        <IconButton
                                                            size="sm"
                                                            squared
                                                            icon="close"
                                                        />
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
                                                        api.empty ? placeholder : api.valueAsString
                                                    }
                                                    className={theme.value}
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
                            <Select.Content className={cn}>
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
                                                    <Select.ItemLabel>
                                                        {item.label}
                                                    </Select.ItemLabel>
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
    },
);
