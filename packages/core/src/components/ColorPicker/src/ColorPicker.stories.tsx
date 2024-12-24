import { ArgTypes } from '@storybook/react';

import { ColorPicker } from './index';
import { Icon } from '@optimacros-ui/kit';
import { useState } from 'react';
import { ValueChangeDetails } from '@zag-js/color-picker';
import { Flex } from '@optimacros-ui/flex';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: false,
        description: 'The current color value',
        table: { type: { summary: 'Color' } },
    },
    onValueChange: {
        control: false,
        description: 'Handler that is called when the value changes, as the user drags.',
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    onValueChangeEnd: {
        control: false,
        description: 'Handler that is called when the user stops dragging.',
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the color picker is disabled',
    },
    readOnly: {
        control: 'boolean',
        description: 'Whether the color picker is read-only',
    },
    format: {
        control: 'select',
        options: ['rgba', 'hsba', 'hsla'],
        description: 'The color format to use',
        table: { defaultValue: { summary: 'rgba' } },
    },
    positioning: {
        control: 'object',
        description: 'The positioning options for the color picker.',
        table: { type: { summary: 'PositioningOptions' } },
    },
    disableAlpha: {
        control: 'boolean',
        description: 'Whather alpha channel is disabled',
        table: { defaultValue: { summary: 'false' } },
    },
};

const meta = {
    title: 'Ui kit core/Color Picker',
    argTypes,
};
export default meta;

const initialValue = '#005599';

export const Basic = () => {
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
                onValueChange={handleValueChange}
                onValueChangeEnd={handleValueChangeEnd}
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

                        <button onClick={() => api.setValue(initialValue)}>reset</button>
                    </>
                )}
            </ColorPicker.RootProvider>
        </Flex>
    );
};

export {
    Swatches,
    Disabled,
    ReadOnly,
    FormatHSBA,
    Positioning,
    Original,
    DisableAlpha,
} from './stories';
