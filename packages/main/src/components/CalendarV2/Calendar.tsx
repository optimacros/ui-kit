import React, { ComponentProps, useEffect } from 'react';
import { time, tw } from '@optimacros/ui-kit-utils';
import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as datepicker from '@zag-js/date-picker';

export const { RootProvider, useApi, State } = createReactApiStateContext({
    api: null as datepicker.Api,
    id: 'calendar',
    machine: datepicker,
    initialState: {},
    defaultContext: {
        open: true,
    },
});

export const Root = ({ state, ...context }: ComponentProps<typeof RootProvider>) => {
    return <RootProvider {...context} state={state} />;
};

export const contentClassName = tw`
w-datepicker-dialog bg-calendar-primary-contrast text-[var(--font-size-calendar)] h-calendar-total 
leading-[var(--height-calendar-row)] relative text-center bg-calendar-primary-contrast
`;
export const Content = forward<{ value?: Date }, 'div'>(({ value, ...rest }, ref) => {
    const api = useApi();
    useEffect(() => {
        value && api.setValue([datepicker.parse(value)]);
    }, []);

    return (
        <styled.div
            {...rest}
            data-scope="calendar"
            data-part="content"
            ref={ref}
            className={contentClassName}
        />
    );
});

export const headerClassName = tw`
flex flex-col items-start bg-calendar-header text-calendar-header-text 
p-[calc(1.6_*_var(--unit))] pl-[calc(2_*_var(--unit))] pr-[calc(2_*_var(--unit))]
`;
export const Header = forward<{}, 'header'>((props, ref) => {
    return (
        <styled.header
            {...props}
            ref={ref}
            data-scope="calendar"
            data-part="header"
            className={headerClassName}
        />
    );
});

export const headerYearsClassName = tw`inline-block text-[var(--font-size-calendar-year)] transition-opacity`;
export const HeaderYears = forward<{ locale?: string }, 'span'>(({ locale, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.span
            {...rest}
            ref={ref}
            data-scope="calendar"
            data-part="header-years"
            className={headerYearsClassName}
        >
            {api.value[0]?.year}
        </styled.span>
    );
});

export const headerMonthsClassName = tw`
text-[3.4rem] font-[var(--font-weight-semi-bold)]
leading-[var(--size-calendar-month-text)] m-0 capitalize transition-opacity
`;
export const HeaderMonths = forward<{ locale?: string }, 'h3'>(({ locale, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.h3
            {...rest}
            ref={ref}
            data-scope="calendar"
            data-part="header-months"
            className={headerMonthsClassName}
        >
            {api.valueAsDate[0] &&
                `${time.getShortMonth(api.valueAsDate[0], locale)} ${api.value[0]?.day}`}
        </styled.h3>
    );
});

export const ViewControl = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <styled.div
            {...props}
            {...api.getViewControlProps({ view: 'year' })}
            data-scope="calendar"
            data-part="view-control"
            ref={ref}
        />
    );
});

export const prevTriggerClassName = tw`
cursor-pointer h-trigger-button opacity-70 absolute z-[var(--z-index-high)] left-0 w-calendar-trigger
bg-transparent border-0 rounded-[0.06rem] border-0 w-[var(--width-calendar-trigger)]
hover:border hover:border-solid hover:border-[var(--color-calendar-trigger)]
`;
export const PrevTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return (
        <styled.button
            {...props}
            {...api.getPrevTriggerProps()}
            data-scope="calendar"
            data-part="prev-trigger"
            ref={ref}
            className={prevTriggerClassName}
        />
    );
});

export const nextTriggerClassName = tw`
cursor-pointer h-trigger-button opacity-70 absolute z-[var(--z-index-high)] right-0
bg-transparent rounded-[0.06rem] border-0 w-[var(--width-calendar-trigger)]
hover:border hover:border-solid hover:border-[var(--color-calendar-trigger)]
`;
export const NextTrigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return (
        <styled.button
            {...props}
            {...api.getNextTriggerProps()}
            data-scope="calendar"
            data-part="next-trigger"
            ref={ref}
            className={nextTriggerClassName}
        />
    );
});

export const rangeTextClassName = tw`inline-block font-medium leading-[var(--height-calendar-row)]`;
export const RangeText = forward<{ locale?: string }, 'span'>(({ locale, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.span
            {...rest}
            data-scope="calendar"
            data-part="range-text"
            ref={ref}
            className={rangeTextClassName}
        >
            {`${time.getFullMonth(api.focusedValueAsDate, locale)} ${api.visibleRange.start.year}`}
        </styled.span>
    );
});

