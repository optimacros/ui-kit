export {
    FocusOutsideEvent,
    InteractOutsideEvent,
    PointerDownOutsideEvent,
} from '@zag-js/dismissable';
import * as _zag_js_anatomy from '@zag-js/anatomy';
import {
    DirectionProperty,
    CommonProperties,
    PropTypes,
    RequiredBy,
    NormalizeProps,
} from '@zag-js/types';
import { DateValue, DateDuration, CalendarDate } from '@internationalized/date';
export {
    Calendar,
    CalendarDate,
    CalendarDateTime,
    DateDuration,
    DateFormatter,
    DateValue,
    ZonedDateTime,
} from '@internationalized/date';
import * as _zag_js_core from '@zag-js/core';
import { Service, Machine } from '@zag-js/core';
import { DateRangePreset } from '@zag-js/date-utils';
export { DateRangePreset } from '@zag-js/date-utils';
import { LiveRegion } from '@zag-js/live-region';
import { PositioningOptions, Placement } from '@zag-js/popper';
export { PositioningOptions } from '@zag-js/popper';

declare const anatomy: _zag_js_anatomy.AnatomyInstance<
    | 'content'
    | 'table'
    | 'label'
    | 'input'
    | 'root'
    | 'clearTrigger'
    | 'control'
    | 'monthSelect'
    | 'nextTrigger'
    | 'positioner'
    | 'prevTrigger'
    | 'rangeText'
    | 'tableBody'
    | 'tableCell'
    | 'tableCellTrigger'
    | 'tableHead'
    | 'tableHeader'
    | 'tableRow'
    | 'trigger'
    | 'viewTrigger'
    | 'viewControl'
    | 'yearSelect'
    | 'presetTrigger'
>;

