import React, { useEffect, useState } from 'react';
import { Slider } from '@optimacros-ui/slider';
import { Field } from '@optimacros-ui/field';

export interface SliderProps {
    buffer?: number;
    className?: string;
    disabled?: boolean;
    editable?: boolean;
    max?: number;
    min?: number;
    onChange?: (cardSize: number) => void;
    onDragStart?: () => void;
    onDragStop?: () => void;
    pinned?: boolean;
    snaps?: boolean;
    step?: number;
    style?: React.CSSProperties;
    dataMax?: number;
    name?: string;
    theme?: {
        disabled?: string;
        container?: string;
        editable?: string;
        innerknob?: string;
        innerprogress?: string;
        input?: string;
        knob?: string;
        pinned?: string;
        pressed?: string;
        progress?: string;
        ring?: string;
        slider?: string;
        snap?: string;
        snaps?: string;
        SliderScale?: string;
        Title?: string;
    };
    value?: number;
    label?: string;
}

const Input = ({ min, max, defaultValue }) => {
    const [inputValue, setInputValue] = useState(() => defaultValue);
    const { value, setValue } = Slider.useSelector((s) => s);

    useEffect(() => {
        value && setInputValue(() => value[0].toString());
    }, [value]);

    return (
        <Field.Root id="slider-scale-input">
            <Field.Input
                type="number"
                max={max}
                min={min}
                value={inputValue}
                onChange={({ target: { value } }) => setInputValue(() => value)}
                onBlur={({ target: { valueAsNumber } }) => setValue([valueAsNumber])}
                onKeyDown={({ key, target }) => {
                    if (key === 'Enter') {
                        //@ts-ignore
                        setValue([target?.valueAsNumber]);
                    }
                }}
                data-arrows-hidden
            />
        </Field.Root>
    );
};

export const SliderScale = ({
    value = 0,
    onChange,
    buffer = 0,
    min = 0,
    max = 100,
    step = 0.01,
    pinned = false,
    snaps = false,
    onDragStart = () => {},
    onDragStop = () => {},
    editable = false,
    label,
    ...rest
}: SliderProps) => {
    const formatedValue = Array.isArray(value) ? value : [value];

    const handleSliderChange = ({ value }: { value: Array<number> }) => {
        onChange?.(value[0]);
    };

    const isOutput = pinned && !editable;
    const isInput = editable;
    const isMarkers = snaps;

    return (
        <Slider.Root
            value={formatedValue}
            onValueChange={handleSliderChange}
            onValueChangeEnd={onDragStop}
            min={min}
            max={max}
            step={step}
            onFocusChange={() => {}}
            controllable
            {...rest}
        >
            <Slider.Container>
                {label && <Slider.Label>{label}</Slider.Label>}
                {isOutput && (
                    <span style={{ marginLeft: '10px' }}>
                        <Slider.Output />
                    </span>
                )}
                {isInput && (
                    <div style={{ maxWidth: '40px' }}>
                        <Input defaultValue={formatedValue[0].toString()} max={max} min={min} />
                    </div>
                )}
                <Slider.Control>
                    <Slider.Track>
                        {isMarkers && <Slider.Markers />}
                        <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumb onMouseDown={onDragStart} />
                </Slider.Control>
            </Slider.Container>
        </Slider.Root>
    );
};
