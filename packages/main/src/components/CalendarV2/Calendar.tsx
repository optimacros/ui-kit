import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as datepicker from '@zag-js/date-picker';
import { useMachine, normalizeProps, Portal } from '@zag-js/react';
import { ComponentProps, useId } from 'react';

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

export const Positioner = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <Portal>
            <styled.div {...props} {...api.getPositionerProps()} ref={ref} />
        </Portal>
    );
});

export const Content = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} {...api.getContentProps()} ref={ref} />;
});

export const Indicator = (props) => {
    const api = useApi();

    return (
        <>
            <div hidden={api.view !== 'day'}>
                <div {...api.getViewControlProps({ view: 'year' })}>
                    <button {...api.getPrevTriggerProps()}>Prev</button>
                    <div>{api.visibleRangeText.start}</div>
                    <button {...api.getNextTriggerProps()}>Next</button>
                </div>

                <table {...api.getTableProps({ view: 'day' })}>
                    <thead {...api.getTableHeaderProps({ view: 'day' })}>
                        <tr {...api.getTableRowProps({ view: 'day' })}>
                            {api.weekDays.map((day, i) => (
                                <th scope="col" key={i} aria-label={day.long}>
                                    {day.narrow}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody {...api.getTableBodyProps({ view: 'day' })}>
                        {api.weeks.map((week, i) => (
                            <tr key={i} {...api.getTableRowProps({ view: 'day' })}>
                                {week.map((value, i) => (
                                    <td key={i} {...api.getDayTableCellProps({ value })}>
                                        <div
                                            {...api.getDayTableCellTriggerProps({
                                                value,
                                            })}
                                        >
                                            {value.day}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/*  Year View  */}
            <div hidden={api.view !== 'year'}>
                <div {...api.getViewControlProps({ view: 'year' })}>
                    <button {...api.getPrevTriggerProps({ view: 'year' })}>Prev</button>
                    <span>
                        {api.getDecade().start} - {api.getDecade().end}
                    </span>
                    <button {...api.getNextTriggerProps({ view: 'year' })}>Next</button>
                </div>

                <table {...api.getTableProps({ view: 'year', columns: 4 })}>
                    <tbody {...api.getTableBodyProps()}>
                        {api.getYearsGrid({ columns: 4 }).map((years, row) => (
                            <tr key={row} {...api.getTableRowProps({ view: 'year' })}>
                                {years.map((year, index) => (
                                    <td
                                        key={index}
                                        {...api.getYearTableCellProps({
                                            ...year,
                                            columns: 4,
                                        })}
                                    >
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
                    </tbody>
                </table>
            </div>
        </>
    );
};

function Calendar() {
    const [state, send] = useMachine(datepicker.machine({ id: useId() }));

    const api = datepicker.connect(state, send, normalizeProps);

    return (
        <>
            <div {...api.getControlProps()}>
                <input {...api.getInputProps()} />
                <button {...api.getTriggerProps()}>🗓</button>
            </div>

            <Portal>
                <div {...api.getPositionerProps()}>
                    <div {...api.getContentProps()}>{/*  Day View  */}</div>
                </div>
            </Portal>
        </>
    );
}
