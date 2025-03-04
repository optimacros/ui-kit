import { fn } from '@storybook/test';
import { SegmentedControl } from '..';
import { items } from '../examples/mock';

export const props: Partial<SegmentedControl.RootProps> = {
    value: items[0],
    onValueChange: fn(),
    disabled: false,
    readOnly: false,
};
