//@ts-nocheck

import { getDayName } from './days';
import { getMonthName } from './months';

export function getDateString(
    date: Date | `${string}-${string}-${string}`,
): `${string}-${string}-${string}` {
    const isIso = date.length === 10;
    if (isIso) return date;
    try {
        return new Date(date).toISOString().substring(0, 10) as `${string}-${string}-${string}`;
    } catch (e) {
        return date;
    }
}

export function transformDate(
    date: Date | string,
    monthShortened?: boolean,
    dayShortened?: boolean,
) {
    if (!date || isNaN(new Date(date))) return {};

    const [year, month, day] = getDateString(new Date(date)).split('-');
    const monthName = getMonthName(parseInt(month), monthShortened);
    const [dayName, isWeekend] = getDayName(new Date(date).getDay(), dayShortened);
    return {
        year,
        month,
        day,
        monthName,
        dayName,
        isWeekend,
    };
}
export function getDateAsArray(date = new Date()) {
    const result = new Date(date);
    return [result.getFullYear(), result.getMonth() + 1, result.getDay()];
}

export function validateDate(dateStr: string) {
    const date = new Date(dateStr);
    if (
        date?.getDay() + 1 &&
        date?.getMonth() + 1 &&
        date?.getFullYear()?.toString().length === 4
    ) {
        return true;
    }
    return false;
}
