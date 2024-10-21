// @ts-nocheck
import classnames from 'classnames'
import React, { Component } from 'react'
import { mergeStyles, Button } from 'ui-kit-core'

import { CalendarContent } from './CalendarContent'
import time from '../../utils/react-toolbox-utils/time'

import styles from './Calendar.module.css'

interface Props {
    active?: boolean
    autoOk?: boolean
    cancelLabel?: string
    className?: string
    disabledDates?: Date[]
    enabledDates?: Date[]
    locale?: string
    maxDate?: Date
    minDate?: Date
    name?: string
    okLabel?: string
    onDismiss?: () => void
    onSelect?: (value: Date, event?: React.ChangeEvent<HTMLSelectElement>) => void
    sundayFirstDayOfWeek?: boolean
    theme?: {
        button?: string
        calendarWrapper?: string
        date?: string
        dialog?: string
        wrapper?: string
        header?: string
        monthsDisplay?: string
        year?: string
        yearsDisplay?: string
        navigation?: string
    }
    value?: Date
}

interface State {
    display: string
    date: Date
}

export class Calendar extends Component<Props, State> {
    static defaultProps = {
        active: false,
        cancelLabel: 'Cancel',
        className: '',
        okLabel: 'Ok',
        value: new Date(),
    }

    state = {
        display: 'months',
        date: this.props.value || new Date(),
    }

    componentDidMount() {
        this.updateStateDate(this.props.value)
    }

    render() {
        const theme = mergeStyles(this.props.theme, styles)
        const display = `${this.state.display}Display`
        const headerClassName = classnames(theme.header, theme[display])
        const shortDayOfWeek = time.getShortDayOfWeek(this.state.date.getDay(), this.props.locale)
        const shortMonth = time.getShortMonth(this.state.date, this.props.locale)
        const date = this.state.date.getDate()

        const type = 'custom'

        const className = classnames(
            [theme.dialog, theme.wrapper, theme[type]],
            {
                [theme.active]: this.props.active,
            },
            this.props.className,
        )

        return (
            <div data-react-toolbox="dialog" className={className}>
                <section className={theme.body}>
                    <header className={headerClassName}>
                        <span id="years" className={theme.year} onClick={this.handleSwitchDisplay}>
                            {this.state.date.getFullYear()}
                        </span>

                        <h3 id="months" className={theme.date} onClick={this.handleSwitchDisplay}>
                            {shortDayOfWeek}, {shortMonth} {date}
                        </h3>
                    </header>

                    <div className={theme.calendarWrapper}>
                        <CalendarContent
                            disabledDates={this.props.disabledDates}
                            display={this.state.display}
                            enabledDates={this.props.enabledDates}
                            handleSelect={this.handleSelect}
                            maxDate={this.props.maxDate}
                            minDate={this.props.minDate}
                            onChange={this.handleNewDate}
                            selectedDate={this.state.date}
                            theme={theme}
                            locale={this.props.locale}
                            sundayFirstDayOfWeek={this.props.sundayFirstDayOfWeek}
                        />
                    </div>
                </section>

                {this.renderActions()}
            </div>
        )
    }

    renderActions() {
        const theme = mergeStyles(this.props.theme, styles)

        const actions = this.actions.map((action, idx) => {
            const className = classnames(theme.button, {
                [action.className]: action.className,
            })

            return <Button key={idx} {...action} className={className} />
        })

        if (actions.length) {
            return <nav className={theme.navigation}>{actions}</nav>
        }

        return null
    }

    handleNewDate = (value: Date, dayClick: boolean) => {
        const state = {
            display: 'months',
            date: value,
        }

        if (time.dateOutOfRange(value, this.props.minDate, this.props.maxDate)) {
            if (this.props.maxDate && this.props.minDate) {
                state.date = time.closestDate(value, this.props.maxDate, this.props.minDate)
            } else {
                state.date = this.props.maxDate || this.props.minDate || new Date()
            }
        }

        this.setState(state)

        if (dayClick && this.props.autoOk && this.props.onSelect) {
            this.props.onSelect(value)
        }
    }

    handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (this.props.onSelect) {
            this.props.onSelect(this.state.date, event)
        }
    }

    handleSwitchDisplay = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ display: event.target.id })
    }

    updateStateDate = (date: Date) => {
        if (Object.prototype.toString.call(date) === '[object Date]') {
            this.handleNewDate(date, false)
        }
    }

    get actions() {
        const theme = mergeStyles(this.props.theme, styles)

        return [
            {
                label: this.props.cancelLabel,
                className: theme.button,
                onClick: this.props.onDismiss,
            },
            {
                label: this.props.okLabel,
                className: theme.button,
                name: this.props.name,
                onClick: this.handleSelect,
            },
        ]
    }
}
