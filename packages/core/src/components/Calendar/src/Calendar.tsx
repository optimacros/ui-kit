import { ChangeEvent, ReactNode } from 'react';
import {} from '@internationalized/date';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as datepicker from '@zag-js/date-picker';

export const { RootProvider: Root, useApi } = createReactApiStateContext({
    id: 'calendar',
    machine: datepicker,
    connect(api, { state, send }, machine) {
        return {
            ...api,
            locale: state.context.locale,
            getDayTableCellTriggerProps({ value }) {
                return {
                    ...api.getDayTableCellTriggerProps({ value }),
                    onClick: () => api.setValue([value]),
                };
            },
            getHeaderYearsProps() {
                return {
                    'data-scope': 'date-picker',
                    'data-part': 'header-years',
                    children: api.value[0]?.year ?? 'choose date',
                };
            },
            getHeaderMonthsProps() {
                return {
                    'data-scope': 'date-picker',
                    'data-part': 'header-months',
                    children: api.valueAsDate[0]
                        ? `${api.valueAsDate.toLocaleString(state.context.locale, { month: 'short' })} ${api.value[0]?.day}, ${api.valueAsDate.toLocaleString(state.context.locale, { weekday: 'short' })}`
                        : 'choose date',
                };
            },
            getRangeTextProps() {
                return {
                    ...api.getRangeTextProps(),
                    children: `${api.focusedValueAsDate.toLocaleString(state.context.locale, { month: 'long' })} ${api.visibleRange.start.year}`,
                };
            },
            getWeekdayProps(day: datepicker.WeekDay) {
                return {
                    'data-scope': 'date-picker',
                    'data-part': 'weekday',
                    key: `weekday-${day.value.day}`,
                    'aria-label': day.long,
                    children: day.short,
                };
            },
        };
    },
});

export const Content = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return <styled.div {...props} {...api.getContentProps()} ref={ref} />;
    },
    {
        displayName: 'Calendar.Content',
    },
);

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

export const ViewControl = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} {...api.getViewControlProps({ view: 'year' })} ref={ref} />;
});

export const PrevTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getPrevTriggerProps()} ref={ref} />;
});

export const NextTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getNextTriggerProps()} ref={ref} />;
});

export const RangeText = forward<{}, 'span'>((props, ref) => {
    const api = useApi();

    return <styled.span {...props} {...api.getRangeTextProps()} ref={ref} />;
});

export const Table = forward<{}, 'table'>((props, ref) => {
    const api = useApi();

    return <styled.table {...props} {...api.getTableProps({ view: 'day' })} ref={ref} />;
});

export const TableHead = forward<{}, 'thead'>((props, ref) => {
    const api = useApi();

    return (
        <styled.thead {...props} {...api.getTableHeaderProps({ view: 'day' })} ref={ref}>
            <tr {...api.getTableRowProps({ view: 'day' })}>
                {api.weekDays.map((day, i) => (
                    <th {...api.getWeekdayProps(day)} />
                ))}
            </tr>
        </styled.thead>
    );
});

export const TableBody = forward<{}, 'tbody'>((props, ref) => {
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
    const handleClick = (event: ChangeEvent<HTMLSelectElement>) => {
        onSelect && onSelect(api.valueAsDate, event);
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
