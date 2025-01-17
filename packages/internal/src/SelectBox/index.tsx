import React from 'react';
import { without } from 'lodash';
import type { SelectBoxTheme, SelectBoxProps as Props } from './SelectBox';
import type { InputTheme } from '../Input';
import { Field, Icon, IconButton, Select } from '@optimacros-ui/kit';
import { Flex } from '@optimacros-ui/flex';

export interface SelectBoxProps extends Omit<Props, 'theme'> {
    theme?: Partial<SelectBoxTheme & InputTheme>;
    multiSelect?: boolean;
    onChange?: (value: string | number | (string | number)[], event?: React.SyntheticEvent) => void;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
    label,
    className,
    multiSelect,
    theme: customTheme = {},
    value,
    source,
    onChange,
    ...otherProps
}) => {
    // Функция обработки изменения значения
    const handleChange = (newValue: string | number, event: React.SyntheticEvent) => {
        let updatedValue: SelectBoxProps['value'] = newValue;

        if (multiSelect && Array.isArray(value)) {
            updatedValue = [...value, newValue];
        }

        if (onChange) {
            onChange(updatedValue, event);
        }
    };

    // Функция удаления элемента
    const handleDelete = (deletedValue: string | number) => {
        if (!Array.isArray(value)) {
            return;
        }

        const newValue = without(value, deletedValue);

        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        //     <SelectBoxComponent
        //         auto={false}
        //         {...otherProps}
        //         source={filteredElements}
        //         onChange={handleChange}
        //     />
        <>
            {!multiSelect ? (
                <Select.Root items={source} value={value} onValueChange={onChange} {...otherProps}>
                    <Select.Control>
                        <Select.Api>
                            {(api) => (
                                <Field.Root status={api.disabled ? 'readonly' : 'default'}>
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
                                    </Select.Trigger>
                                </Field.Root>
                            )}
                        </Select.Api>
                    </Select.Control>

                    <Select.Positioner>
                        <Select.Content>
                            <Select.List>
                                {(item) => (
                                    <Select.Item item={item} key={item.key}>
                                        <Select.ItemLabel>{item.label}</Select.ItemLabel>
                                    </Select.Item>
                                )}
                            </Select.List>
                        </Select.Content>
                    </Select.Positioner>
                </Select.Root>
            ) : (
                <>
                    <Select.Root {...otherProps} items={source}>
                        <Flex gap={5} direction="column">
                            <Flex gap={3} wrap="wrap">
                                Selected values:
                                <Select.Api>
                                    {(api) =>
                                        api.value.map((value) => {
                                            return (
                                                <div className="bg-primary p-1.5 rounded-xs">
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
                                        <Field.Root status={api.disabled ? 'readonly' : 'default'}>
                                            <Field.TriggerInput
                                                {...api.getTriggerProps()}
                                                value={
                                                    api.empty ? 'choose value' : api.valueAsString
                                                }
                                            >
                                                <Field.Icon>
                                                    <Icon value={'arrow_drop_down'} />
                                                </Field.Icon>
                                            </Field.TriggerInput>
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
                </>
            )}
        </>
    );
};
