enum Months {
    January = 'Январь',
    February = 'Февраль',
    March = 'Март',
    April = 'Апрель',
    May = 'Май',
    June = 'Июнь',
    July = 'Июль',
    August = 'Август',
    September = 'Сентябрь',
    October = 'Октябрь',
    November = 'Ноябрь',
    December = 'Декабрь',
}
enum ShortenedMonths {
    January = 'Янв',
    February = 'Фев',
    March = 'Март',
    April = 'Апр',
    May = 'Май',
    June = 'Июнь',
    July = 'Июль',
    August = 'Авг',
    September = 'Сент',
    October = 'Окт',
    November = 'Нояб',
    December = 'Дек',
}
export function getMonthName(monthNumber: number, shortened?: boolean, locale: 'en' | 'ru' = 'ru') {
    const months = shortened ? ShortenedMonths : Months;
    const keys = Object.keys(months);
    return locale === 'ru' ? months[keys[monthNumber - 1]] : keys[monthNumber - 1];
}
export const getLastDayOfMonth = (date) => new Date(date, date.getMonth() + 1, 0).getDay();
export const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
