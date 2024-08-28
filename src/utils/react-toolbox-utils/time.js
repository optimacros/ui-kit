import hasOwnProperty from './hasOwnProperty'
import { dateLocales } from './dateLocales'

const time = {
    getDaysInMonth(d) {
        const resultDate = this.getFirstDayOfMonth(d)
        resultDate.setMonth(resultDate.getMonth() + 1)
        resultDate.setDate(resultDate.getDate() - 1)

        return resultDate.getDate()
    },

    getFirstDayOfMonth(d) {
        return new Date(d.getFullYear(), d.getMonth(), 1)
    },

    getFirstWeekDay(d) {
        return this.getFirstDayOfMonth(d).getDay()
    },

    getTimeMode(d) {
        return d.getHours() >= 12 ? 'pm' : 'am'
    },

    getFullMonth(d, locale = 'en') {
        const month = d.getMonth()
        const l = (typeof locale === 'string' ? dateLocales[locale] : locale) || dateLocales.en

        return hasOwnProperty(l, 'months') ? l.months[month] || 'Unknown' : 'Unknown'
    },

    getShortMonth(d, locale = 'en') {
        const month = d.getMonth()
        const l = (typeof locale === 'string' ? dateLocales[locale] : locale) || dateLocales.en

        return hasOwnProperty(l, 'monthsShort') ? l.monthsShort[month] || 'Unknown' : 'Unknown'
    },

    getFullDayOfWeek(day, locale = 'en') {
        const l = (typeof locale === 'string' ? dateLocales[locale] : locale) || dateLocales.en

        return hasOwnProperty(l, 'weekdays') ? l.weekdays[day] || 'Unknown' : 'Unknown'
    },

    getShortDayOfWeek(day, locale = 'en') {
        const l = (typeof locale === 'string' ? dateLocales[locale] : locale) || dateLocales.en

        return hasOwnProperty(l, 'weekdaysShort') ? l.weekdaysShort[day] || 'Unknown' : 'Unknown'
    },

    getDayOfWeekLetter(day, locale = 'en') {
        const l = (typeof locale === 'string' ? dateLocales[locale] : locale) || dateLocales.en

        return hasOwnProperty(l, 'weekdaysLetter')
            ? l.weekdaysLetter[day] || this.getFullDayOfWeek(day, locale).charAt(0)
            : 'Unknown'
    },

    clone(d) {
        return new Date(d.getTime())
    },

    cloneAsDate(d) {
        const clonedDate = this.clone(d)
        clonedDate.setHours(0, 0, 0, 0)

        return clonedDate
    },

    isDateObject(d) {
        return d instanceof Date
    },

    addDays(d, days) {
        const newDate = this.clone(d)
        newDate.setDate(d.getDate() + days)

        return newDate
    },

    addMonths(d, months) {
        const newDate = this.clone(d)
        newDate.setMonth(d.getMonth() + months, 1)

        return newDate
    },

    addYears(d, years) {
        const newDate = this.clone(d)
        newDate.setFullYear(d.getFullYear() + years)

        return newDate
    },

    setDay(d, day) {
        const newDate = this.clone(d)
        newDate.setDate(day)

        return newDate
    },

    setMonth(d, month) {
        const newDate = this.clone(d)
        newDate.setMonth(month)

        return newDate
    },

    setYear(d, year) {
        const newDate = this.clone(d)
        newDate.setFullYear(year)

        return newDate
    },

    setHours(d, hours) {
        const newDate = this.clone(d)
        newDate.setHours(hours)

        return newDate
    },

    setMinutes(d, minutes) {
        const newDate = this.clone(d)
        newDate.setMinutes(minutes)

        return newDate
    },

    toggleTimeMode(d) {
        const newDate = this.clone(d)
        const hours = newDate.getHours()

        newDate.setHours(hours - (hours > 12 ? -12 : 12))

        return newDate
    },

    formatTime(date, format) {
        let hours = date.getHours()
        let mins = date.getMinutes().toString()

        if (format === 'ampm') {
            const isAM = hours < 12
            const additional = isAM ? ' am' : ' pm'

            hours %= 12
            hours = (hours || 12).toString()
            if (mins.length < 2) mins = `0${mins}`

            return hours + (mins === '00' ? '' : `:${mins}`) + additional
        }

        hours = hours.toString()
        if (hours.length < 2) hours = `0${hours}`
        if (mins.length < 2) mins = `0${mins}`

        return `${hours}:${mins}`
    },

    dateOutOfRange(date, minDate, maxDate) {
        return (minDate && !(date >= minDate)) || (maxDate && !(date <= maxDate))
    },

    closestDate(to, date1, date2) {
        const toTime = to.getTime()

        const diff1 = Math.abs(toTime - date1.getTime())
        const diff2 = Math.abs(toTime - date2.getTime())

        return diff1 < diff2 ? date1 : date2
    },

    formatDate(date, locale = 'en') {
        if (locale === 'en') {
            return `${date.getDate()} ${time.getFullMonth(date, locale)} ${date.getFullYear()}`
        }

        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    },
}

export default time
