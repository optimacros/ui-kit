import type { DateValue } from '@internationalized/date';
import { getStartOfWeek } from './get-start-of-week';

export function getEndOfWeek(date: DateValue, locale: string, firstDayOfWeek = 0) {
    return getStartOfWeek(date, locale, firstDayOfWeek).add({ days: 6 });
}
