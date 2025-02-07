import React from 'react';
import { Calendar as CalendarComponent } from '@optimacros-ui/calendar';
import { Icon } from '@optimacros-ui/icon';

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

export const Calendar = ({
    active = false,
    className = '',
    cancelLabel = 'Cancel',
    okLabel = 'Ok',
    onSelect,
    onDismiss,
    value = new Date(),
    locale,
    minDate,
    maxDate,
    sundayFirstDayOfWeek,
    theme,
}: CalendarProps) => {
    return (
        <CalendarComponent.Root
            value={[dateFormatters(value)]}
            locale={locale}
            open={true}
            closeOnSelect={false}
            {...{ 'open.controlled': true }}
            startOfWeek={sundayFirstDayOfWeek ? 0 : 1}
            min={minDate && dateFormatters(minDate)}
            max={maxDate && dateFormatters(maxDate)}
        >
            <CalendarComponent.Content>
                <CalendarComponent.Header>
                    <CalendarComponent.HeaderYears />
                    <CalendarComponent.HeaderMonths />
                </CalendarComponent.Header>
                <CalendarComponent.DaysViewControl>
                    <CalendarComponent.DaysPrevTrigger>
                        <Icon value="chevron_left" />
                    </CalendarComponent.DaysPrevTrigger>
                    <CalendarComponent.DaysRangeText />
                    <CalendarComponent.DaysNextTrigger>
                        <Icon value="chevron_right" />
                    </CalendarComponent.DaysNextTrigger>
                </CalendarComponent.DaysViewControl>
                <CalendarComponent.YearsViewControl>
                    <CalendarComponent.YearsPrevTrigger>
                        <Icon value="chevron_left" />
                    </CalendarComponent.YearsPrevTrigger>
                    <CalendarComponent.YearsRangeText />
                    <CalendarComponent.YearsNextTrigger>
                        <Icon value="chevron_right" />
                    </CalendarComponent.YearsNextTrigger>
                </CalendarComponent.YearsViewControl>
                <CalendarComponent.YearsTable>
                    <CalendarComponent.YearsTableBody />
                </CalendarComponent.YearsTable>
                <CalendarComponent.DaysTable>
                    <CalendarComponent.DaysTableHead />
                    <CalendarComponent.DaysTableBody />
                </CalendarComponent.DaysTable>
                <CalendarComponent.Footer>
                    <CalendarComponent.DismissButton onSelect={onDismiss} className={theme?.button}>
                        {cancelLabel}
                    </CalendarComponent.DismissButton>
                    <CalendarComponent.SuccessButton onSelect={onSelect} className={theme?.button}>
                        {okLabel}
                    </CalendarComponent.SuccessButton>
                </CalendarComponent.Footer>
            </CalendarComponent.Content>
        </CalendarComponent.Root>
    );
};