type DateView = 'day' | 'month' | 'year';
interface ValueChangeDetails {
    value: DateValue[];
    valueAsString: string[];
    view: DateView;
}
interface FocusChangeDetails extends ValueChangeDetails {
    focusedValue: DateValue;
    view: DateView;
}
interface ViewChangeDetails {
    view: DateView;
}
interface OpenChangeDetails {
    open: boolean;
}
interface LocaleDetails {
    locale: string;
    timeZone: string;
}
type SelectionMode = 'single' | 'multiple' | 'range';
interface IntlTranslations {
    dayCell(state: DayTableCellState): string;
    nextTrigger(view: DateView): string;
    monthSelect: string;
    yearSelect: string;
    viewTrigger(view: DateView): string;
    prevTrigger(view: DateView): string;
    presetTrigger(value: string[]): string;
    clearTrigger: string;
    trigger(open: boolean): string;
    content: string;
    placeholder: (locale: string) => {
        year: string;
        month: string;
        day: string;
    };
}
type ElementIds = Partial<{
    root: string;
    label(index: number): string;
    table(id: string): string;
    tableHeader(id: string): string;
    tableBody(id: string): string;
    tableRow(id: string): string;
    content: string;
    cellTrigger(id: string): string;
    prevTrigger(view: DateView): string;
    nextTrigger(view: DateView): string;
    viewTrigger(view: DateView): string;
    clearTrigger: string;
    control: string;
    input(index: number): string;
    trigger: string;
    monthSelect: string;
    yearSelect: string;
    positioner: string;
}>;
export interface DatePickerProps extends DirectionProperty, CommonProperties {
    /**
     * The locale (BCP 47 language tag) to use when formatting the date.
     * @default "en-US"
     */
    locale?: string | undefined;
    /**
     * The localized messages to use.
     */
    translations?: IntlTranslations | undefined;
    /**
     * The ids of the elements in the date picker. Useful for composition.
     */
    ids?: ElementIds | undefined;
    /**
     * The `name` attribute of the input element.
     */
    name?: string | undefined;
    /**
     * The time zone to use
     * @default "UTC"
     */
    timeZone?: string | undefined;
    /**
     * Whether the calendar is disabled.
     */
    disabled?: boolean | undefined;
    /**
     * Whether the calendar is read-only.
     */
    readOnly?: boolean | undefined;
    /**
     * The minimum date that can be selected.
     */
    min?: DateValue | undefined;
    /**
     * The maximum date that can be selected.
     */
    max?: DateValue | undefined;
    /**
     * Whether the calendar should close after the date selection is complete.
     * This is ignored when the selection mode is `multiple`.
     * @default true
     */
    closeOnSelect?: boolean | undefined;
    /**
     * The controlled selected date(s).
     */
    value?: DateValue[] | undefined;
    /**
     * The initial selected date(s) when rendered.
     * Use when you don't need to control the selected date(s) of the date picker.
     */
    defaultValue?: DateValue[] | undefined;
    /**
     * The controlled focused date.
     */
    focusedValue?: DateValue | undefined;
    /**
     * The initial focused date when rendered.
     * Use when you don't need to control the focused date of the date picker.
     */
    defaultFocusedValue?: DateValue | undefined;
    /**
     * The number of months to display.
     */
    numOfMonths?: number | undefined;
    /**
     * The first day of the week.
     *  `0` - Sunday
     *  `1` - Monday
     *  `2` - Tuesday
     *  `3` - Wednesday
     *  `4` - Thursday
     *  `5` - Friday
     *  `6` - Saturday
     */
    startOfWeek?: number | undefined;
    /**
     * Whether the calendar should have a fixed number of weeks.
     * This renders the calendar with 6 weeks instead of 5 or 6.
     */
    fixedWeeks?: boolean | undefined;
    /**
     * Function called when the value changes.
     */
    onValueChange?: ((details: ValueChangeDetails) => void) | undefined;
    /**
     * Function called when the focused date changes.
     */
    onFocusChange?: ((details: FocusChangeDetails) => void) | undefined;
    /**
     * Function called when the view changes.
     */
    onViewChange?: ((details: ViewChangeDetails) => void) | undefined;
    /**
     * Function called when the calendar opens or closes.
     */
    onOpenChange?: ((details: OpenChangeDetails) => void) | undefined;
    /**
     * Returns whether a date of the calendar is available.
     */
    isDateUnavailable?: ((date: DateValue, locale: string) => boolean) | undefined;
    /**
     * The selection mode of the calendar.
     * - `single` - only one date can be selected
     * - `multiple` - multiple dates can be selected
     * - `range` - a range of dates can be selected
     *
     * @default "single"
     */
    selectionMode?: SelectionMode | undefined;
    /**
     * The format of the date to display in the input.
     */
    format?: ((date: DateValue, details: LocaleDetails) => string) | undefined;
    /**
     * Function to parse the date from the input back to a DateValue.
     */
    parse?: ((value: string, details: LocaleDetails) => DateValue | undefined) | undefined;
    /**
     * The placeholder text to display in the input.
     */
    placeholder?: string | undefined;
    /**
     * The view of the calendar
     */
    view?: DateView | undefined;
    /**
     * The default view of the calendar
     * @default "day"
     */
    defaultView?: DateView | undefined;
    /**
     * The minimum view of the calendar
     * @default "day"
     */
    minView?: DateView | undefined;
    /**
     * The maximum view of the calendar
     * @default "year"
     */
    maxView?: DateView | undefined;
    /**
     * The user provided options used to position the date picker content
     */
    positioning?: PositioningOptions | undefined;
    /**
     * The controlled open state of the date picker
     */
    open?: boolean | undefined;
    /**
     * The initial open state of the date picker when rendered.
     * Use when you don't need to control the open state of the date picker.
     */
    defaultOpen?: boolean | undefined;
}
type PropsWithDefault =
    | 'minView'
    | 'maxView'
    | 'numOfMonths'
    | 'defaultView'
    | 'selectionMode'
    | 'positioning'
    | 'locale'
    | 'timeZone'
    | 'closeOnSelect'
    | 'format'
    | 'parse'
    | 'focusedValue';
