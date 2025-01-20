import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './';
import * as Stories from './stories';

const argTypes: Partial<ArgTypes> = {
    color: {
        control: 'text',
        description: 'Selected color as hex string or `ColorFormat` (`{ hex: string }`)',
        table: {
            type: { summary: 'string | ColorFormat' },
            defaultValue: { summary: '#000000' },
        },
    },
    onChange: {
        control: false,
        description: 'Callback fired on color change',
        table: {
            type: { summary: `(newColor: ColorFormat) => void` },
        },
        required: true,
    },
    disabled: {
        control: 'boolean',
        description: 'Whether component is disabled',
        table: {
            defaultValue: { summary: 'false' },
        },
    },
    title: {
        control: 'text',
        description: 'Field title',
        table: {
            type: { summary: 'ReactNode' },
        },
    },
    name: {
        control: 'text',
        description: 'Value for button data-name attribute',
    },
    tooltip: {
        control: 'text',
        description: 'Content for tooltip that appears on `title`',
        table: {
            type: { summary: 'ReactNode' },
        },
    },
    tooltipPosition: {
        control: 'radio',
        options: ['vertical', 'horizontal', 'bottom', 'top', 'left', 'right'],
        table: {
            defaultValue: { summary: 'vertical' },
            type: { summary: `bottom | horizontal | left | right | top | vertical` },
        },
        description: 'Determines the position of the `tooltip` that appears on `title`',
    },
};

const meta: Meta<typeof ColorPicker> = {
    title: 'UI-Kit Internal/ColorPicker',
    component: ColorPicker,
    argTypes,
    parameters: {
        docs: {
            description: {
                component: `A component that allows to pick a color in hex format`,
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Basic: Story = {
    args: { name: 'name', color: '#999444' },
    render: Stories.Basic,
};

export const Disabled: Story = {
    args: { disabled: true },
    render: Stories.Basic,
};

export const TitleWithPositionedTooltip: Story = {
    args: { title: 'title', tooltip: 'tooltip content', tooltipPosition: 'top' },
    render: Stories.Tooltip,
};
