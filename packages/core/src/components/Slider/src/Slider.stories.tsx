import { ArgTypes, Meta } from '@storybook/react';
import { Slider } from './index';
import { Button } from '@optimacros-ui/button';

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
    return (
        <Slider.RootProvider value={[67]}>
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

export const Range = () => {
    return (
        <Slider.RootProvider value={[12, 34]}>
            {(api) => (
                <>
                    <div style={{ marginBottom: 50 }}>
                        <Button onClick={() => api.setValue([12, 34])}>reset</Button>
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

export const Disabled = () => {
    return (
        <Slider.RootProvider value={[12, 34]} disabled>
            {(api) => (
                <>
                    <div style={{ marginBottom: 50 }}>
                        <Button onClick={() => api.setValue([12, 34])}>reset</Button>
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

export const CustomMinMax = () => {
    return (
        <Slider.RootProvider value={[12, 34]} min={-100} max={50}>
            {(api) => (
                <>
                    <div style={{ marginBottom: 50 }}>
                        <Button onClick={() => api.setValue([12, 34])}>reset</Button>
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
