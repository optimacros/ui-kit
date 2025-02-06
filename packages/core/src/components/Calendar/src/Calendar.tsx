import { ChangeEvent, ReactNode } from 'react';
import {} from '@internationalized/date';
import {
    ConnectMachine,
    createReactApiStateContext,
    forward,
    styled,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import * as machine from '@zag-js/date-picker';

export const dateFormatters = (date: Date | string) => {
    return machine.parse(date);
};

const getDateWithSelectedYear = (initialDate: string, selectedYear: string): string => {
    const curMonthAndDay = new Date().toLocaleDateString('en-CA', {
        month: '2-digit',
        day: '2-digit',
    });

    return selectedYear + (initialDate ? initialDate.substring(4) : `-${curMonthAndDay}`);
};
export type State = UserState<typeof machine>;

export type Context = UserContext<machine.Context, {}>;

const connect = ((api, { state, send }, machine) => {
    return {
        ...api,
        locale: state.context.locale,
        getDayTableCellTriggerProps({ value }) {
            return {
                ...api.getDayTableCellTriggerProps({ value }),
                onClick: () => api.setValue([value]),
            };
        },
        getYearTableCellProps(year: { label: string; value: number }) {
            const setYear = (year: string) => {
                const curCalendarDate = api.valueAsString[0];
                const dateWithSelectedYear = getDateWithSelectedYear(curCalendarDate, year);
                //@ts-ignore
                api.setValue([dateFormatters(dateWithSelectedYear)]);
            };
            return {
                ...api.getYearTableCellProps({
                    ...year,
                    columns: 4,
                }),
                onClick: () => {
                    setYear(year.label);
                    api.setView('day');
                },
                onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                        event.stopPropagation();
                        setYear(year.label);
                        api.setView('day');
                    }
                },
            };
        },
        getHeaderYearsProps() {
            return {
                'data-scope': 'date-picker',
                'data-part': 'header-years',
                children: api.value[0]?.year ?? 'choose date',
                onClick: () => api.setView('year'),
            };
        },
        getHeaderMonthsProps() {
            return {
                'data-scope': 'date-picker',
                'data-part': 'header-months',
                children: api.valueAsDate[0]
                    ? `${api.valueAsDate[0].toLocaleString(state.context.locale, { month: 'short' })} ${api.value[0]?.day}, ${api.valueAsDate[0].toLocaleString(state.context.locale, { weekday: 'short' })}`
                    : 'choose date',
                onClick: () => api.setView('day'),
            };
        },
        getRangeTextProps() {
            return {
                ...api.getRangeTextProps(),
                children: `${api.focusedValueAsDate.toLocaleString(state.context.locale, { month: 'long' })} ${api.visibleRange.start.year}`,
            };
        },
        getWeekdayProps(day: machine.WeekDay) {
            return {
                'data-scope': 'date-picker',
                'data-part': 'weekday',
                key: `weekday-${day.value.day}`,
                'aria-label': day.long,
                children: day.short,
            };
        },
        getVisibility(params: string) {
            return {
                hidden: api.view !== params,
            };
        },
    };
}) satisfies ConnectMachine<machine.Api, Context, State>;

//TODO: types
export const {
    RootProvider: Root,
    useApi,
    Api,
    useProxySelector,
    useSelector,
    splitProps,
} = createReactApiStateContext<typeof machine>({
    id: 'calendar',
    machine,
    connect,
});

export const Trigger = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return <styled.div {...props} {...api.getTriggerProps()} ref={ref} />;
    },
    {
        displayName: 'Calendar.Trigger',
    },
);

export const Content = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();
        return <styled.div {...props} {...api.getContentProps()} ref={ref} />;
    },
    {
        displayName: 'Calendar.Content',
    },
);

// Header
export const Header = forward<{}, 'header'>(
    (props, ref) => {
        return <styled.header {...props} ref={ref} data-scope="date-picker" data-part="header" />;
    },
    {
        displayName: 'CalendarHeader',
    },
);

export const HeaderYears = forward<{}, 'span'>((props, ref) => {
    const api = useApi();

    return <styled.span {...props} {...api.getHeaderYearsProps()} ref={ref} />;
});

export const HeaderMonths = forward<{ children?: (text: string) => ReactNode }, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return <styled.div {...rest} {...api.getHeaderMonthsProps()} ref={ref} />;
    },
);

// Days Content
export const DaysViewControl = forward<{}, 'div'>(({ children, ...others }, ref) => {
    const api = useApi();

    return (
        <styled.div {...others} {...api.getVisibility('day')} ref={ref}>
            <div {...api.getViewControlProps({ view: 'year' })}>{children}</div>
        </styled.div>
    );
});

