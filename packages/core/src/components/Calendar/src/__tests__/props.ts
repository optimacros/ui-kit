import { CalendarDate } from '@internationalized/date';
import { fn } from '@storybook/test';

const value = new CalendarDate(2025, 5, 10);

export const props = {
    defaultOpen: false,
    defaultValue: [value],
    onValueChange: fn(),
    locale: 'en-US',
};