export interface PrivateContext {
    /**
     * The active input value (based on the active index)
     */
    inputValue: string;
    /**
     * The start date of the current visible duration.
     */
    startValue: DateValue;
    /**
     * Whether the calendar has focus
     */
    hasFocus?: boolean | undefined;
    /**
     * The current hovered date. Useful for range selection mode.
     */
    hoveredValue: DateValue | null;
    /**
     * The index of the currently active date.
     * Used in range selection mode.
     */
    activeIndex: number;
    /**
     * The computed placement (maybe different from initial placement)
     */
    currentPlacement?: Placement | undefined;
    /**
     * Whether the calendar should restore focus to the input when it closes.
     */
    restoreFocus?: boolean | undefined;
    /**
     * The selected date(s).
     */
    value: DateValue[];
    /**
     * The view of the calendar.
     */
    view: DateView;
    /**
     * The focused date.
     */
    focusedValue: DateValue;
}
type ComputedContext = Readonly<{
    /**
     * The end date of the current visible duration.
     */
    endValue: DateValue;
    /**
     * Whether the calendar is interactive.
     */
    isInteractive: boolean;
    /**
     * The duration of the visible range.
     */
    visibleDuration: DateDuration;
    /**
     * The start/end date of the current visible duration.
     */
    visibleRange: {
        start: DateValue;
        end: DateValue;
    };
    /**
     * The text to announce when the visible range changes.
     */
    visibleRangeText: {
        start: string;
        end: string;
        formatted: string;
    };
    /**
     * Whether the next visible range is valid.
     */
    isNextVisibleRangeValid: boolean;
    /**
     * Whether the previous visible range is valid.
     */
    isPrevVisibleRangeValid: boolean;
    /**
     * The value text to display in the input.
     */
    valueAsString: string[];
}>;
type Refs = {
    /**
     * The live region to announce changes
     */
    announcer?: LiveRegion | undefined;
};
interface DatePickerSchema {
    state: 'idle' | 'focused' | 'open';
    tag: 'open' | 'closed';
    props: RequiredBy<DatePickerProps, PropsWithDefault>;
    context: PrivateContext;
    computed: ComputedContext;
    refs: Refs;
    guard: string;
    effect: string;
    action: string;
}
type DatePickerService = Service<DatePickerSchema>;
type DatePickerMachine = Machine<DatePickerSchema>;
export interface Range<T> {
    start: T;
    end: T;
}
type VisibleRange = Range<DateValue>;
export interface DateValueOffset {
    visibleRange: VisibleRange;
    weeks: DateValue[][];
}
export interface TableCellProps {
    disabled?: boolean | undefined;
    value: number;
    columns?: number | undefined;
}
export interface TableCellState {
    focused: boolean;
    selectable: boolean;
    selected: boolean;
    valueText: string;
    readonly disabled: boolean;
}
export interface DayTableCellProps {
    value: DateValue;
    disabled?: boolean | undefined;
    visibleRange?: VisibleRange | undefined;
}
export interface DayTableCellState {
    invalid: boolean;
    disabled: boolean;
    selected: boolean;
    unavailable: boolean;
    outsideRange: boolean;
    inRange: boolean;
    firstInRange: boolean;
    lastInRange: boolean;
    today: boolean;
    weekend: boolean;
    formattedDate: string;
    readonly focused: boolean;
    readonly ariaLabel: string;
    readonly selectable: boolean;
}
interface TableProps {
    view?: DateView | undefined;
    columns?: number | undefined;
    id?: string | undefined;
}
type PresetTriggerValue = DateValue[] | DateRangePreset;
interface PresetTriggerProps {
    value: PresetTriggerValue;
}
interface ViewProps {
    view?: DateView | undefined;
}
interface InputProps {
    /**
     * The index of the input to focus.
     */
    index?: number | undefined;
    /**
     * Whether to fix the input value on blur.
     * @default true
     */
    fixOnBlur?: boolean | undefined;
}
interface LabelProps {
    index?: number | undefined;
}
interface MonthGridProps {
    columns?: number | undefined;
    format?: 'short' | 'long' | undefined;
}
export interface Cell {
    label: string;
    value: number;
}
type MonthGridValue = Cell[][];
interface YearGridProps {
    columns?: number | undefined;
}
type YearGridValue = Cell[][];
interface WeekDay {
    value: DateValue;
    short: string;
    long: string;
    narrow: string;
}
export interface MonthFormatOptions {
    format?: 'short' | 'long' | undefined;
}
interface VisibleRangeText extends Range<string> {
    formatted: string;
}
interface DatePickerApi<T extends PropTypes = PropTypes> {
    /**
     * Whether the input is focused
     */
    focused: boolean;
    /**
     * Whether the date picker is open
     */
    open: boolean;
    /**
     * The current view of the date picker
     */
    view: DateView;
    /**
     * Returns an array of days in the week index counted from the provided start date, or the first visible date if not given.
     */
    getDaysInWeek(week: number, from?: DateValue): DateValue[];
    /**
     * Returns the offset of the month based on the provided number of months.
     */
    getOffset(duration: DateDuration): DateValueOffset;
    /**
     * Returns the range of dates based on the provided date range preset.
     */
    getRangePresetValue(value: DateRangePreset): DateValue[];
    /**
     * Returns the weeks of the month from the provided date. Represented as an array of arrays of dates.
     */
    getMonthWeeks(from?: DateValue): DateValue[][];
    /**
     * Returns whether the provided date is available (or can be selected)
     */
    isUnavailable(date: DateValue): boolean;
    /**
     * The weeks of the month. Represented as an array of arrays of dates.
     */
    weeks: DateValue[][];
    /**
     * The days of the week. Represented as an array of strings.
     */
    weekDays: WeekDay[];
    /**
     * The visible range of dates.
     */
    visibleRange: VisibleRange;
    /**
     * The human readable text for the visible range of dates.
     */
    visibleRangeText: VisibleRangeText;
    /**
     * The selected date.
     */
    value: DateValue[];
    /**
     * The selected date as a Date object.
     */
    valueAsDate: Date[];
    /**
     * The selected date as a string.
     */
    valueAsString: string[];
    /**
     * The focused date.
     */
    focusedValue: DateValue;
    /**
     * The focused date as a Date object.
     */
    focusedValueAsDate: Date;
    /**
     * The focused date as a string.
     */
    focusedValueAsString: string;
    /**
     * Sets the selected date to today.
     */
    selectToday(): void;
    /**
     * Sets the selected date to the given date.
     */
    setValue(values: CalendarDate[]): void;
    /**
     * Sets the focused date to the given date.
     */
    setFocusedValue(value: CalendarDate): void;
    /**
     * Clears the selected date(s).
     */
    clearValue(): void;
    /**
     * Function to open or close the calendar.
     */
    setOpen(open: boolean): void;
    /**
     * Function to set the selected month.
     */
    focusMonth(month: number): void;
    /**
     * Function to set the selected year.
     */
    focusYear(year: number): void;
    /**
     * Returns the months of the year
     */
    getYears(): Cell[];
    /**
     * Returns the years of the decade based on the columns.
     * Represented as an array of arrays of years.
     */
    getYearsGrid(props?: YearGridProps): YearGridValue;
    /**
     * Returns the start and end years of the decade.
     */
    getDecade(): Range<number | undefined>;
    /**
     * Returns the months of the year
     */
    getMonths(props?: MonthFormatOptions): Cell[];
    /**
     * Returns the months of the year based on the columns.
     * Represented as an array of arrays of months.
     */
    getMonthsGrid(props?: MonthGridProps): MonthGridValue;
    /**
     * Formats the given date value based on the provided options.
     */
    format(value: CalendarDate, opts?: Intl.DateTimeFormatOptions): string;
    /**
     * Sets the view of the date picker.
     */
    setView(view: DateView): void;
    /**
     * Goes to the next month/year/decade.
     */
    goToNext(): void;
    /**
     * Goes to the previous month/year/decade.
     */
    goToPrev(): void;
    /**
     * Returns the state details for a given cell.
     */
    getDayTableCellState(props: DayTableCellProps): DayTableCellState;
    /**
     * Returns the state details for a given month cell.
     */
    getMonthTableCellState(props: TableCellProps): TableCellState;
    /**
     * Returns the state details for a given year cell.
     */
    getYearTableCellState(props: TableCellProps): TableCellState;
    getRootProps(): T['element'];
    getLabelProps(props?: LabelProps): T['label'];
    getControlProps(): T['element'];
    getContentProps(): T['element'];
    getPositionerProps(): T['element'];
    getRangeTextProps(): T['element'];
    getTableProps(props?: TableProps): T['element'];
    getTableHeadProps(props?: TableProps): T['element'];
    getTableHeaderProps(props?: TableProps): T['element'];
    getTableBodyProps(props?: TableProps): T['element'];
    getTableRowProps(props?: TableProps): T['element'];
    getDayTableCellProps(props: DayTableCellProps): T['element'];
    getDayTableCellTriggerProps(props: DayTableCellProps): T['element'];
    getMonthTableCellProps(props: TableCellProps): T['element'];
    getMonthTableCellTriggerProps(props: TableCellProps): T['element'];
    getYearTableCellProps(props: TableCellProps): T['element'];
    getYearTableCellTriggerProps(props: TableCellProps): T['element'];
    getNextTriggerProps(props?: ViewProps): T['button'];
    getPrevTriggerProps(props?: ViewProps): T['button'];
    getClearTriggerProps(): T['button'];
    getTriggerProps(): T['button'];
    getPresetTriggerProps(props: PresetTriggerProps): T['button'];
    getViewTriggerProps(props?: ViewProps): T['button'];
    getViewControlProps(props?: ViewProps): T['element'];
    getInputProps(props?: InputProps): T['input'];
    getMonthSelectProps(): T['select'];
    getYearSelectProps(): T['select'];
}

