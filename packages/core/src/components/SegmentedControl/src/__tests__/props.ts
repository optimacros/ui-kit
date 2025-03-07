import { fn } from '@storybook/test';
import { SegmentedControl } from '..';
import { items } from '../examples/mock';

export const props: Partial<SegmentedControl.RootProps> = {
    value: undefined,
    defaultValue: items[0],
    onValueChange: fn(),
    disabled: false,
    readOnly: false,
};
