import { ColorPicker } from '../index';
import { Icon } from '@optimacros-ui/kit';
import { useState } from 'react';
import { ValueChangeDetails } from '@zag-js/color-picker';

export const PopoverSettings = {
    args: { eyeDropperIcon: <Icon value="eye-drop" /> },
    render: () => {
        const [value, setValue] = useState('#005599');

        const handleValueChange = ({ value }: ValueChangeDetails) => {
            setValue(value.toString('hex'));
        };

        return (
            <div style={{ width: 250 }}>
                <ColorPicker.RootProvider
                    value={ColorPicker.parse(value)}
                    onValueChange={handleValueChange}
                    format="rgba"
                    // TODO move to props
                    state={{ disableAlpha: true }}
                >
                    {(api) => {
                        api.setFormat('rgba');

                        return (
                            <>
                                <ColorPicker.Root format="rgba">
                                    <ColorPicker.Label>Color</ColorPicker.Label>
                                    <ColorPicker.DefaultControl />
                                    <ColorPicker.Popover></ColorPicker.Popover>
                                </ColorPicker.Root>

                                <button
                                    style={{ marginTop: 40 }}
                                    onClick={() => api.setValue('#005599')}
                                >
                                    reset
                                </button>
                            </>
                        );
                    }}
                </ColorPicker.RootProvider>
            </div>
        );
    },
    argTypes: {
        value: { table: { disable: true } },
        onValueChange: { table: { disable: true } },
        onValueChangeEnd: { table: { disable: true } },
        disabled: { table: { disable: true } },
        readOnly: { table: { disable: true } },
        format: { table: { disable: true } },
        positioning: { table: { disable: true } },
        disableAlpha: { table: { disable: true } },
    },
    parameters: {
        // здесь include/exclude не работает
        controls: { include: ['eyeDropperIcon'], sort: 'alpha' },
    },
};
