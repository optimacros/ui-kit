import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Calendar } from './index';

const argTypes: Partial<ArgTypes> = {
    autoOk: {
        control: 'boolean',
    },
    active: {
        control: 'boolean',
    },
    cancelLabel: {
        control: 'string',
    },
    locale: {
        control: 'string',
    },
    maxDate: {
        control: Date,
    },
    minDate: {
        control: Date,
    },
    value: {
        control: Date,
    },
    name: {
        control: 'string',
    },
    okLabel: {
        control: 'string',
    },
    sundayFirstDayOfWeek: {
        control: 'boolean',
    },
};

const meta: Meta<typeof Calendar> = {
    title: 'UI Kit main/CalendarV2',
    component: Calendar,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const Basic: Story = {
    args: {
        active: true,
        autoOk: false,
        cancelLabel: 'cancel',
        locale: 'ru',
        name: 'calendar',
        okLabel: 'okLabel',
        sundayFirstDayOfWeek: false,
    },
};
