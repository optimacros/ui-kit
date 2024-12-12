import { ArgTypes, Meta } from '@storybook/react';
import { Slider } from './index';
import { Button } from '@optimacros-ui/button';
import { useState } from 'react';
import { ValueChangeDetails } from '@zag-js/slider';

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

const meta: Meta<typeof Slider> = {
    title: 'UI Kit core/Slider',
    argTypes,
};

export default meta;

export const Basic = () => {
    const [value, setValue] = useState([67]);

    const handleChange = (details: ValueChangeDetails) => {
        setValue(details.value);
    };

    return (
        <Slider.RootProvider value={value} onValueChange={handleChange} invalid>
            {(api) => (
                <>
                    <div style={{ marginBottom: 50 }}>
                        <Button onClick={() => api.setValue([67])}>reset</Button>
                    </div>

                    <Slider.Root>
                        <Slider.Label>Quantity</Slider.Label>
                        <Slider.Output />
                    </Slider.Root>
                </>
            )}
        </Slider.RootProvider>
    );
};

export { Range, Disabled, CustomMinMax, Step, MinStep } from './stories';
