import { ColorPicker } from '../index';
import { Flex, Icon } from '@optimacros-ui/kit';
import { useState } from 'react';
import { ValueChangeDetails } from '@zag-js/color-picker';

export const initialValue = '#005599';

export const Basic = (props) => {
    const [currentValue, setCurrentValue] = useState(initialValue);
    const [finalValue, setFinalValue] = useState(initialValue);

    const handleValueChange = ({ value }: ValueChangeDetails) => {
        setCurrentValue(value.toString('hex'));
    };

    const handleValueChangeEnd = ({ value }: ValueChangeDetails) => {
        setFinalValue(value.toString('hex'));
    };

    return (
        <Flex direction="column" gap={5} style={{ width: 250 }}>
            <Flex direction="column">
                <span>Current value: {currentValue}</span>
                <span>Final value: {finalValue}</span>
            </Flex>

            <ColorPicker.RootProvider
                {...props}
                onValueChange={handleValueChange}
                onValueChangeEnd={handleValueChangeEnd}
                value={ColorPicker.parse(currentValue)}
            >
                {({ api }) => (
                    <>
                        <ColorPicker.Root>
                            <ColorPicker.Label>Color</ColorPicker.Label>
                            <ColorPicker.DefaultControl />
                            <ColorPicker.Popover
                                eyeDropperIcon={<Icon value="eye-drop" />}
                            ></ColorPicker.Popover>
                        </ColorPicker.Root>

                        <button onClick={() => api.setValue(initialValue)}>reset</button>
                    </>
                )}
            </ColorPicker.RootProvider>
        </Flex>
    );
};
