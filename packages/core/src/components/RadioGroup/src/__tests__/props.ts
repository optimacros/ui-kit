import { fn } from '@storybook/test';
import { RootProps } from '../RadioGroup';

export const props: Partial<RootProps> = {
    value: undefined,
    disabled: false,
    readOnly: false,
    onValueChange: fn(),
    controllable: false,
};
