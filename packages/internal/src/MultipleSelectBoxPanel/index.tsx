import { IconButton } from '@optimacros-ui/icon-button';
import { WSSelectBox as SelectBox } from '../WSSelectBox';

interface Item {
    value: string;
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
}

export const MultipleSelectBoxPanel: MultipleSelectBoxPanelProps = ({
    className,
    selectedItems,
    onSelectedItem,
    onDeselectItem,
    disabledSelect = false,
    addLabel = 'Add',
    removeLabel = 'Remove',
    ...otherProps
}) => {
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

    return (
        <div>
            <div>
                <SelectBox {...otherProps} />
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
