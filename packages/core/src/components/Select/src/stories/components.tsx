import { Flex } from '@optimacros-ui/flex';
import { Select } from '@optimacros-ui/select';
import { IconButton } from '@optimacros-ui/icon-button';
import { Icon } from '@optimacros-ui/icon';
import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<typeof Select.Root> {
    children: ReactNode;
}

export const ControlTemplate = ({ children, ...rest }: Props) => {
    return (
        <Select.Root {...rest} data-testid="root">
            <Flex gap={5} direction="column">
                <Flex gap={3} wrap="wrap">
                    Selected values:
                    <Select.Api>
                        {(api) =>
                            api.value.map((value) => {
                                return (
                                    <div data-testid="selected-item" key={value}>
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
                <Select.Control data-testid="control">{children}</Select.Control>
            </Flex>

            <Select.Positioner>
                <Select.Content data-testid="content">
                    <Select.List data-testid="list">
                        {(item, i) => (
                            <Select.Item
                                item={item}
                                key={`select-${item.value}`}
                                data-testid="item"
                            >
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
