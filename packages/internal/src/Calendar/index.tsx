import { forwardRef, useEffect } from 'react';
import type React from 'react';
import { Calendar as CalendarComponent } from '@optimacros-ui/calendar';
import { IconButton } from '../IconButton';
import { Button } from '@optimacros-ui/button';

interface CalendarProps {
    active?: boolean;
    autoOk?: boolean;
    cancelLabel?: string;
    className?: string;
    disabledDates?: Date[];
    enabledDates?: Date[];
    locale?: string;
    maxDate?: Date;
    minDate?: Date;
    name?: string;
    okLabel?: string;
    onDismiss?: () => void;
    onSelect?: (value: Date, event?: React.ChangeEvent<HTMLSelectElement>) => void;
    sundayFirstDayOfWeek?: boolean;
    theme?: {
        button?: string;
        calendarWrapper?: string;
        date?: string;
        dialog?: string;
        wrapper?: string;
        header?: string;
        monthsDisplay?: string;
        year?: string;
        yearsDisplay?: string;
        navigation?: string;
    };
    value?: Date;
}

const { dateFormatters } = CalendarComponent;

const Content = forwardRef<HTMLDivElement, CalendarProps>(
    (
        {
            cancelLabel = 'Cancel',
            okLabel = 'Ok',
            onSelect,
            onDismiss,
            value = new Date(),
            theme = {},
        },
        ref,
    ) => {
        const api = CalendarComponent.useApi();

        useEffect(() => {
            //@ts-ignore
            api.setValue([dateFormatters(value)]);
        }, [value]);

        return (
            <CalendarComponent.Content className={theme.wrapper} ref={ref} data-testid="calendar">
                <CalendarComponent.Header className={theme.header} data-testid="calendar-header">
                    <CalendarComponent.HeaderYears
                        className={theme.yearsDisplay}
                        data-testid="calendar-header-years"
                    />
                    <CalendarComponent.HeaderMonths
                        className={theme.date}
                        data-testid="calendar-header-months"
                    />
                </CalendarComponent.Header>
                <CalendarComponent.DaysViewControl
                    className={theme.navigation}
                    data-testid="calendar-days-view-control"
                >
                    <CalendarComponent.DaysPrevTrigger
                        className={theme.button}
                        asChild
                        data-testid="calendar-days-prev-trigger"
                    >
                        <IconButton icon="chevron_left" float="flat" variant="primary" />
                    </CalendarComponent.DaysPrevTrigger>
                    <CalendarComponent.DaysRangeText
                        className={theme.monthsDisplay}
                        data-testid="calendar-days-range-text"
                    />
                    <CalendarComponent.DaysNextTrigger
                        className={theme.button}
                        asChild
                        data-testid="calendar-days-next-trigger"
                    >
                        <IconButton icon="chevron_right" float="flat" variant="primary" />
                    </CalendarComponent.DaysNextTrigger>
                </CalendarComponent.DaysViewControl>
                <CalendarComponent.YearsViewControl data-testid="calendar-years-view-control">
                    <CalendarComponent.YearsPrevTrigger
                        className={theme.button}
                        asChild
                        data-testid="calendar-years-prev-trigger"
                    >
                        <IconButton icon="chevron_left" float="flat" variant="primary" />
                    </CalendarComponent.YearsPrevTrigger>
                    <CalendarComponent.YearsRangeText
                        className={theme.yearsDisplay}
                        data-testid="calendar-years-range-text"
                    />
                    <CalendarComponent.YearsNextTrigger
                        className={theme.button}
                        asChild
                        data-testid="calendar-years-next-trigger"
                    >
                        <IconButton icon="chevron_right" float="flat" variant="primary" />
                    </CalendarComponent.YearsNextTrigger>
                </CalendarComponent.YearsViewControl>
                <CalendarComponent.YearsTable
                    className={theme.calendarWrapper}
                    data-testid="calendar-years-table"
                >
                    <CalendarComponent.YearsTableBody data-testid="calendar-years-table" />
                </CalendarComponent.YearsTable>
                <CalendarComponent.DaysTable
                    className={theme.calendarWrapper}
                    data-testid="calendar-days-table"
                >
                    <CalendarComponent.DaysTableHead data-testid="calendar-days-table-head" />
                    <CalendarComponent.DaysTableBody data-testid="calendar-days-table-body" />
                </CalendarComponent.DaysTable>
                <CalendarComponent.Footer data-testid="calendar-footer">
                    <CalendarComponent.DismissButton
                        onDismiss={onDismiss}
                        className={theme.button}
                        asChild
                        data-testid="calendar-footer-dismiss-button"
                    >
                        <Button variant="primary">{cancelLabel}</Button>
                    </CalendarComponent.DismissButton>
                    <CalendarComponent.SuccessButton
                        onSelect={onSelect}
                        className={theme.button}
                        asChild
                        data-testid="calendar-footer-success-button"
                    >
                        <Button variant="primary">{okLabel}</Button>
                    </CalendarComponent.SuccessButton>
                </CalendarComponent.Footer>
            </CalendarComponent.Content>
        );
    },
);

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
    (
        { value = new Date(), locale = 'us', minDate, maxDate, sundayFirstDayOfWeek, ...rest },
        ref,
    ) => {
        return (
            <CalendarComponent.Root
                defaultValue={[dateFormatters(value)]}
                locale={locale}
                open={true}
                closeOnSelect={false}
                startOfWeek={sundayFirstDayOfWeek ? 0 : 1}
                min={minDate && dateFormatters(minDate)}
                max={maxDate && dateFormatters(maxDate)}
            >
                <Content value={value} {...rest} ref={ref} />
            </CalendarComponent.Root>
        );
    },
);
