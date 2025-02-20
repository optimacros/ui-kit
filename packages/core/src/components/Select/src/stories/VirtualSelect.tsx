import { Select } from '@optimacros-ui/select';
import { Icon } from '@optimacros-ui/icon';
import { ComponentProps } from 'react';

export const VirtualSelect = (props: ComponentProps<typeof Select.Root>) => {
    return (
        <Select.Root {...props}>
            <Select.Control>
                <Select.Trigger>open</Select.Trigger>
            </Select.Control>

            <Select.Positioner>
                <Select.Content>
                    <Select.FloatingCloseTrigger>
                        <Icon value="close" />
                    </Select.FloatingCloseTrigger>

                    <Select.VirtualList>
                        {(item) => (
                            <Select.Item item={item} key={item.value}>
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
                    </Select.VirtualList>
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
};
