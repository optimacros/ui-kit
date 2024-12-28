import { ColorPicker } from '../index';
import { Icon } from '@optimacros-ui/kit';
import { useState } from 'react';
import { ValueChangeDetails } from '@zag-js/color-picker';

export const FormatHSBA = () => {
    const [value, setValue] = useState('#005599');

    const handleValueChange = ({ value }: ValueChangeDetails) => {
        setValue(value.toString('hex'));
    };

    return (
        <div style={{ width: 250 }}>
            <ColorPicker.RootProvider
                value={ColorPicker.parse(value)}
                onValueChange={handleValueChange}
                format="hsba"
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
        </div>
    );
};
