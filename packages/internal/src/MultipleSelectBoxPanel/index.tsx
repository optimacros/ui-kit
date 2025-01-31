//@ts-nocheck
import React from 'react';
import { IconButton } from '@optimacros-ui/kit';
import { Flex } from '@optimacros-ui/kit';
import { SelectBox, type SelectBoxProps as BaseSelectBoxProps } from '@optimacros-ui/kit-internal';

export interface Item {
    value: string | number;
    label: string;
}

interface MultipleSelectBoxPanelProps {
    selectedItems: Item[];
    onSelectedItem: () => void;
    onDeselectItem: (item: Item) => void;
    disabledSelect?: boolean;
    className?: string;
    addLabel?: string;
    removeLabel?: string;
    options: Item[];
    source: Item[];
    onChange: (value: string | number) => void;
    value: string | number;
}

export const MultipleSelectBoxPanel = ({
    className,
    selectedItems,
    onSelectedItem,
    onDeselectItem,
    disabledSelect = false,
    addLabel = 'Add',
    removeLabel = 'Remove',
    options,
    source,
    onChange,
    value,
    ...rest
}: MultipleSelectBoxPanelProps) => {
    const renderItem = (item: Item) => (
        <Flex
            key={`${item.value}${item.label}`}
            data-testid="selected-item"
            align="center"
            direction="row"
        >
            <span>{item.label}</span>
            <IconButton
                data-scope="select"
                data-part="close-trigger"
                icon="close"
                label={removeLabel}
                onClick={() => onRemoveItem(item)}
            />
        </Flex>
    );

    const renderItems = () => {
        return selectedItems?.map(renderItem);
    };

    const onAddItem = () => {
        onSelectedItem();
    };

    const onRemoveItem = (item: Item) => {
        onDeselectItem(item);
    };

    const handleChange = (
        newValue: BaseSelectBoxProps['value'],
        event?: React.SyntheticEvent,
    ): void => {
        if (onChange) {
            onChange(newValue, event);
        }
    };

    const correctSource = options || source || [];

    const isValueExist = () => {
        for (const item of correctSource) {
            if (item[rest.valueKey ?? 'value'] === value) {
                return true;
            }
        }

        return false;
    };

    const isNullExist = () => {
        for (const item of correctSource) {
            if (item[rest.valueKey ?? 'value'] === null) {
                return true;
            }
        }

        return false;
    };

    const correctValue = value === 0 && !isValueExist() && isNullExist() ? null : value;

    return (
        <div data-scope="select" data-part="root">
            <Flex direction="column" align="start" wrap="nowrap">
                <Flex direction="row">{renderItems()}</Flex>
                <Flex direction="column">
                    <SelectBox
                        // TODO: Handle the select update
                        key={correctSource.length}
                        {...rest}
                        source={correctSource}
                        value={[correctValue]}
                        onChange={handleChange}
                    />
                    <IconButton
                        data-scope="select"
                        data-part="add-trigger"
                        disabled={disabledSelect}
                        icon="add"
                        label={addLabel}
                        onClick={onAddItem}
                    />
                </Flex>
            </Flex>
        </div>
    );
};
