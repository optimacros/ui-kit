import { type DateValue, isSameDay } from '@internationalized/date';
import { formatRange } from './format-range';
import { getDayFormatter } from './get-day-formatter';

export function formatSelectedDate(
    startDate: DateValue,
    endDate: DateValue | null,
    locale: string,
    timeZone: string,
) {
    const start = startDate;
    const end = endDate ?? startDate;

    const formatter = getDayFormatter(locale, timeZone);

    if (isSameDay(start, end)) {
        return formatter.format(start.toDate(timeZone));
    }

    return formatRange(start, end, formatter, (start, end) => `${start} – ${end}`, timeZone);
}
