// @ts-nocheck
import React, { Component } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { IconButton } from '@optimacros/ui-kit-core';

import CalendarMonth from './CalendarMonth';
import time from '../../utils/react-toolbox-utils/time';
import { range, getAnimationModule } from '../../utils/react-toolbox-utils/utils';

const DIRECTION_STEPS = { left: -1, right: 1 };
const KEYS = {
    ENTER: 13,
    ARROW_UP: 38,
    ARROW_DOWN: 40,
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39,
    ESC: 27,
};

interface Props {
    disabledDates?: Date[];
    display?: string;
    enabledDates?: Date[];
    handleSelect?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    locale?: string;
    maxDate?: Date;
    minDate?: Date;
    onChange?: (value: Date, dayClick: boolean) => void;
    selectedDate?: Date;
    sundayFirstDayOfWeek?: boolean;
    theme?: {
        active?: string;
        calendar?: string;
        next?: string;
        prev?: string;
        years?: string;
    };
}

interface State {
    viewDate: Date;
    direction: string;
}

export class CalendarContent extends Component<Props, State> {
    static defaultProps = {
        display: 'months',
        selectedDate: new Date(),
    };

    state = {
        viewDate: this.props.selectedDate || new Date(),
        direction: '',
    };

    constructor(props: Props) {
        super(props);

        document.body.addEventListener('keydown', this.handleKeys);
    }

    activeYearNode: HTMLLIElement | null | undefined;

    yearsNode: HTMLUListElement | null | undefined;

    componentDidUpdate() {
        if (this.activeYearNode) {
            this.scrollToActive();
        }
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.handleKeys);
    }

    render() {
        return (
            <div className={this.props.theme.calendar}>
                {this.props.display === 'months' ? this.renderMonths() : this.renderYears()}
            </div>
        );
    }

    renderYears() {
        return (
            <ul
                data-react-toolbox="years"
                className={this.props.theme.years}
                ref={(node) => {
                    this.yearsNode = node;
                }}
            >
                {range(1900, 2100).map((year) => (
                    <li
                        className={
                            year === this.state.viewDate.getFullYear()
                                ? this.props.theme.active
                                : ''
                        }
                        id={year}
                        key={year}
                        onClick={this.handleYearClick}
                        ref={(node) => {
                            if (year === this.state.viewDate.getFullYear()) {
                                this.activeYearNode = node;
                            }
                        }}
                    >
                        {year}
                    </li>
                ))}
            </ul>
        );
    }

    renderMonths() {
        const { theme } = this.props;
        const animation = this.state.direction === 'left' ? 'slideLeft' : 'slideRight';
        const animationModule = getAnimationModule(animation, theme);

        return (
            <div data-react-toolbox="calendar">
                <IconButton
                    id="left"
                    className={theme.prev}
                    icon="chevron_left"
                    onClick={this.changeViewMonth}
                />
                <IconButton
                    id="right"
                    className={theme.next}
                    icon="chevron_right"
                    onClick={this.changeViewMonth}
                />
                <TransitionGroup>
                    <CSSTransition classNames={animationModule} timeout={350}>
                        <CalendarMonth
                            enabledDates={this.props.enabledDates}
                            disabledDates={this.props.disabledDates}
                            key={this.state.viewDate.getMonth()}
                            locale={this.props.locale}
                            maxDate={this.props.maxDate}
                            minDate={this.props.minDate}
                            onDayClick={this.handleDayClick}
                            selectedDate={this.props.selectedDate}
                            sundayFirstDayOfWeek={this.props.sundayFirstDayOfWeek}
                            theme={this.props.theme}
                            viewDate={this.state.viewDate}
                        />
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }

    scrollToActive() {
        if (this.yearsNode && this.activeYearNode) {
            const offset = this.yearsNode.offsetHeight / 2 + this.activeYearNode.offsetHeight / 2;

            this.yearsNode.scrollTop = this.activeYearNode.offsetTop - offset;
        }
    }

    handleDayClick = (day) => {
        if (this.props.onChange) {
            this.props.onChange(time.setDay(this.state.viewDate, day), true);
        }
    };

    handleYearClick = (event) => {
        const year = parseInt(event.currentTarget.id, 10);
        const viewDate = time.setYear(this.props.selectedDate, year);

        this.setState({ viewDate });

        if (this.props.onChange) {
            this.props.onChange(viewDate, false);
        }
    };

    handleKeys = (event) => {
        const { selectedDate } = this.props;
        const availableKeys = [
            KEYS.ENTER,
            KEYS.ARROW_UP,
            KEYS.ARROW_DOWN,
            KEYS.ARROW_LEFT,
            KEYS.ARROW_RIGHT,
        ];

        if (availableKeys.includes(event.keyCode)) {
            event.preventDefault();
        }

        switch (event.keyCode) {
            case KEYS.ENTER:
                if (this.props.handleSelect) {
                    this.props.handleSelect();
                }

                break;
            case KEYS.ARROW_LEFT:
                this.handleDayArrowKey(time.addDays(selectedDate, -1));
                break;
            case KEYS.ARROW_UP:
                this.handleDayArrowKey(time.addDays(selectedDate, -7));
                break;
            case KEYS.ARROW_RIGHT:
                this.handleDayArrowKey(time.addDays(selectedDate, 1));
                break;
            case KEYS.ARROW_DOWN:
                this.handleDayArrowKey(time.addDays(selectedDate, 7));
                break;
            default:
                break;
        }
    };

    handleDayArrowKey = (date: Date) => {
        this.setState({ viewDate: date });

        if (this.props.onChange) {
            this.props.onChange(date, false);
        }
    };

    changeViewMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const direction = event.currentTarget.id;

        this.setState((state) => ({
            direction,
            viewDate: time.addMonths(
                state.viewDate,
                DIRECTION_STEPS[direction as 'left' | 'right'],
            ),
        }));
    };
}
