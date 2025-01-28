import { Slider } from '@optimacros-ui/slider';

interface RangeSliderProps {
    step: number;
    min: number;
    max: number;
    values: Array<number>;
    customValues: Array<number>;
    rangeValues: Array<number>;
    color: string;
    classNameTrack: string;
    hasRangeValues: boolean;
    designTheme: () => any;
    onChange: () => void;
    onFinalChange: () => void;
}

export const RangeSlider = ({
    min = 0,
    max = 100,
    step = 0.01,
    values = [min, max],
    color = '--primary-color',
    onChange,
    onFinalChange,
    hasRangeValues,
    rangeValues,
    ...rest
}: RangeSliderProps) => {
    const handleChange = ({ value }: { value: number[] }) => {
        onChange?.(value);
    };

    const handleFinalChange = ({ value }: { value: number[] }) => {
        onChange?.(value);
        onFinalChange?.(value);
    };

    return (
        <Slider.RootProvider
            value={values}
            onValueChange={handleChange}
            invalid
            max={max}
            min={min}
            step={step}
            onValueChangeEnd={handleFinalChange}
        >
            <Slider.Root {...rest}>
                <Slider.Output />
            </Slider.Root>
        </Slider.RootProvider>
    );
};