declare function connect<T extends PropTypes>(
    service: DatePickerService,
    normalize: NormalizeProps<T>,
): DatePickerApi<T>;

declare const machine: _zag_js_core.Machine<DatePickerSchema>;

declare function parse(value: string | Date): DateValue;
declare function parse(value: string[] | Date[]): DateValue[];

declare const props: (keyof DatePickerProps)[];
declare const splitProps: <Props extends Partial<DatePickerProps>>(
    props: Props,
) => [Partial<DatePickerProps>, Omit<Props, keyof DatePickerProps>];
declare const inputProps: (keyof InputProps)[];
declare const splitInputProps: <Props extends InputProps>(
    props: Props,
) => [InputProps, Omit<Props, keyof InputProps>];
declare const presetTriggerProps: 'value'[];
declare const splitPresetTriggerProps: <Props extends PresetTriggerProps>(
    props: Props,
) => [PresetTriggerProps, Omit<Props, 'value'>];
declare const tableProps: (keyof TableProps)[];
declare const splitTableProps: <Props extends TableProps>(
    props: Props,
) => [TableProps, Omit<Props, keyof TableProps>];
declare const tableCellProps: (keyof TableCellProps)[];
declare const splitTableCellProps: <Props extends TableCellProps>(
    props: Props,
) => [TableCellProps, Omit<Props, keyof TableCellProps>];
declare const viewProps: 'view'[];
declare const splitViewProps: <Props extends ViewProps>(
    props: Props,
) => [ViewProps, Omit<Props, 'view'>];

export {
    type DatePickerApi as Api,
    type DateView,
    type ElementIds,
    type FocusChangeDetails,
    type InputProps,
    type IntlTranslations,
    type LabelProps,
    type LocaleDetails,
    type DatePickerMachine as Machine,
    type MonthGridProps,
    type OpenChangeDetails,
    type PresetTriggerProps,
    type DatePickerProps as Props,
    type SelectionMode,
    type DatePickerService as Service,
    type TableProps,
    type ValueChangeDetails,
    type ViewChangeDetails,
    type ViewProps,
    type VisibleRangeText,
    type WeekDay,
    type YearGridProps,
    anatomy,
    connect,
    inputProps,
    machine,
    parse,
    presetTriggerProps,
    props,
    splitInputProps,
    splitPresetTriggerProps,
    splitProps,
    splitTableCellProps,
    splitTableProps,
    splitViewProps,
    tableCellProps,
    tableProps,
    viewProps,
};
