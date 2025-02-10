import { ColorPicker } from '../index';
import { Icon } from '@optimacros-ui/kit';
import { useState } from 'react';
import { ValueChangeDetails } from '@zag-js/color-picker';

export const Swatches = (props) => {
    const presets = ['#f47373', '#697689', '#38a169', '#3182ce'];

    const [currentValue, setCurrentValue] = useState('#005599');
    const [finalValue, setFinalValue] = useState('#005599');

    const handleValueChange = ({ value }: ValueChangeDetails) => {
        console.info(value);
        setCurrentValue(value.toString('hex'));
    };

    const handleValueChangeEnd = ({ value }: ValueChangeDetails) => {
        console.info(value);
        setFinalValue(value.toString('hex'));
    };

    return (
        <div style={{ width: 250 }}>
            <ColorPicker.RootProvider
                {...props}
                value={ColorPicker.parse(currentValue)}
                onValueChange={handleValueChange}
                onValueChangeEnd={handleValueChangeEnd}
            >
                {(api) => (
                    <>
                        <ColorPicker.Root>
                            <ColorPicker.Label>Color</ColorPicker.Label>
                            <ColorPicker.DefaultControl />
                            <ColorPicker.Popover eyeDropperIcon={<Icon value="eye-drop" />}>
                                <hr />
                                <ColorPicker.Swatches presets={presets}>
                                    <p>Swatches</p>
                                </ColorPicker.Swatches>
                            </ColorPicker.Popover>
                        </ColorPicker.Root>

                        <button style={{ marginTop: 40 }} onClick={() => api.setValue('#005599')}>
                            reset
                        </button>
                    </>
                )}
            </ColorPicker.RootProvider>
        </div>
    );
};
