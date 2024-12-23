import { Flex } from '@optimacros-ui/flex';
import { Select } from '@optimacros-ui/select';
import { mockItems } from '../mock';
import { IconButton } from '@optimacros-ui/icon-button';
import { Icon } from '@optimacros-ui/icon';
import { ReactNode } from 'react';

export const defaultContext = {
    name: 'select-story-1',
    value: [mockItems[0].value],
};

export const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px' }}>{children}</div>
);

export const ControlTemplate = ({ children, ...rest }) => {
    return (
        <Select.Root items={mockItems} {...defaultContext} {...rest}>
            <Flex gap={5} direction="column">
                <Flex direction="column">
                    Selected values:
                    <Select.Api>
                        {(api) =>
                            api.value.map((value) => {
                                return (
                                    <div className="bg-primary p-1.5 rounded-xs">
                                        {value}
                                        <Select.ItemDeleteTrigger item={{ value }} asChild>
                                            <IconButton size="sm" squared icon="close" />
                                        </Select.ItemDeleteTrigger>
                                    </div>
                                );
                            })
                        }
                    </Select.Api>
                </Flex>

                <Select.Control>{children}</Select.Control>
            </Flex>

            <Select.Positioner>
                <Select.Content>
                    <Select.List>
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
                    </Select.List>
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
};
