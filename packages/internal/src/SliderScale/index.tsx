import { CSSProperties, forwardRef, useEffect, useState } from 'react';
import { Slider } from '@optimacros-ui/slider';
import { Field } from '@optimacros-ui/field';
import { clsx } from '@optimacros-ui/utils';

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

        const isOutput = pinned && !editable;
        const isInput = editable;
        const isMarkers = snaps;

        const className = clsx(
            theme.slider,
            {
                [theme.editable]: editable,
                [theme.disabled]: rest.disabled,
                [theme.ring]: value === min,
            },
            rest.className,
        );

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
                className={className}
                {...rest}
            >
                <Slider.Container className={theme.container} ref={ref}>
                    {label && <Slider.Label>{label}</Slider.Label>}
                    {isOutput && (
                        <span style={{ marginLeft: '10px' }}>
                            <Slider.Output />
                        </span>
                    )}
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
                </Slider.Container>
            </Slider.Root>
        );
    },
);
