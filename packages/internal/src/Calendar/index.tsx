import React, { useState } from 'react';
import { time } from '@optimacros-ui/utils';
import { Calendar as CalendarComponent } from '@optimacros-ui/calendar';
import { fromDate } from '@internationalized/date';
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

export const Calendar: CalendarProps = ({
    active = false,
    className = '',
    cancelLabel = 'Cancel',
    okLabel = 'Ok',
    onSelect,
    onDismiss,
    value = new Date(),
    locale,
    disabledDates,
    enabledDates,
    maxDate,
    minDate,
    autoOk,
    sundayFirstDayOfWeek,
}) => {
    const [display, setDisplay] = useState<'months' | 'years'>('months');

    const handleNewDate = (newValue: Date, dayClick: boolean) => {
        let newDate = newValue;

        if (time.dateOutOfRange(newValue, minDate, maxDate)) {
            if (maxDate && minDate) {
                newDate = time.closestDate(newValue, maxDate, minDate);
            } else {
                newDate = maxDate || minDate || new Date();
            }
        }

        setDisplay('months');

        if (dayClick && autoOk && onSelect) {
            onSelect(newDate);
        }
    };

    return (
        <CalendarComponent.Root
            value={[fromDate(value)]}
            locale={locale}
            open={true}
            closeOnSelect={false}
            {...{ 'open.controlled': true }}
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
                    <CalendarComponent.DismissButton onSelect={onDismiss}>
                        {cancelLabel}
                    </CalendarComponent.DismissButton>
                    <CalendarComponent.SuccessButton onSelect={onSelect}>
                        {okLabel}
                    </CalendarComponent.SuccessButton>
                </CalendarComponent.Footer>
            </CalendarComponent.Content>
        </CalendarComponent.Root>
        // <div data-react-toolbox="dialog">
        //     <section>
        //         <header>
        //             <span id="years" onClick={handleSwitchDisplay}>
        //                 {date.getFullYear()}
        //             </span>
        //
        //             <h3 id="months" onClick={handleSwitchDisplay}>
        //                 {shortDayOfWeek}, {shortMonth} {currentDate}
        //             </h3>
        //         </header>
        //
        //         <div>
        //             <CalendarContent
        //                 disabledDates={disabledDates}
        //                 display={display}
        //                 enabledDates={enabledDates}
        //                 handleSelect={handleSelect}
        //                 maxDate={maxDate}
        //                 minDate={minDate}
        //                 onChange={handleNewDate}
        //                 selectedDate={date}
        //                 locale={locale}
        //                 sundayFirstDayOfWeek={sundayFirstDayOfWeek}
        //             />
        //         </div>
        //     </section>
        //
        //     {renderActions()}
        // </div>
    );
};
