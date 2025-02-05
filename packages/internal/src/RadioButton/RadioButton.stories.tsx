//@ts-nocheck

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@optimacros-ui/flex';
import { RadioButton } from '.';

const meta: Meta<typeof RadioButton> = {
    title: 'UI Kit internal/RadioButton',
    component: RadioButton,
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'The controlled checked state of the radio button',
        },
        children: {
            control: false,
            description: 'The content to be rendered inside the radio button',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes to apply',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the radio button is disabled',
            defaultValue: false,
        },
        label: {
            control: 'text',
            description: 'Label text or node to display next to radio button',
        },
        name: {
            control: 'text',
            description: 'Name attribute of the input element',
        },
        onBlur: {
            action: 'blurred',
            description: 'Handler called when input loses focus',
        },
        onClick: {
            action: 'clicked',
            description: 'Handler called when checkbox is clicked',
        },
        onChange: {
            action: 'changed',
            description: 'Handler called when checkbox value changes',
        },
        onFocus: {
            action: 'focused',
            description: 'Handler called when input receives focus',
        },
        onMouseEnter: {
            action: 'mouseEntered',
            description: 'Handler called when mouse enters radio button',
        },
        onMouseLeave: {
            action: 'mouseLeft',
            description: 'Handler called when mouse leaves radio button',
        },
        theme: {
            control: 'object',
            description: 'Theme customization object',
        },
        value: {
            control: 'text',
            description: 'Value attribute of the input element',
        },
    },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Basic: Story = {
    args: { name: 'basic', value: 'option', label: 'Option' },
};

export const WithChildren: Story = {
    args: {
        name: 'withChildren',
        value: 'withChildren',
        children: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span>👤</span>
                <span>Custom label</span>
            </div>
        ),
    },
};

export const Checked: Story = {
    args: {
        name: 'checked',
        value: 'checked',
        label: 'Checked Option',
        checked: true,
    },
};

export const Disabled: Story = {
    render: () => (
        <Flex direction="column" gap="2">
            <RadioButton name="disabled" value="option1" label="Disabled Unchecked" disabled />
            <RadioButton
                name="disabled"
                value="option2"
                label="Disabled Checked"
                disabled
                checked
            />
        </Flex>
    ),
};

const RadioGroupState = () => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleChange = (selectedValue: string) => {
        setSelectedValue(selectedValue);
    };

    return (
        <Flex direction="column" gap="2">
            <RadioButton
                name="group"
                value="option1"
                label="Option 1"
                checked={selectedValue === 'option1'}
                onChange={() => handleChange('option1')}
            />
            <RadioButton
                name="group"
                value="option2"
                label="Option 2"
                checked={selectedValue === 'option2'}
                onChange={() => handleChange('option2')}
            />
            <RadioButton
                name="group"
                value="option3"
                label="Option 3"
                checked={selectedValue === 'option3'}
                onChange={() => handleChange('option3')}
            />
        </Flex>
    );
};

export const RadioGroup: Story = {
    render: () => <RadioGroupState />,
};

const EventsState = () => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [lastEvent, setLastEvent] = useState<string | null>(null);

    const handleChangeValue = (selectedValue: string) => {
        setSelectedValue(selectedValue);
    };

    const handleChangeEvent = (lastEvent: string) => {
        setLastEvent(lastEvent);
    };

    const eventsProps = {
        onFocus: () => handleChangeEvent('Focused'),
        onBlur: () => handleChangeEvent('Blurred'),
        onMouseEnter: () => handleChangeEvent('Mouse Enter'),
        onMouseLeave: () => handleChangeEvent('Mouse Leave'),
    };

    return (
        <Flex gap={4} direction="column">
            <Flex gap={2}>Last event: {lastEvent} </Flex>
            <Flex direction="column" gap="2">
                <RadioButton
                    {...eventsProps}
                    name="group"
                    value="option1"
                    label="Option 1"
                    checked={selectedValue === 'option1'}
                    onChange={() => handleChangeValue('option1')}
                />
                <RadioButton
                    {...eventsProps}
                    name="group"
                    value="option2"
                    label="Option 2"
                    checked={selectedValue === 'option2'}
                    onChange={() => handleChangeValue('option2')}
                />
            </Flex>
        </Flex>
    );
};

export const WithEvents: Story = {
    render: () => <EventsState />,
};
