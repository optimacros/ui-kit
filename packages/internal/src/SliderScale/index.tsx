import { CSSProperties, forwardRef, useEffect, useState } from 'react';
import { Slider } from '@optimacros-ui/slider';
import { Field } from '@optimacros-ui/field';
import { clsx, isUndefined } from '@optimacros-ui/utils';

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
    style?: CSSProperties;
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

const Input = ({ min, max, defaultValue, className }) => {
    const [inputValue, setInputValue] = useState(() => defaultValue);
    const { value, setValue } = Slider.useApi();

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
                className={className}
                data-arrows-hidden
            />
        </Field.Root>
    );
};

export const SliderScale = forwardRef<HTMLDivElement, SliderProps>(
    (
        {
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
            theme = {},
            ...rest
        },
        ref,
    ) => {
        const formatedValue = Array.isArray(value) ? value : [value];

        const handleSliderChange = ({ value }: { value: Array<number> }) => {
            onChange?.(value[0]);
        };

        const isInput = editable;
        const isMarkers = snaps;

        const className = clsx(
            theme.slider,
            theme.container,
            {
                [theme.editable]: editable,
                [theme.disabled]: rest.disabled,
                [theme.ring]: value === min,
            },
            rest.className,
        );

        return (
            <Slider.Root
                defaultValue={formatedValue}
                value={isUndefined(onChange) ? undefined : formatedValue}
                onValueChange={handleSliderChange}
                onValueChangeEnd={onDragStop}
                min={min}
                max={max}
                step={step}
                onFocusChange={() => {}}
                {...rest}
            >
                <Slider.Container
                    className={className}
                    ref={ref}
                    name={rest.name}
                    data-testid="slider-scale"
                >
                    {label && <Slider.Label data-testid="slider-scale-label">{label}</Slider.Label>}
                    {isInput && (
                        <div style={{ maxWidth: '40px' }}>
                            <Input
                                defaultValue={formatedValue[0].toString()}
                                max={max}
                                min={min}
                                className={theme.input}
                                data-testid="slider-scale-input"
                            />
                        </div>
                    )}
                    <Slider.Control data-testid="slider-scale-control">
                        <Slider.Track data-testid="slider-scale-track">
                            {isMarkers && <Slider.Markers data-testid="slider-scale-markers" />}
                            <Slider.Range data-testid="slider-scale-range" />
                        </Slider.Track>
                        <Slider.Thumb
                            onMouseDown={onDragStart}
                            className={theme.knob}
                            data-testid="slider-scale-thumb"
                        />
                    </Slider.Control>
                    <Slider.HiddenInputs data-testid={'slider-value'} />
                </Slider.Container>
            </Slider.Root>
        );
    },
);
