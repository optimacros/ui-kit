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
        <Field.Root data-testid="slider-input-root">
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
                data-testid="slider-input"
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
                <Slider.Container className={className} ref={ref} name={rest.name}>
                    {label && <Slider.Label>{label}</Slider.Label>}
                    {isInput && (
                        <div style={{ maxWidth: '40px' }}>
                            <Input
                                defaultValue={formatedValue[0].toString()}
                                max={max}
                                min={min}
                                className={theme.input}
                            />
                        </div>
                    )}
                    <Slider.Control>
                        <Slider.Track>
                            {isMarkers && <Slider.Markers />}
                            <Slider.Range />
                        </Slider.Track>
                        <Slider.Thumb onMouseDown={onDragStart} className={theme.knob} />
                    </Slider.Control>
                    <Slider.HiddenInputs data-testid={'slider-value'} />
                </Slider.Container>
            </Slider.Root>
        );
    },
);
