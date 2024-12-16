import React, { ReactNode, useEffect } from 'react';
import { time } from '@optimacros-ui/utils';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as datepicker from '@zag-js/date-picker';

export const {
    RootProvider: Root,
    useApi,
    State,
} = createReactApiStateContext({
    api: null as datepicker.Api,
    id: 'calendar',
    machine: datepicker,
    initialState: {},
    defaultContext: {
        open: true,
    },
});

const defaultLocale = 'en';

export const Content = forward<{ value?: Date }, 'div'>(({ value, ...rest }, ref) => {
    const api = useApi();
    useEffect(() => {
        value && api.setValue([datepicker.parse(value)]);
    }, []);

    return <styled.div {...rest} data-scope="date-picker" data-part="content" ref={ref} />;
});

export const Header = forward<{}, 'header'>((props, ref) => {
    return <styled.header {...props} ref={ref} data-scope="date-picker" data-part="header" />;
});

export const HeaderYears = forward<{ locale?: string }, 'span'>(
    ({ locale = defaultLocale, ...rest }, ref) => {
        const api = useApi();

        const text = api.value[0]?.year ?? 'choose date';

        return (
            <styled.span {...rest} ref={ref} data-scope="date-picker" data-part="header-years">
                {text}
            </styled.span>
        );
    },
);

export const HeaderMonths = forward<
    { locale?: string; children?: (text: string) => ReactNode },
    'div'
>(({ locale = defaultLocale, children, ...rest }, ref) => {
    const api = useApi();

    const text = api.valueAsDate[0]
        ? `${api.valueAsDate.toLocaleString(locale, { weekday: 'short' })}, ${time.getShortMonth(api.valueAsDate[0], locale)} ${api.value[0]?.day}`
        : 'choose date';

    return (
        <styled.div {...rest} ref={ref} data-scope="date-picker" data-part="header-months">
            {children ? children(text) : text}
        </styled.div>
    );
});

export const ViewControl = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <styled.div
            {...props}
            {...api.getViewControlProps({ view: 'year' })}
            data-scope="date-picker"
            data-part="view-control"
            ref={ref}
        />
    );
});

export const PrevTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return (
        <styled.button
            {...props}
            {...api.getPrevTriggerProps()}
            data-scope="date-picker"
            data-part="prev-trigger"
            ref={ref}
        />
    );
});

export const NextTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return (
        <styled.button
            {...props}
            {...api.getNextTriggerProps()}
            data-scope="date-picker"
            data-part="next-trigger"
            ref={ref}
        />
    );
});

export const RangeText = forward<{ locale?: string }, 'span'>(
    ({ locale = defaultLocale, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.span {...rest} data-scope="date-picker" data-part="range-text" ref={ref}>
                {`${time.getFullMonth(api.focusedValueAsDate, locale)} ${api.visibleRange.start.year}`}
            </styled.span>
        );
    },
);

export const Table = forward<{}, 'table'>((props, ref) => {
    const api = useApi();

    return (
        <styled.table
            {...props}
            {...api.getTableProps({ view: 'day' })}
            data-scope="date-picker"
            data-part="table"
            ref={ref}
        />
    );
});

export const TableHead = forward<{ locale?: string }, 'thead'>(
    ({ locale = defaultLocale, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.thead
                {...rest}
                {...api.getTableHeaderProps({ view: 'day' })}
                data-scope="date-picker"
                data-part="table-head"
                ref={ref}
            >
                <tr {...api.getTableRowProps({ view: 'day' })}>
                    {api.weekDays.map((day, i) => (
                        <th
                            data-scope="date-picker"
                            data-part="weekday"
                            key={i}
                            aria-label={day.long}
                        >
                            {time.getShortDayOfWeek(i, locale)}
                        </th>
                    ))}
                </tr>
            </styled.thead>
        );
    },
);

export const TableBody = forward<{}, 'tbody'>((props, ref) => {
    const api = useApi();
    const handleClick = (value: datepicker.DateValue) => {
        api.setValue([value]);
    };

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
                                onClick={() => handleClick(value)}
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
    onSelect?: (value: Date, event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SuccessButton = forward<SuccessButtonProps, 'button'>(({ onSelect, ...rest }, ref) => {
    const api = useApi();
    const handleClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
