import { ColorPicker } from '../index';
import { Icon } from '@optimacros-ui/core';
import { useState } from 'react';
import { ValueChangeDetails } from '@zag-js/color-picker';
import { Flex } from '@optimacros-ui/flex';

export const Positioning = () => {
    const [value, setValue] = useState('#005599');

    const handleValueChange = ({ value }: ValueChangeDetails) => {
        setValue(value.toString('hex'));
    };

    return (
        <Flex style={{ width: '100vw', height: '100vh' }} align="center" justify="center">
            <ColorPicker.RootProvider
                value={ColorPicker.parse(value)}
                onValueChange={handleValueChange}
                positioning={{
                    placement: 'right',
                    offset: { mainAxis: 200 },
                    gutter: 100,
                    shift: 100,
                    overlap: true,
                }}
            >
                {(api) => (
                    <>
                        <ColorPicker.Root>
                            <ColorPicker.Label>Color</ColorPicker.Label>
                            <ColorPicker.DefaultControl />
                            <ColorPicker.Popover
                                eyeDropperIcon={<Icon value="eye-drop" />}
                            ></ColorPicker.Popover>
                        </ColorPicker.Root>

                        <button style={{ marginTop: 40 }} onClick={() => api.setValue('#005599')}>
                            reset
                        </button>
                    </>
                )}
            </ColorPicker.RootProvider>
        </Flex>
    );
};
