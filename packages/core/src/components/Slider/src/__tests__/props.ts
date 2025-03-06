import { fn } from '@storybook/test';
import { Slider } from '..';

export const props: Omit<Slider.ContainerProps, 'children'> = {
    value: undefined,
    defaultValue: [33],
    onValueChange: fn(),
    onValueChangeEnd: fn(),
    min: 0,
    max: 100,
    step: 1,
    minStepsBetweenThumbs: 0,
    disabled: false,
};
