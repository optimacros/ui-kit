import { ArgTypes } from '@storybook/react';

import { ColorPicker } from './index';
import { Icon } from '@optimacros-ui/core';
import { useState } from 'react';
import { ValueChangeDetails } from '@zag-js/color-picker';

const argTypes: Partial<ArgTypes> = {
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
    },
    visible: {
        control: 'boolean',
        description: ' If `true`, the Menu Dropdown will be visible by default.',
    },
    uppercase: {
        control: 'boolean',
        description: 'If `true`, the text inside the ButtonMenu will be in uppercase.',
    },
    showOnlyIcon: {
        control: 'boolean',
        description: 'If `true` and icon used - only icon will be visible in the ButtonMenu.',
    },
    arrowUp: {
        control: 'boolean',
        description: 'If `true`, dropdown arrow icon will point up.',
    },
    label: {
        control: 'text',
        description: 'The text string to use for the name of the button.',
    },
    icon: {
        control: 'text',
        description: 'Value of the icon (See Font Icon Component).',
    },
    tooltip: {
        control: 'text',
        description: 'The text string to use for the tooltip.',
    },
    tooltipDelay: {
        control: 'number',
        description: 'Amount of time in milliseconds spent before the tooltip is visible.',
    },
    tooltipPosition: {
        control: 'radio',
        options: ['vertical', 'horizontal', 'bottom', 'top', 'left', 'right'],
        table: {
            defaultValue: { summary: 'vertical' },
        },
        description: 'Determines the position of the tooltip.',
    },
    tooltipOffset: {
        control: 'number',
        description:
            ' If `tooltipPosition` - `vertical`, `bottom` or `top`, the tooltip moves relative to its axis.',
    },
    className: {
        table: { disable: true },
    },
    theme: {
        table: { disable: true },
    },
    menuRootContainerClassName: {
        table: { disable: true },
    },
    classNameDropdownContainer: {
        table: { disable: true },
    },
    onVisibleChange: {
        table: { disable: true },
    },
    dataName: {
        table: { disable: true },
    },
    children: {
        table: { disable: true },
    },
};

const meta = {
    title: 'UI Kit main/Color Picker',
};
export default meta;

export const Basic = () => {
    const presets = ['#f47373', '#697689', '#38a169', '#3182ce'];

    const [value, setValue] = useState('#005599');

    const handleValueChange = ({ value }: ValueChangeDetails) => {
        // да, просто получить хекс нельзя
        setValue(ColorPicker.decimalToHex(value.toHexInt()));
    };

    return (
        <div style={{ width: 250 }}>
            <ColorPicker.RootProvider
                value={ColorPicker.parse(value)}
                onValueChange={handleValueChange}
            >
                {(api) => (
                    <>
                        <ColorPicker.Root>
                            <ColorPicker.Label>Color</ColorPicker.Label>

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
