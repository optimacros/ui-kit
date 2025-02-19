import { Loader } from '..';
import { fn } from '@storybook/test';

export const props: Omit<Loader.Props, 'children'> = {
    value: 50,
    onCancel: fn(),
    multicolor: false,
    speed: 100,
    step: 1,
    min: 0,
    max: 100,
    disabled: false,
    infinite: false,
    controllable: false,
};
