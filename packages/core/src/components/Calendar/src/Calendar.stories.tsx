import { StoryObj, Meta, ArgTypes } from '@storybook/react';
import { CalendarDate } from '@internationalized/date';
import { Calendar } from './index';
import * as scenarios from './__tests__/scenarios';
import { ReactNode } from 'react';
import * as stories from './stories';
import { fn } from '@storybook/test';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ marginLeft: '20px' }}>{children}</div>
);

const value = new CalendarDate(2025, 5, 10);

const argTypes: ArgTypes = {
    value: {
        control: false,
        description: 'The selected date(s).',
        table: { type: { summary: 'DateValue[]' } },
    },
    onValueChange: {
        control: false,
        description: 'Function called when the value changes.',
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    open: {
        control: 'boolean',
        description: 'Whether the datepicker is open',
        table: { defaultValue: { summary: 'false' } },
    },
    'open.controlled': {
        control: 'boolean',
        description: 'Whether the datepicker open state is controlled by the user',
        table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
        control: false,
        description: 'Function called when the calendar opens or closes.',
        table: { type: { summary: '(details: OpenChangeDetails) => void' } },
    },
    locale: {
        control: 'text',
        description: 'The locale (BCP 47 language tag) to use when formatting the date.',
        table: { defaultValue: { summary: 'en-US' } },
    },
    translations: {
        control: 'object',
        description: 'The localized messages to use.',
        table: { type: { summary: 'IntlTranslations' } },
    },
    name: {
        control: 'text',
        description: 'The `name` attribute of the input element.',
    },
    timeZone: {
        control: 'text',
        description: 'The time zone to use',
        table: { defaultValue: { summary: 'UTC' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the calendar is disabled.',
    },
    readOnly: {
        control: 'boolean',
        description: 'Whether the calendar is read-only.',
    },
    min: {
        control: false,
        description: 'The minimum date that can be selected.',
        table: { type: { summary: 'DateValue' } },
    },
    max: {
        control: false,
        description: 'The maximum date that can be selected.',
        table: { type: { summary: 'DateValue' } },
    },
    closeOnSelect: {
        control: 'boolean',
        description: 'Whether the calendar should close after the date selection is complete.',
        defaultValue: true,
    },
    numOfMonths: {
        control: 'number',
        description: 'The number of months to display.',
    },
    startOfWeek: {
        control: 'select',
        options: [0, 1, 2, 3, 4, 5, 6],
        description: 'The first day of the week (0: Sunday, 1: Monday, etc).',
        table: { defaultValue: { summary: '0' } },
    },
    fixedWeeks: {
        control: 'boolean',
        description: 'Whether the calendar should have a fixed number of weeks.',
        table: { defaultValue: { summary: 'false' } },
    },
    isDateUnavailable: {
        control: false,
        description: 'Returns whether a date of the calendar is available.',
        table: { type: { summary: '(date: DateValue, locale: string) => boolean' } },
    },
    selectionMode: {
        control: 'select',
        options: ['single', 'multiple', 'range'],
        description: 'The selection mode of the calendar.',
        table: { type: { summary: 'SelectionMode' }, defaultValue: { summary: 'single' } },
    },
    format: {
        control: false,
        description: 'The format of the date to display in the input.',
        table: { type: { summary: '(date: DateValue) => string' } },
    },
    view: {
        control: 'select',
        options: ['day', 'month', 'year'],
        description: 'The view of the calendar',
        table: { type: { summary: 'DateView' }, defaultValue: { summary: 'day' } },
    },
    positioning: {
        control: 'object',
        description: 'The user provided options used to position the date picker content',
        table: { type: { summary: 'PositioningOptions' } },
    },
};

const meta: Meta<typeof Calendar.Root> = {
    title: 'UI Kit core/Calendar',
    argTypes,
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Calendar.Root>;

export const Basic: Story = {
    args: {
        defaultOpen: false,
        defaultValue: [value],
        closeOnSelect: false,
        onOpenChange: fn(),
    },
    render: stories.Basic,
    play: scenarios.basic,
};

export const LocalizedCalendar: Story = {
    args: {
        defaultValue: [value],
        defaultOpen: true,
        onOpenChange: fn(),
        closeOnSelect: false,
        locale: 'ru',
    },
    render: stories.Basic,
    play: scenarios.localized,
};
