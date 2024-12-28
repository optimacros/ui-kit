import type { DateDuration, DateValue } from '@internationalized/date';

export function getUnitDuration(duration: DateDuration) {
    const d = { ...duration };
    for (const key in d) {
        d[key] = 1;
    }
    return d;
}

export function getEndDate(startDate: DateValue, duration: DateDuration) {
    const d = { ...duration };
    if (d.days) {
        d.days--;
    } else {
        d.days = -1;
    }
    return startDate.add(d);
}
