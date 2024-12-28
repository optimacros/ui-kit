import { ColorPicker } from '../index';
import { Icon } from '@optimacros-ui/kit';
import { useState } from 'react';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';

export const Original = () => {
    const [value, setValue] = useState('#337799');

    const handleOldChange = (c) => {
        setValue(c.hex);
    };

    const handleNewChange = (d) => {
        setValue(d.value.toString('hex'));
    };

    return (
        <Flex gap={5}>
            <Flex gap={2} direction="column" style={{ flexBasis: 300 }}>
                <Text.Title as="h3">New</Text.Title>
                <ColorPicker.RootProvider
                    value={ColorPicker.parse(value)}
                    onValueChange={handleNewChange}
                >
                    <ColorPicker.Root>
                        <ColorPicker.DefaultControl />
                        <ColorPicker.Popover
                            eyeDropperIcon={<Icon value="eye-drop" />}
                        ></ColorPicker.Popover>
                    </ColorPicker.Root>
                </ColorPicker.RootProvider>
            </Flex>
        </Flex>
    );
};
