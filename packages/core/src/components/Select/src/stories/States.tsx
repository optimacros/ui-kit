//@ts-nocheck

import { Icon } from '@optimacros-ui/icon';
import { ButtonGroup } from '@optimacros-ui/button-group';
import { ControlTemplate } from './components';
import { Select } from '@optimacros-ui/select';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';

export const States = () => {
    return (
        <Flex direction="column" gap={4}>
            <Flex direction="column" gap={2}>
                <Text.Title as="h5">Disabled</Text.Title>
                <ControlTemplate disabled>
                    <Select.Api>
                        {(api) => (
                            <ButtonGroup.Root>
                                <ButtonGroup.Item>
                                    {api.empty ? 'choose value' : api.valueAsString}
                                </ButtonGroup.Item>
                                <ButtonGroup.Item
                                    {...api.getTriggerProps()}
                                    className="data-[state=open]:rotate-180"
                                >
                                    <Icon value="arrow_drop_down" />
                                </ButtonGroup.Item>
                            </ButtonGroup.Root>
                        )}
                    </Select.Api>
                </ControlTemplate>
            </Flex>

            <Flex direction="column" gap={2}>
                <Text.Title as="h5">Read only</Text.Title>
                <ControlTemplate readOnly>
                    <Select.Api>
                        {(api) => (
                            <ButtonGroup.Root>
                                <ButtonGroup.Item>
                                    {api.empty ? 'choose value' : api.valueAsString}
                                </ButtonGroup.Item>
                                <ButtonGroup.Item
                                    {...api.getTriggerProps()}
                                    className="data-[state=open]:rotate-180"
                                >
                                    <Icon value="arrow_drop_down" />
                                </ButtonGroup.Item>
                            </ButtonGroup.Root>
                        )}
                    </Select.Api>
                </ControlTemplate>
            </Flex>

            <Flex direction="column" gap={2}>
                <Text.Title as="h5">Invalid</Text.Title>
                <ControlTemplate invalid>
                    <Select.Api>
                        {(api) => (
                            <ButtonGroup.Root style={{ border: '1px solid red' }}>
                                <ButtonGroup.Item>
                                    {api.empty ? 'choose value' : api.valueAsString}
                                </ButtonGroup.Item>
                                <ButtonGroup.Item
                                    {...api.getTriggerProps()}
                                    className="data-[state=open]:rotate-180"
                                >
                                    <Icon value="arrow_drop_down" />
                                </ButtonGroup.Item>
                            </ButtonGroup.Root>
                        )}
                    </Select.Api>
                </ControlTemplate>
            </Flex>
        </Flex>
    );
};