export const DaysPrevTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getPrevTriggerProps()} ref={ref} />;
});

export const DaysNextTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getNextTriggerProps()} ref={ref} />;
});

export const DaysRangeText = forward<{}, 'span'>((props, ref) => {
    const api = useApi();

    return <styled.span {...props} {...api.getRangeTextProps()} ref={ref} />;
});

export const DaysTable = forward<{}, 'table'>((props, ref) => {
    const api = useApi();

    return (
        <styled.table
            {...props}
            {...api.getVisibility('day')}
            {...api.getTableProps({ view: 'day' })}
            ref={ref}
        />
    );
});

export const DaysTableHead = forward<{}, 'thead'>((props, ref) => {
    const api = useApi();

    return (
        <styled.thead {...props} {...api.getTableHeaderProps({ view: 'day' })} ref={ref}>
            <tr {...api.getTableRowProps({ view: 'day' })}>
                {api.weekDays.map((day) => (
                    <th {...api.getWeekdayProps(day)} />
                ))}
            </tr>
        </styled.thead>
    );
});

export const DaysTableBody = forward<{}, 'tbody'>((props, ref) => {
    const api = useApi();

    return (
        <styled.tbody {...props} {...api.getTableBodyProps({ view: 'day' })} ref={ref}>
            {api.weeks.map((week, i) => (
                <tr key={i} {...api.getTableRowProps({ view: 'day' })}>
                    {week.map((value, i) => (
                        <td key={i} {...api.getDayTableCellProps({ value })}>
                            <span
                                {...api.getDayTableCellTriggerProps({
                                    value,
                                })}
                                data-testid="table-cell-trigger"
                            >
                                {value.day}
                            </span>
                        </td>
                    ))}
                </tr>
            ))}
        </styled.tbody>
    );
});

//Years content
export const YearsViewControl = forward<{}, 'div'>(({ children, ...other }, ref) => {
    const api = useApi();

    return (
        <styled.div {...other} {...api.getVisibility('year')} ref={ref}>
            <div {...api.getViewControlProps({ view: 'year' })}>{children}</div>
        </styled.div>
    );
});

export const YearsPrevTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getPrevTriggerProps({ view: 'year' })} ref={ref} />;
});

export const YearsNextTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getNextTriggerProps({ view: 'year' })} ref={ref} />;
});

export const YearsRangeText = forward<{}, 'span'>((props, ref) => {
    const api = useApi();

    return (
        <styled.span {...props} ref={ref}>
            {api.getDecade().start} - {api.getDecade().end}
        </styled.span>
    );
});

export const YearsTable = forward<{}, 'table'>((props, ref) => {
    const api = useApi();

    return (
        <styled.table
            {...props}
            {...api.getVisibility('year')}
            {...api.getTableProps({ view: 'year', columns: 4 })}
            ref={ref}
        />
    );
});

export const YearsTableBody = forward<{}, 'tbody'>((props, ref) => {
    const api = useApi();

    return (
        <styled.tbody {...props} {...api.getTableBodyProps({ view: 'day' })} ref={ref}>
            {api.getYearsGrid({ columns: 4 }).map((years, row) => (
                <tr key={row} {...api.getTableRowProps({ view: 'year' })}>
                    {years.map((year, index) => (
                        <td key={index} {...api.getYearTableCellProps(year)}>
                            <div
                                {...api.getYearTableCellTriggerProps({
                                    ...year,
                                    columns: 4,
                                })}
                            >
                                {year.label}
                            </div>
                        </td>
                    ))}
                </tr>
            ))}
        </styled.tbody>
    );
});

// Footer
export const Footer = forward<{}, 'div'>((props, ref) => {
    return <styled.div {...props} ref={ref} data-scope="date-picker" data-part="footer" />;
});

export type DismissButtonProps = {
    onDismiss?: () => void;
};

export const DismissButton = forward<DismissButtonProps, 'button'>(
    ({ onDismiss, ...rest }, ref) => {
        return (
            <styled.button
                {...rest}
                ref={ref}
                data-scope="date-picker"
                data-part="dismiss-button"
                onClick={onDismiss}
            />
        );
    },
);

export type SuccessButtonProps = {
    onSelect?: (value: Date, event: ChangeEvent<HTMLSelectElement>) => void;
};

export const SuccessButton = forward<SuccessButtonProps, 'button'>(({ onSelect, ...rest }, ref) => {
    const api = useApi();

    const handleClick = (event) => {
        onSelect && onSelect(api.valueAsDate[0], event);
    };

    return (
        <styled.button
            {...rest}
            ref={ref}
            data-scope="date-picker"
            data-part="cuccess-button"
            onClick={handleClick}
        />
    );
});
