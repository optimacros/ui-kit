import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { Flex } from '@optimacros-ui/flex';
import { SelectBox, type SelectBoxProps as BaseSelectBoxProps } from '@optimacros-ui/kit-internal';
import { forward } from '@optimacros-ui/store';

export interface Item {
    value: string | number;
    label: string;
}

interface IMultipleSelectBoxPanel {
    selectedItems: Item[];
    onSelectedItem: () => void;
    onDeselectItem: (item: Item) => void;
    disabledSelect?: boolean;
    className?: string;
    addLabel?: string;
    removeLabel?: string;
    options?: Item[];
    source: Item[];
    onChange: (value: string | number) => void;
    value: string | number;
    label?: string;
    valueKey?: string;
}

export const MultipleSelectBoxPanel = forward<IMultipleSelectBoxPanel, HTMLSelectElement>(
    (
        {
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
        },
        ref,
    ) => {
        const renderItem = (item: Item) => (
            <Flex
                key={`${item.value}${item.label}`}
                data-testid="selected-item"
                align="center"
                direction="row"
            >
                <span>{item.label}</span>
                <Button
                    data-scope="select"
                    data-part="close-trigger"
                    onClick={() => onRemoveItem(item)}
                >
                    {removeLabel}
                    <Icon value="close" />
                </Button>
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

        const handleChange = (newValue: BaseSelectBoxProps['value']): void => {
            if (onChange) {
                onChange(newValue);
            }
        };

        const correctSource = options || source || [];

        const correctValue = !value ? [] : [value];

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
                            value={correctValue}
                            onChange={handleChange}
                        />
                        <select
                            ref={ref}
                            value={selectedItems.map((selectItem) => String(selectItem.value))}
                            multiple
                            style={{ display: 'none' }}
                        >
                            {selectedItems.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <Button
                            data-scope="select"
                            data-part="add-trigger"
                            disabled={disabledSelect}
                            onClick={onAddItem}
                        >
                            {addLabel}
                            <Icon value="add" />
                        </Button>
                    </Flex>
                </Flex>
            </div>
        );
    },
);
