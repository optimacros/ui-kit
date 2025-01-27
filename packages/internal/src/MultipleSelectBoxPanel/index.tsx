import React from 'react';
import { IconButton } from '@optimacros-ui/icon-button';
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
        <div key={`${item.value}${item.label}`}>
            <div>{item.label}</div>
            <IconButton
                icon="remove_circle_outline"
                label={removeLabel}
                onClick={() => onRemoveItem(item)}
            />
        </div>
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
        <div>
            <div>
                <SelectBox
                    // TODO: Handle the select update
                    key={correctSource.length}
                    {...rest}
                    source={correctSource}
                    value={[correctValue]}
                    onChange={handleChange}
                />
                <IconButton
                    disabled={disabledSelect}
                    icon="add"
                    label={addLabel}
                    onClick={onAddItem}
                />
            </div>
            <div>{renderItems()}</div>
        </div>
    );
};
