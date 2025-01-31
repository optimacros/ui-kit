// @ts-nocheck
import { useState } from 'react';
import { ArgTypes, Meta } from '@storybook/react';
import { RangeSlider } from './index';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: false,
        description: 'Current slider value(s)',
        table: { type: { summary: 'number[]' } },
    },
    onValueChange: {
        control: false,
        description: 'Callback function that is called on value change',
        table: { type: { summary: '({value}) => void' } },
    },
    onValueChangeEnd: {
        control: false,
        description: 'Callback function that is called on value change',
        table: { type: { summary: '({value}) => void' } },
    },
    min: {
        control: 'number',
        description: 'Min slider value',
        table: { defaultValue: { summary: '0' } },
    },
    max: {
        control: 'number',
        description: 'Max slider value',
        table: { defaultValue: { summary: '100' } },
    },
    step: {
        control: 'number',
        description: 'The step value of the slider',
        table: { defaultValue: { summary: '1' } },
    },
    minStepsBetweenThumbs: {
        control: 'number',
        description: 'The minimum permitted steps between multiple thumbs.',
        table: { defaultValue: { summary: '0' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the slider is disabled',
        table: { defaultValue: { summary: 'false' } },
    },
};

const meta: Meta<typeof RangeSlider> = {
    title: 'legacy/RangeSlider',
    argTypes,
};

export default meta;

export const Basic = () => {
    const [values, setValues] = useState([7, 35]);

    const handleChange = (values: number[]) => {
        setValues(values);
    };

    return (
        <RangeSlider
            step={1}
            min={1}
            max={80}
            values={values}
            // =>
            customValues={[2, 6]}
            rangeValues={[1, 2, 3]}
            hasRangeValues={true}
            // <=
            color="blue"
            classNameTrack=""
            designTheme={() => {}}
            onChange={handleChange}
            onFinalChange={() => {}}
        />
    );
};
