import { StoryObj } from '@storybook/react';
import { Icon } from '@optimacros-ui/icon';
import { fromDate } from '@internationalized/date';
import { within, expect, userEvent, waitFor } from '@storybook/test';
import { Calendar } from './index';

const Wrapper = ({ children }: { children }) => (
    <div style={{ marginLeft: '20px' }}>{children}</div>
);

const value = fromDate(new Date('12.02.2024'), 'UTC');

const locales = [
    'en-US',
    'es-ES',
    'fr-FR',
    'de-DE',
    'it-IT',
    'ja-JP',
    'zh-CN',
    'pt-BR',
    'ru-RU',
    'ko-KR',
    'ar-SA',
    'hi-IN',
    'nl-NL',
    'pl-PL',
    'tr-TR',
    'vi-VN',
    'sv-SE',
    'da-DK',
    'fi-FI',
    'nb-NO',
];

const argTypes = {
    locale: {
        control: 'text',
        description: 'The locale (BCP 47 language tag) to use when formatting the date.',
        defaultValue: 'en-US',
    },
    translations: {
        control: 'object',
        description: 'The localized messages to use.',
    },
    ids: {
        control: 'object',
        description: 'The ids of the elements in the date picker. Useful for composition.',
    },
    name: {
        control: 'text',
        description: 'The `name` attribute of the input element.',
    },
    timeZone: {
        control: 'text',
        description: 'The time zone to use',
        defaultValue: 'UTC',
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
        control: 'date',
        description: 'The minimum date that can be selected.',
    },
    max: {
        control: 'date',
        description: 'The maximum date that can be selected.',
    },
    closeOnSelect: {
        control: 'boolean',
        description: 'Whether the calendar should close after the date selection is complete.',
        defaultValue: true,
    },
    value: {
        control: 'object',
        description: 'The selected date(s).',
    },
    focusedValue: {
        control: 'date',
        description: 'The focused date.',
    },
    numOfMonths: {
        control: 'number',
        description: 'The number of months to display.',
    },
    startOfWeek: {
        control: 'select',
        options: [0, 1, 2, 3, 4, 5, 6],
        description: 'The first day of the week (0: Sunday, 1: Monday, etc).',
    },
    fixedWeeks: {
        control: 'boolean',
        description: 'Whether the calendar should have a fixed number of weeks.',
    },
    onValueChange: {
        action: 'valueChanged',
        description: 'Function called when the value changes.',
    },
    onFocusChange: {
        action: 'focusChanged',
        description: 'Function called when the focused date changes.',
    },
    onViewChange: {
        action: 'viewChanged',
        description: 'Function called when the view changes.',
    },
    onOpenChange: {
        action: 'openChanged',
        description: 'Function called when the calendar opens or closes.',
    },
    isDateUnavailable: {
        control: 'function',
        description: 'Returns whether a date of the calendar is available.',
    },
    selectionMode: {
        control: 'select',
        options: ['single', 'multiple', 'range'],
        description: 'The selection mode of the calendar.',
        defaultValue: 'single',
    },
    format: {
        control: 'function',
        description: 'The format of the date to display in the input.',
    },
    view: {
        control: 'select',
        options: ['day', 'month', 'year'],
        description: 'The view of the calendar',
        defaultValue: 'day',
    },
    modal: {
        control: 'boolean',
        description: 'Whether the calendar should be modal.',
    },
    positioning: {
        control: 'object',
        description: 'The user provided options used to position the date picker content',
    },
    open: {
        control: 'boolean',
        description: 'Whether the datepicker is open',
    },
    'open.controlled': {
        control: 'boolean',
        description: 'Whether the datepicker open state is controlled by the user',
    },
};

const meta = {
    title: 'UI Kit core/Calendar',
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};
export default meta;

