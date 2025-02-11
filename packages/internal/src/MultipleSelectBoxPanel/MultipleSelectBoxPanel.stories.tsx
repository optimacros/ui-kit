import { useState, useMemo } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ISelectBox, MultipleSelectBoxPanel, Item } from '@optimacros-ui/kit-internal';

const meta: Meta<typeof MultipleSelectBoxPanel> = {
    title: 'UI Kit internal/MultipleSelectBox',
    component: MultipleSelectBoxPanel,
    tags: ['autodocs'],
    argTypes: {
        selectedItems: {
            control: 'object',
            description: 'Array of currently selected items',
        },
        onSelectedItem: {
            action: 'selectedItem',
            description: 'Callback when an item is selected',
        },
        onDeselectItem: {
            action: 'deselectedItem',
            description: 'Callback when an item is deselected',
        },
        disabledSelect: {
            control: 'boolean',
            description: 'Whether the select functionality is disabled',
            defaultValue: false,
        },
        className: {
            control: 'text',
            description: 'Additional CSS class',
        },
        addLabel: {
            control: 'text',
            description: 'Label for add action',
            defaultValue: 'Add',
        },
        removeLabel: {
            control: 'text',
            description: 'Label for remove action',
            defaultValue: 'Remove',
        },
        options: {
            control: 'object',
            description: 'Available options to select from',
        },
        source: {
            control: 'object',
            description: 'Source items array',
        },
        onChange: {
            action: 'changed',
            description: 'Callback when value changes',
        },
        value: {
            control: 'text',
            description: 'Current value',
        },
    },
};

export default meta;

type Story = StoryObj<typeof MultipleSelectBoxPanel>;

const defaultOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
];

const MultipleState = ({ source, value, selectedItems, disabledSelect, ...rest }: any) => {
    const [selectedItem, setSelectedItem] = useState<ISelectBox['value']>(value || null);
    const [addedItems, setAddedItems] = useState<Item[]>(selectedItems || []);

    const items = source || defaultOptions;

    const onAddItem = () => {
        if (!selectedItem) {
            return;
        }

        const sourceItem: Item = items.find((item) => item.value === selectedItem);

        setAddedItems((prev) => [...prev, sourceItem]);
        setSelectedItem(null);
    };

    const onDeleteItem = (deselectItem: Item) => {
        setAddedItems((prevItems) => prevItems.filter((item) => item !== deselectItem));
    };

    const onSelect = (selectedItem: number | string) => {
        setSelectedItem(selectedItem);
    };

    const getOptions = useMemo((): Item[] => {
        return items.filter((sourceItem: { value: string; label: string }) => {
            return !addedItems.some((addedItem) => addedItem.value === sourceItem.value);
        });
    }, [addedItems]);

    return (
        <MultipleSelectBoxPanel
            {...rest}
            source={getOptions}
            value={selectedItem}
            selectedItems={addedItems}
            onSelectedItem={onAddItem}
            onDeselectItem={onDeleteItem}
            onChange={onSelect}
            disabledSelect={disabledSelect || getOptions.length <= 0}
        />
    );
};

export const Basic: Story = {
    render: (args) => <MultipleState {...args} />,
};

export const SelectedItems: Story = {
    args: {
        selectedItems: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
        ],
    },
    render: (args) => <MultipleState {...args} />,
};

export const DefaultValue: Story = {
    args: {
        value: '1',
    },
    render: (args) => <MultipleState {...args} />,
};

export const DisabledSelect: Story = {
    args: {
        disabledSelect: true,
    },
    render: (args) => <MultipleState {...args} />,
};

export const Label: Story = {
    args: {
        label: 'Select',
    },
    render: (args) => <MultipleState {...args} />,
};

export const CustomButtonsLabels: Story = {
    args: {
        addLabel: 'Add to Selection',
        removeLabel: 'Remove from Selection',
    },
    render: (args) => <MultipleState {...args} />,
};

export const LongOptions: Story = {
    args: {
        source: [
            { value: '1', label: 'Very Long Option Label That Might Need Truncation 1' },
            { value: '2', label: 'Very Long Option Label That Might Need Truncation 2' },
            { value: '3', label: 'Very Long Option Label That Might Need Truncation 3' },
        ],
        selectedItems: [
            { value: '1', label: 'Very Long Option Label That Might Need Truncation 1' },
        ],
    },
    render: (args) => <MultipleState {...args} />,
};
