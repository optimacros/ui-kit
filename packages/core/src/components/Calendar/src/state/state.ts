import { ConnectZagApi, createMachineContext, ZagSchema } from '@optimacros-ui/store';
import * as machine from '@zag-js/date-picker';

export const dateFormatters = (date: Date | string) => {
    return machine.parse(date);
};

type Schema = ZagSchema<typeof machine>;

const connect = ((api, service) => {
    return {
        ...api,
        locale: service.prop('locale'),
        getDayTableCellTriggerProps({ value }) {
            return {
                ...api.getDayTableCellTriggerProps({ value }),
                onClick: () => api.setValue([value]),
            };
        },
        getYearTableCellProps(year: { label: string; value: number }) {
            const setYear = (year: string) => {
                const dt = api.value[0].set({
                    year: parseInt(year),
                });

                api.setValue([dt as machine.CalendarDate]);
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
                    ? `${api.valueAsDate[0].toLocaleString(service.prop('locale'), { month: 'short' })} ${api.value[0]?.day}, ${api.valueAsDate[0].toLocaleString(service.prop('locale'), { weekday: 'short' })}`
                    : 'choose date',
                onClick: () => api.setView('day'),
            };
        },
        getRangeTextProps() {
            return {
                ...api.getRangeTextProps(),
                children: `${api.focusedValueAsDate.toLocaleString(service.prop('locale'), { month: 'long' })} ${api.visibleRange.start.year}`,
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
}) satisfies ConnectZagApi<Schema, machine.Api>;

export const {
    RootProvider,
    useApi,
    useSelector,
    useState,
    Api,
    select,
    slice,
    splitProps,
    useFeatureFlags,
    useProxySelector,
} = createMachineContext<Schema, ReturnType<typeof connect>>({
    id: 'calendar',
    machine,
    connect,
});
