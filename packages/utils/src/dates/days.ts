import { CalendarDate } from '@internationalized/date';
import { unique } from 'radash';
import { getWeekdayFormats } from './date-utils';

export enum Days {
    вс = 'воскресенье',
    пн = 'понедельник',
    вт = 'вторник',
    ср = 'среда',
    чт = 'четверг',
    пт = 'пятница',
    сб = 'суббота',
}

export function getDayName(dayNumber: number, shortened = false): [string, boolean] {
    const keys = Object.keys(Days);
    const isWeekend = dayNumber === 0 || dayNumber === 6;
    return [!shortened ? Days[keys[dayNumber]] : keys[dayNumber], isWeekend];
}
/**
 *
 * @example
 * getWeekday(date).short
 */
export function getWeekday(date: CalendarDate) {
    return getWeekdayFormats(
        Intl.DateTimeFormat().resolvedOptions().locale,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
    )(date);
}
export const generateDatesArray = ({ start, end }) => {
    const arr = [];
    for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt).toISOString().substring(0, 10));
    }
    return arr;
};

export function getOffsetDates(
    date: Date = new Date(),
    offset: {
        before: number;
        after: number;
    },
): Array<Date> {
    const beforeDate = generateDatesArray({
        start: new Date(date).setDate(date.getDate() - offset.before),
        end: date,
    });

    const afterDate = generateDatesArray({
        start: date,
        end: new Date(date).setDate(date.getDate() + offset.after),
    });

    return unique([...beforeDate, ...afterDate]);
}
