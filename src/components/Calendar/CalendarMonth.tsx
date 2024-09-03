// @ts-nocheck
import React, { Component } from 'react'
import { range } from '../../utils/react-toolbox-utils/utils'
import time from '../../utils/react-toolbox-utils/time'
import CalendarDay from './CalendarDay'

interface Props {
    disabledDates?: Date[];
    enabledDates?: Date[];
    locale?: string;
    maxDate?: Date;
    minDate?: Date;
    onDayClick?: (day: number) => void;
    selectedDate?: Date;
    sundayFirstDayOfWeek?: boolean;
    theme?: {
        days?: string;
        month?: string;
        title?: string;
        week?: string;
    };
    viewDate?: Date;
}

class Month extends Component<Props> {
    static propTypes = {

    }

    static defaultProps = {
        disabledDates: [],
        enabledDates: [],
    }

    render() {
        const fullMonth = time.getFullMonth(this.props.viewDate, this.props.locale)
        const fullYear = this.props.viewDate && this.props.viewDate.getFullYear()

        return (
            <div
                data-react-toolbox="month"
                className={this.props.theme.month}
            >
                <span className={this.props.theme.title}>
                    {fullMonth} {fullYear}
                </span>

                <div className={this.props.theme.week}>{this.renderWeeks()}</div>

                <div className={this.props.theme.days}>{this.renderDays()}</div>
            </div>
        )
    }

    renderWeeks() {
        const days = range(0, 7).map((day) => time.getDayOfWeekLetter(day, this.props.locale))
        const source = this.props.sundayFirstDayOfWeek ? days : [...days.slice(1), days[0]]

        return source.map((day, i) => <span key={i}>{day}</span>)
    }

    renderDays() {
        return range(1, time.getDaysInMonth(this.props.viewDate) + 1).map((index) => {
            const date = new Date(this.props.viewDate.getFullYear(), this.props.viewDate.getMonth(), index)

            return (
                <CalendarDay
                    key={index}
                    day={index}
                    disabled={this.isDayDisabled(date)}
                    onClick={this.handleDayClick}
                    selectedDate={this.props.selectedDate}
                    theme={this.props.theme}
                    viewDate={this.props.viewDate}
                    sundayFirstDayOfWeek={this.props.sundayFirstDayOfWeek}
                />
            )
        })
    }

    handleDayClick = (day: number) => {
        if (this.props.onDayClick) {
            this.props.onDayClick(day)
        }
    }

    isDayDisabled(date: Date) {
        const { minDate, maxDate, enabledDates, disabledDates } = this.props
        const compareDate = (compDate) => date.getTime() === compDate.getTime()
        const dateInDisabled = disabledDates.filter(compareDate).length > 0
        const dateInEnabled = enabledDates.filter(compareDate).length > 0

        return (
            time.dateOutOfRange(date, minDate, maxDate) || (enabledDates.length > 0 && !dateInEnabled) || dateInDisabled
        )
    }
}

export default Month
