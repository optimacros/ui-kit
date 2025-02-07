import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '.';
import { useState } from 'react';
import './stories.css';

const meta: Meta<typeof Calendar> = {
    title: 'Ui Kit internal/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A flexible calendar component supporting various configurations and interactions.',
            },
        },
    },
    tags: ['autodocs', 'skip-test-runner'],
    argTypes: {
        active: {
            control: 'boolean',
            description: 'Controls whether the calendar is active/visible',
        },
        autoOk: {
            control: 'boolean',
            description: 'Automatically confirm date selection',
        },
        cancelLabel: {
            control: 'text',
            description: 'Custom label for cancel button',
        },
        okLabel: {
            control: 'text',
            description: 'Custom label for OK button',
        },
        locale: {
            control: 'text',
            description: 'Locale for date formatting',
        },
        sundayFirstDayOfWeek: {
            control: 'boolean',
            description: 'Set Sunday as first day of week',
        },
    },
    decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Basic Calendar Story
export const Default: Story = {
    args: {
        active: true,
        value: new Date(),
    },
};

// Calendar with Custom Button Labels
export const CustomLabels: Story = {
    args: {
        active: true,
        okLabel: 'Confirm',
        cancelLabel: 'Close',
        value: new Date(),
    },
};

// Calendar with Auto-OK Enabled
export const AutoConfirm: Story = {
    args: {
        active: true,
        autoOk: true,
        value: new Date(),
    },
};

// Calendar with Different Locale
export const LocalizedCalendar: Story = {
    args: {
        active: true,
        locale: 'fr-FR',
        value: new Date(),
    },
};

// Calendar with Sunday as First Day
export const SundayFirst: Story = {
    args: {
        active: true,
        sundayFirstDayOfWeek: true,
        value: new Date(),
    },
};

// Calendar with Date Restrictions
export const DateRestrictions: Story = {
    args: {
        active: true,
        minDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        value: new Date(),
    },
};

// Calendar with Disabled Dates
export const DisabledDates: Story = {
    args: {
        active: true,
        disabledDates: [
            new Date(new Date().setDate(new Date().getDate() + 1)),
            new Date(new Date().setDate(new Date().getDate() + 2)),
            new Date(new Date().setDate(new Date().getDate() + 3)),
        ],
        value: new Date(),
    },
};

// Calendar with Enabled Dates Only
export const EnabledDatesOnly: Story = {
    args: {
        active: true,
        enabledDates: [
            new Date(),
            new Date(new Date().setDate(new Date().getDate() + 5)),
            new Date(new Date().setDate(new Date().getDate() + 10)),
        ],
        value: new Date(),
    },
};

// Calendar with Custom Theme
export const CustomTheme: Story = {
    args: {
        active: true,
        value: new Date(),
        theme: {
            wrapper: 'custom-calendar-wrapper',
            header: 'custom-calendar-header',
            button: 'custom-calendar-button',
            date: 'custom-calendar-date',
            monthsDisplay: 'custom-months-display',
            yearsDisplay: 'custom-years-display',
            navigation: 'custom-navigation',
        },
    },
};

// Interactive Calendar with Event Handling
export const InteractiveCalendar: Story = {
    render: () => {
        const [selectedDate, setSelectedDate] = useState<Date>(new Date());
        const [isOpen, setIsOpen] = useState(true);

        const handleSelect = (date: Date) => {
            setSelectedDate(date);
            console.info('Selected date:', date);
        };

        const handleDismiss = () => {
            setIsOpen(false);
            setTimeout(() => setIsOpen(true), 1000);
        };

        return (
            <div className="calendar-demo">
                <div className="selected-date">Selected: {selectedDate.toLocaleDateString()}</div>
                {isOpen && (
                    <Calendar
                        active={true}
                        value={selectedDate}
                        onSelect={handleSelect}
                        onDismiss={handleDismiss}
                        okLabel="Select"
                        cancelLabel="Cancel"
                    />
                )}
            </div>
        );
    },
};

// Date Range Selection Calendar
export const DateRangeCalendar: Story = {
    render: () => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);
        const [selecting, setSelecting] = useState<'start' | 'end'>('start');

        const handleSelect = (date: Date) => {
            if (selecting === 'start') {
                setStartDate(date);
                setSelecting('end');
            } else {
                setEndDate(date);
                setSelecting('start');
            }
        };

        const getHighlightedDates = () => {
            if (!startDate || !endDate) return [];

            const dates: Date[] = [];
            const currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;
        };

        return (
            <div className="calendar-range-demo">
                <div className="date-range-info">
                    <div>Start: {startDate?.toLocaleDateString() || 'Not selected'}</div>
                    <div>End: {endDate?.toLocaleDateString() || 'Not selected'}</div>
                    <div>Selecting: {selecting} date</div>
                </div>
                <Calendar
                    active={true}
                    value={selecting === 'start' ? startDate || new Date() : endDate || new Date()}
                    onSelect={handleSelect}
                    enabledDates={getHighlightedDates()}
                    theme={{
                        date: 'range-calendar-date',
                        wrapper: 'range-calendar-wrapper',
                    }}
                />
            </div>
        );
    },
};

// Multi-Month Calendar View
export const MultiMonthCalendar: Story = {
    render: () => {
        const [selectedDate, setSelectedDate] = useState<Date>(new Date());

        return (
            <div className="multi-month-calendar">
                <div className="calendar-grid">
                    {[0, 1, 2].map((monthOffset) => {
                        const monthDate = new Date(selectedDate);
                        monthDate.setMonth(monthDate.getMonth() + monthOffset);

                        return (
                            <Calendar
                                key={monthOffset}
                                active={true}
                                value={monthDate}
                                onSelect={setSelectedDate}
                                autoOk={true}
                                theme={{
                                    wrapper: 'mini-calendar-wrapper',
                                    header: 'mini-calendar-header',
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        );
    },
};

// Event Calendar
export const EventCalendar: Story = {
    render: () => {
        const [selectedDate, setSelectedDate] = useState<Date>(new Date());

        const events = [
            { date: new Date(), title: 'Meeting' },
            { date: new Date(new Date().setDate(new Date().getDate() + 2)), title: 'Lunch' },
            { date: new Date(new Date().setDate(new Date().getDate() + 5)), title: 'Conference' },
        ];

        const getEventForDate = (date: Date) =>
            events.find((event) => event.date.toDateString() === date.toDateString());

        return (
            <div className="event-calendar">
                <Calendar active={true} value={selectedDate} onSelect={setSelectedDate} />
                <div className="event-details">
                    {getEventForDate(selectedDate) && (
                        <div className="event-info">
                            Event: {getEventForDate(selectedDate)?.title}
                        </div>
                    )}
                </div>
            </div>
        );
    },
};
