import { CalendarDate } from '@internationalized/date';
import { fn } from '@storybook/test';

const value = new CalendarDate(2025, 5, 10);

export const props = {
    open: false,
    value: [value],
    onValueChange: fn(),
};