export const tableClassName = tw`w-full`;
export const Table = forward<{}, 'table'>((props, ref) => {
    const api = useApi();

    return (
        <styled.table
            {...props}
            {...api.getTableProps({ view: 'day' })}
            data-scope="calendar"
            data-part="table"
            ref={ref}
            className={tableClassName}
        />
    );
});

export const tableHeadClassNames = tw`
text-[var(--font-size-calendar-day)] h-calendar-row leading-[var(--height-calendar-row)] opacity-50
`;
export const TableHead = forward<{ locale?: string }, 'thead'>(({ locale, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.thead
            {...rest}
            {...api.getTableHeaderProps({ view: 'day' })}
            data-scope="calendar"
            data-part="table-head"
            ref={ref}
            className={tableHeadClassNames}
        >
            <tr {...api.getTableRowProps({ view: 'day' })}>
                {api.weekDays.map((day, i) => (
                    <th scope="col" key={i} aria-label={day.long}>
                        {time.getShortDayOfWeek(i, locale)}
                    </th>
                ))}
            </tr>
        </styled.thead>
    );
});

export const tableBodyClassName = tw`text-calendar-day cursor-pointer`;
export const tdClassName = tw`rounded-[0.2rem] hover:bg-calendar-primary-hover hover:text-calendar-primary`;
export const TableBody = forward<{}, 'tbody'>((props, ref) => {
    const api = useApi();
    const handleClick = (value: datepicker.DateValue) => {
        api.setValue([value]);
    };

    return (
        <styled.tbody
            {...props}
            {...api.getTableBodyProps({ view: 'day' })}
            data-scope="calendar"
            data-part="table-body"
            ref={ref}
            className={tableBodyClassName}
        >
            {api.weeks.map((week, i) => (
                <tr key={i} {...api.getTableRowProps({ view: 'day' })}>
                    {week.map((value, i) => (
                        <td
                            key={i}
                            {...api.getDayTableCellProps({ value })}
                            className={tdClassName}
                        >
                            <div
                                {...api.getDayTableCellTriggerProps({
                                    value,
                                })}
                                onClick={() => handleClick(value)}
                            >
                                {value.day}
                            </div>
                        </td>
                    ))}
                </tr>
            ))}
        </styled.tbody>
    );
});

export const footerClassName = tw`flex-grow-0 p-[var(--padding-footer)] text-right`;
export const Footer = forward<{}, 'div'>((props, ref) => {
    return (
        <styled.div
            {...props}
            ref={ref}
            data-scope="calendar"
            data-part="footer"
            className={footerClassName}
        />
    );
});

export type DismissButtonProps = {
    onDismiss?: () => void;
};
export const cancelButtonClassName = tw`
ml-[var(--padding-footer)] min-w-0 px-[var(--padding-footer)] leading-[var(--height-calendar-button-text)] cursor-pointer
bg-transparent text-calendar-button-text border-none h-full text-[1.4rem] rounded-[0.1875rem] m-w-calendar-button
hover:bg-calendar-button-hover focus:bg-calendar-button-focus focus:transparent
`;
export const CanselButton = forward<DismissButtonProps, 'button'>(({ onDismiss, ...rest }, ref) => {
    return (
        <styled.button
            {...rest}
            ref={ref}
            data-scope="calendar"
            data-part="cancel-button"
            onClick={onDismiss}
            className={cancelButtonClassName}
        />
    );
});

export type SuccessButtonProps = {
    onSelect?: (value: Date, event: React.ChangeEvent<HTMLSelectElement>) => void;
};
export const successButtonClassName = tw`
ml-[var(--padding-footer)] min-w-0 px-[var(--padding-footer)] leading-[var(--height-calendar-button-text)] cursor-pointer
bg-transparent text-calendar-button-text border-none h-full text-[1.4rem] rounded-[0.1875rem] m-w-calendar-button
hover:bg-calendar-button-hover focus:bg-calendar-button-focus focus:transparent
`;
export const SuccessButton = forward<SuccessButtonProps, 'button'>(({ onSelect, ...rest }, ref) => {
    const api = useApi();
    const handleClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect && onSelect(api.valueAsDate, event);
    };

    return (
        <styled.button
            {...rest}
            ref={ref}
            data-scope="calendar"
            data-part="cuccess-button"
            onClick={handleClick}
            className={successButtonClassName}
        />
    );
});
