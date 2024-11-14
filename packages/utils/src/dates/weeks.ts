export function datesByWeekNumber({ year, startWeek, weeks = 50 }) {
    const dates = [];
    for (let i = startWeek; i < weeks; i++) {
        if (i < 10) {
            dates.push(`${year}-0${i}`);
        } else {
            dates.push(`${year}-${i}`);
        }
    }
    return dates;
}
export function weekFromDateWeek(dateWeek: string) {
    const weekNumber = dateWeek.split('-')[1];
    const currentWeek = weekNumber[0] === '0' ? parseInt(weekNumber[1]) : parseInt(weekNumber);
    return currentWeek;
}

export function getCurrWeek(from = new Date(new Date().getFullYear(), 0, 1), to = new Date()) {
    //@ts-ignore
    const days = Math.ceil((to - from) / (24 * 60 * 60 * 1000));

    const weekNumber = Math.ceil(days / 7);

    return weekNumber;
}

export function getWeek(date: Date) {
    return getCurrWeek(new Date(new Date().getFullYear(), 0, 1), new Date(date));
}
