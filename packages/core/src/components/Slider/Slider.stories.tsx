import { ArgTypes, Meta } from '@storybook/react';
import { Slider } from './index';
import { useState } from 'react';
import { Button } from '../Button';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: false,
        description: 'Current slider value',
        required: true,
        table: { type: { summary: 'number[]' } },
    },
    onValueChange: {
        control: false,
        description: 'Callback function that is called on value change',
        table: { type: { summary: '({value}) => void' } },
        required: true,
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
    disabled: {
        control: 'boolean',
        table: { defaultValue: { summary: 'false' } },
    },
};

const meta: Meta<typeof Slider> = {
    title: 'UI Kit core/Slider',
    argTypes,
};

export default meta;

export const Basic = () => {
    const [value, setValue] = useState([12]);

    const onValueChange = ({ value }) => {
        setValue(value);
    };

    return (
        <>
            <div style={{ marginBottom: 50 }}>
                <Button onClick={() => setValue([12])}>reset</Button>
            </div>

            <Slider.Root value={value} onValueChange={onValueChange}>
                <Slider.Label>Quantity</Slider.Label>
                <Slider.Output />
            </Slider.Root>
        </>
    );
};

export const Range = () => {
    const [value, setValue] = useState([12, 34]);

    const onValueChange = ({ value }) => {
        setValue(value);
    };

    return (
        <>
            <div style={{ marginBottom: 50 }}>
                <Button onClick={() => setValue([12, 34])}>reset</Button>
            </div>

            <Slider.Root value={value} onValueChange={onValueChange}>
                <Slider.Label>Quantity</Slider.Label>
                <Slider.Output />
            </Slider.Root>
        </>
    );
};

export const Disabled = () => {
    const [value, setValue] = useState([12, 34]);

    const onValueChange = ({ value }) => {
        setValue(value);
    };

    return (
        <>
            <div style={{ marginBottom: 50 }}>
                <Button onClick={() => setValue([12, 34])}>reset</Button>
            </div>

            <Slider.Root disabled value={value} onValueChange={onValueChange}>
                <Slider.Label>Quantity</Slider.Label>
                <Slider.Output />
            </Slider.Root>
        </>
    );
};

export const CustomMinMax = () => {
    const [value, setValue] = useState([12, 34]);

    const onValueChange = ({ value }) => {
        setValue(value);
    };

    return (
        <>
            <div style={{ marginBottom: 50 }}>
                <Button onClick={() => setValue([12, 34])}>reset</Button>
            </div>

            <Slider.Root value={value} min={-100} max={50} onValueChange={onValueChange}>
                <Slider.Label>Quantity</Slider.Label>
                <Slider.Output />
            </Slider.Root>
        </>
    );
};
