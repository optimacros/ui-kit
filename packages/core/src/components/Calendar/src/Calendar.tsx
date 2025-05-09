import { ChangeEvent, ComponentProps, ReactNode } from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { RootProvider, useApi } from './state';

export { RootProvider as Root };

export type RootProps = ComponentProps<typeof RootProvider>;

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
            <styled.div {...api.getViewControlProps({ view: 'year' })}>{children}</styled.div>
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
                            <styled.div
                                {...api.getYearTableCellTriggerProps({
                                    ...year,
                                    columns: 4,
                                })}
                            >
                                {year.label}
                            </styled.div>
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
