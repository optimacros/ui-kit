import { ReactNode, useState, useMemo } from 'react';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { SelectBoxProps, MultipleSelectBoxPanel, Item } from '@optimacros-ui/kit-internal';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof MultipleSelectBoxPanel> = {
    title: 'UI KIT Internal/MultipleSelectBoxPanel',
    component: MultipleSelectBoxPanel,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof MultipleSelectBoxPanel>;

const source = [
    { label: 'Newer first', value: 1 },
    { label: 'Older first', value: 2 },
    { label: 'No sort', value: 3 },
];

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '400px' }}>{children}</div>
);

const Template: Story = {
    render: () => {
        const [selectedItem, setSelectedItem] = useState<SelectBoxProps['value']>(1);
        const [addedItems, setAddedItems] = useState<Item[]>([]);

        const onAddItem = () => {
            if (!selectedItem) {
                return;
            }

            const sourceItem: Item = source.find((item) => item.value === selectedItem);

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
            return source.filter((sourceItem) => {
                return !addedItems.some((addedItem) => addedItem.value === sourceItem.value);
            });
        }, [addedItems]);

        return (
            <MultipleSelectBoxPanel
                label="title MultipleSelectBoxPanel"
                options={getOptions}
                value={selectedItem}
                selectedItems={addedItems}
                onSelectedItem={onAddItem}
                onDeselectItem={onDeleteItem}
                onChange={onSelect}
                disabledSelect={source.length <= 0}
            />
        );
    },
};

export const Basic: Story = {
    ...Template,
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};
