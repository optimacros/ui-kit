// @ts-nocheck
import React, { Component } from 'react'
import classnames from 'classnames'
import time from '../../utils/react-toolbox-utils/time'

interface Props {
    day?: number;
    disabled?: boolean;
    onClick?: (day: number) => void;
    selectedDate?: Date;
    sundayFirstDayOfWeek?: boolean;
    theme?: {
        active?: string;
        day?: string;
        disabled?: string;
    };
    viewDate?: Date;
}

class Day extends Component<Props> {
    static propTypes = {

    }

    render() {
        const className = classnames(this.props.theme.day, {
            [this.props.theme.active]: this.isSelected(),
            [this.props.theme.disabled]: this.props.disabled,
        })

        return (
            <div
                data-react-toolbox="day"
                className={className}
                style={this.dayStyle()}
            >
                <span onClick={this.handleClick}>{this.props.day}</span>
            </div>
        )
    }

    dayStyle() {
        if (this.props.day === 1) {
            const weekDayDiff = this.props.sundayFirstDayOfWeek ? 0 : 1
            const firstDay = time.getFirstWeekDay(this.props.viewDate) - weekDayDiff

            return {
                marginLeft: `${(firstDay >= 0 ? firstDay : 6) * (100 / 7)}%`,
            }
        }
    }

    isSelected() {
        const sameYear = this.props.viewDate.getFullYear() === this.props.selectedDate.getFullYear()
        const sameMonth = this.props.viewDate.getMonth() === this.props.selectedDate.getMonth()
        const sameDay = this.props.day === this.props.selectedDate.getDate()

        return sameYear && sameMonth && sameDay
    }

    handleClick = () => {
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick(this.props.day)
        }
    }
}

export default Day
