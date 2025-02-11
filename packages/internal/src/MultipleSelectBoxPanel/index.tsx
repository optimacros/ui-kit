import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { Flex } from '@optimacros-ui/flex';
import { SelectBox, type ISelectBox as BaseSelectBoxProps } from '@optimacros-ui/kit-internal';
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

export const MultipleSelectBoxPanel = forward<IMultipleSelectBoxPanel, 'div'>(
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
            <div data-scope="select" data-part="root" ref={ref}>
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
