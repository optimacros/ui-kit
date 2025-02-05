import { useState } from 'react';
import { ColorPicker, ColorPickerProps } from '../';
import { ColorFormat } from '../models';

export const Basic = (props: ColorPickerProps) => {
    const [color, setColor] = useState(props.color);

    const handleChange = (newColor: ColorFormat) => {
        console.info(newColor, newColor.hex);

        setColor(newColor.hex);
    };

    return <ColorPicker {...props} color={color} onChange={handleChange} />;
};