export const Basic: StoryObj = {
    render: (props) => {
        return (
            <Calendar.Root
                {...props}
                open={true}
                closeOnSelect={false}
                {...{ 'open.controlled': true }}
            >
                <Calendar.Content>
                    <Calendar.Header data-testid="header">
                        <Calendar.HeaderYears />
                        <Calendar.HeaderMonths />
                    </Calendar.Header>
                    <Calendar.DaysViewControl>
                        <Calendar.DaysPrevTrigger>
                            <Icon value="chevron_left" />
                        </Calendar.DaysPrevTrigger>
                        <Calendar.DaysRangeText />
                        <Calendar.DaysNextTrigger>
                            <Icon value="chevron_right" />
                        </Calendar.DaysNextTrigger>
                    </Calendar.DaysViewControl>
                    <Calendar.YearsViewControl>
                        <Calendar.YearsPrevTrigger>
                            <Icon value="chevron_left" />
                        </Calendar.YearsPrevTrigger>
                        <Calendar.YearsRangeText />
                        <Calendar.YearsNextTrigger>
                            <Icon value="chevron_right" />
                        </Calendar.YearsNextTrigger>
                    </Calendar.YearsViewControl>
                    <Calendar.YearsTable>
                        <Calendar.YearsTableBody />
                    </Calendar.YearsTable>

                    <Calendar.DaysTable>
                        <Calendar.DaysTableHead />
                        <Calendar.DaysTableBody data-testid="table-body" />
                    </Calendar.DaysTable>

                    <Calendar.Footer>
                        <Calendar.DismissButton>Cancel</Calendar.DismissButton>
                        <Calendar.SuccessButton>Ok</Calendar.SuccessButton>
                    </Calendar.Footer>
                </Calendar.Content>
            </Calendar.Root>
        );
    },
    play: async ({ globals, canvasElement, step, context }) => {
        if (!globals.test) {
            return;
        }

        await window.waitForPageTrulyReady?.();
        await window.takeScreenshot?.();

        const canvas = within(canvasElement);

        await step('select date by click', async () => {
            const firstDateElement = canvas.getAllByTestId('table-cell-trigger')[0];

            const valueAttr = firstDateElement.dataset.value;

            await userEvent.click(firstDateElement);

            await waitFor(() => {
                const dateElement = canvasElement.querySelector(`span[data-value="${valueAttr}"]`);

                expect(dateElement).toHaveAttribute('data-selected');
            });
        });

        await window.takeScreenshot?.('select date by click');

        await step('navigate dates by keyboard', async () => {
            const activeDateCell = canvasElement.querySelector(
                '[data-part="table"][data-view="day"] [data-part="table-cell"][aria-selected="true"]',
            );
            const nextDateCell = activeDateCell.nextSibling as HTMLTableCellElement;

            await userEvent.keyboard('[ArrowRight][Enter]');

            await waitFor(() => {
                expect(nextDateCell).toHaveAttribute('aria-selected', 'true');
            });
        });

        await window.takeScreenshot?.('navigate dates by keyboard');
    },
};

export const Selected = () => {
    return (
        <Calendar.Root
            value={[value]}
            open={true}
            closeOnSelect={false}
            {...{ 'open.controlled': true }}
        >
            <Calendar.Content>
                <Calendar.Header>
                    <Calendar.HeaderYears />
                    <Calendar.HeaderMonths />
                </Calendar.Header>
                <Calendar.DaysViewControl>
                    <Calendar.DaysPrevTrigger>
                        <Icon value="chevron_left" />
                    </Calendar.DaysPrevTrigger>
                    <Calendar.DaysRangeText />
                    <Calendar.DaysNextTrigger>
                        <Icon value="chevron_right" />
                    </Calendar.DaysNextTrigger>
                </Calendar.DaysViewControl>
                <Calendar.YearsViewControl>
                    <Calendar.YearsPrevTrigger>
                        <Icon value="chevron_left" />
                    </Calendar.YearsPrevTrigger>
                    <Calendar.YearsRangeText />
                    <Calendar.YearsNextTrigger>
                        <Icon value="chevron_right" />
                    </Calendar.YearsNextTrigger>
                </Calendar.YearsViewControl>
                <Calendar.YearsTable>
                    <Calendar.YearsTableBody />
                </Calendar.YearsTable>
                <Calendar.DaysTable>
                    <Calendar.DaysTableHead />
                    <Calendar.DaysTableBody />
                </Calendar.DaysTable>
                <Calendar.Footer>
                    <Calendar.DismissButton>Cancel</Calendar.DismissButton>
                    <Calendar.SuccessButton>Ok</Calendar.SuccessButton>
                </Calendar.Footer>
            </Calendar.Content>
        </Calendar.Root>
    );
};

export const LocalizedCalendar = (props) => {
    return (
        <Calendar.Root
            {...props}
            value={[value]}
            open={true}
            closeOnSelect={false}
            locale="ru"
            {...{ 'open.controlled': true }}
        >
            <Calendar.Content>
                <Calendar.Header>
                    <Calendar.HeaderYears />
                    <Calendar.HeaderMonths />
                </Calendar.Header>
                <Calendar.DaysViewControl>
                    <Calendar.DaysPrevTrigger>
                        <Icon value="chevron_left" />
                    </Calendar.DaysPrevTrigger>
                    <Calendar.DaysRangeText />
                    <Calendar.DaysNextTrigger>
                        <Icon value="chevron_right" />
                    </Calendar.DaysNextTrigger>
                </Calendar.DaysViewControl>
                <Calendar.YearsViewControl>
                    <Calendar.YearsPrevTrigger>
                        <Icon value="chevron_left" />
                    </Calendar.YearsPrevTrigger>
                    <Calendar.YearsRangeText />
                    <Calendar.YearsNextTrigger>
                        <Icon value="chevron_right" />
                    </Calendar.YearsNextTrigger>
                </Calendar.YearsViewControl>
                <Calendar.YearsTable>
                    <Calendar.YearsTableBody />
                </Calendar.YearsTable>
                <Calendar.DaysTable>
                    <Calendar.DaysTableHead />
                    <Calendar.DaysTableBody />
                </Calendar.DaysTable>
                <Calendar.Footer>
                    <Calendar.DismissButton>Cancel</Calendar.DismissButton>
                    <Calendar.SuccessButton>Ok</Calendar.SuccessButton>
                </Calendar.Footer>
            </Calendar.Content>
        </Calendar.Root>
    );
};
