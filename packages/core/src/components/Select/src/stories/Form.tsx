import { Select } from '@optimacros-ui/select';
import { Icon } from '@optimacros-ui/icon';
import { Button } from '@optimacros-ui/button';
import { Flex } from '@optimacros-ui/flex';
import { ComponentProps } from 'react';

export const Form = (props: ComponentProps<typeof Select.Root>) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        console.info(...formData);
    };

    return (
        <form onSubmit={handleSubmit} id="form">
            <Flex direction="column" gap={5} align="center">
                <Flex gap={2} align="center">
                    <label htmlFor={props.name}>Select:</label>

                    <Select.Root {...props}>
                        <Select.Control>
                            <Select.Api>
                                {(api) => (
                                    <Button {...api.getTriggerProps()} variant="bordered">
                                        {api.empty ? 'choose value' : api.valueAsString}

                                        <Icon value="arrow_drop_down" />
                                    </Button>
                                )}
                            </Select.Api>
                        </Select.Control>

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
                                                    <Select.ItemLabel>
                                                        {item.label}
                                                    </Select.ItemLabel>
                                                </>
                                            )}
                                        </Select.Item>
                                    )}
                                </Select.List>
                            </Select.Content>
                        </Select.Positioner>
                    </Select.Root>
                </Flex>

                <input type="submit" value="submit" />
            </Flex>
        </form>
    );
};
