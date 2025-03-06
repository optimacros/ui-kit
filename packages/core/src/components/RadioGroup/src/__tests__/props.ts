import { fn } from '@storybook/test';
import { RootProps } from '../RadioGroup';

export const props: Partial<RootProps> = {
    value: undefined,
    defaultValue: null,
    disabled: false,
    readOnly: false,
    onValueChange: fn(),
};
