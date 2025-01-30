import React, { ChangeEvent } from 'react';
import { Slider } from '@optimacros-ui/slider';
import { Field } from '@optimacros-ui/field';
import { Flex } from '@optimacros-ui/flex';

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

    const handleSliderChange = ({ value }: { value: number }) => {
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
            buffer={buffer}
            min={min}
            max={max}
            step={step}
            invalid
            label
            {...rest}
        >
            {(api) => {
                const curVal = api.value[0];
                return (
                    <Slider.Container>
                        {label && <Slider.Label>{label}</Slider.Label>}
                        {isOutput && <Slider.Output />}
                        {isInput && (
                            <Field.Root
                                key={curVal}
                                style={{ width: 40 }}
                                onChange={({
                                    target: { value },
                                }: ChangeEvent<HTMLInputElement>) => {
                                    api.setValue([+value ?? min]);
                                }}
                            >
                                <Field.NumberInput.Root
                                    id="input"
                                    step={step}
                                    min={min}
                                    value={curVal}
                                    max={max}
                                >
                                    <Flex gap="2">
                                        <Field.NumberInput.Input />
                                    </Flex>
                                </Field.NumberInput.Root>
                            </Field.Root>
                        )}
                        <Slider.Control>
                            <Slider.Track>
                                {isMarkers && <Slider.Markers />}
                                <Slider.Range />
                            </Slider.Track>
                            <Slider.Thumb onMouseDown={onDragStart} />
                        </Slider.Control>
                    </Slider.Container>
                );
            }}
        </Slider.Root>
    );
};
