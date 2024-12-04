import React, { ComponentProps } from 'react';
import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as datepicker from '@zag-js/date-picker';

const initialState = {
    disabled: false,
};

export const { RootProvider, useApi, State } = createReactApiStateContext({
    api: null as datepicker.Api,
    id: 'calendar',
    machine: datepicker,
    initialState: { disabled: false },
    defaultContext: {
        open: true,
    },
});

export const Root = ({
    state,
    ...context
}: { state: typeof initialState } & ComponentProps<typeof RootProvider>) => {
    return <RootProvider {...context} state={state} />;
};

export const Content = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} {...api.getContentProps()} ref={ref} />;
});

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

    return (
        <styled.span {...props} ref={ref}>
            {api.visibleRangeText.start}
        </styled.span>
    );
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
                    <th scope="col" key={i} aria-label={day.long}>
                        {day.narrow}
                    </th>
                ))}
            </tr>
        </styled.thead>
    );
});

export const Footer = forward<{}, 'div'>((props, ref) => {
    return <styled.div {...props} ref={ref} />;
});

export type DismissButtonProps = {
    onDismiss?: () => void;
};
export const CanselButton = forward<DismissButtonProps, 'button'>(({ onDismiss, ...rest }, ref) => {
    return <styled.button {...rest} ref={ref} onClick={onDismiss} />;
});

export type SuccessButtonProps = {
    onSelect?: (value: Date, event: React.ChangeEvent<HTMLSelectElement>) => void;
};
export const SuccessButton = forward<SuccessButtonProps, 'button'>(({ onSelect, ...rest }, ref) => {
    const api = useApi();
    const handleClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect && onSelect(api.valueAsDate, event);
    };

    return <styled.button {...rest} ref={ref} onClick={handleClick} />;
});

export const TableBody = forward<{ onSelect: () => void }, 'tbody'>(
    ({ onSelect, ...rest }, ref) => {
        const api = useApi();
        const handleClick = (value) => {
            api.setOpen(true);
            api.setValue([value]);
        };

        return (
            <styled.tbody {...rest} {...api.getTableBodyProps({ view: 'day' })} ref={ref}>
                {api.weeks.map((week, i) => (
                    <tr key={i} {...api.getTableRowProps({ view: 'day' })}>
                        {week.map((value, i) => (
                            <td key={i} {...api.getDayTableCellProps({ value })}>
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
    },
);
