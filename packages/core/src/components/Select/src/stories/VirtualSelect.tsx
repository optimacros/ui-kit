import { Select } from '@optimacros-ui/select';
import { createSelectBoxItems } from '../mock';
import { Icon } from '@optimacros-ui/icon';
import { defaultContext } from './components';

const mockManyItems = createSelectBoxItems(2000);
export const VirtualSelect = ({ children, ...rest }) => {
    return (
        <Select.Root items={mockManyItems} {...rest} {...defaultContext}>
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
