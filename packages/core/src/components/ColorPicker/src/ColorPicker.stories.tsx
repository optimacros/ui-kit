import { ColorPicker } from '.';
import { ComponentProps } from 'react';
import { ArgTypes as ArgTypesType, Meta, StoryObj } from '@storybook/react';
import { Title, Subtitle, Description, Primary, Stories, ArgTypes } from '@storybook/blocks';
import * as scenarios from './__tests__/scenarios';
import * as stories from './stories';

const argTypesRoot: ArgTypesType<
    Omit<ComponentProps<typeof ColorPicker.RootProvider>, 'children'>
> = {
    defaultOpen: {
        control: 'boolean',
        description: 'Whether the color picker is open',
        table: { defaultValue: { summary: 'false' } },
    },
    open: {
        control: 'boolean',
        description: 'Whether the color picker is open',
        table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
        control: false,
        description: 'Handler that is called when the user opens or closes the color picker.',
        table: { type: { summary: '(details: OpenChangeDetails) => void' } },
    },
    closeOnSelect: {
        control: 'boolean',
        description: 'Whether to close the color picker when a swatch is selected',
        table: { defaultValue: { summary: 'false' } },
    },
    value: {
        control: false,
        description: 'The controlled color value of the color picker',
        table: { type: { summary: 'Color' } },
    },
    defaultValue: {
        control: false,
        description: `The initial color value when rendered. Use when you don't need to control the color value of the color picker`,
        table: { type: { summary: 'Color' } },
    },
    onValueChange: {
        control: false,
        description: 'Handler that is called when the value changes, as the user drags.',
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    onValueChangeEnd: {
        control: false,
        description: 'Handler that is called when the user stops dragging.',
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the color picker is disabled',
    },
    readOnly: {
        control: 'boolean',
        description: 'Whether the color picker is read-only',
    },
    format: {
        control: 'select',
        options: ['rgba', 'hsba', 'hsla'],
        description: 'The color format to use',
        table: { defaultValue: { summary: 'rgba' } },
    },
    positioning: {
        control: 'object',
        description: 'The positioning options for the color picker.',
        table: { type: { summary: 'PositioningOptions' } },
    },
    disableAlpha: {
        control: 'boolean',
        description: 'Whather alpha channel is disabled',
        table: { defaultValue: { summary: 'false' } },
    },
};

const argTypesPopover: Partial<ArgTypesType> = {
    eyeDropperIcon: {
        control: 'object',
        description: 'Eye dropper button child',
        table: { type: { summary: 'ReactNode' } },
    },
};

const meta: Meta<typeof ColorPicker.RootProvider> = {
    title: 'Ui kit core/Color Picker',
    argTypes: { ...argTypesRoot, ...argTypesPopover },
    component: ColorPicker.RootProvider,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Subtitle>Root props</Subtitle>
                    <ArgTypes include={Object.keys(argTypesRoot)} />
                    <Subtitle>Popover props</Subtitle>
                    <ArgTypes include={Object.keys(argTypesPopover)} />
                    <Stories />
                </>
            ),
        },
    },
};
export default meta;

type Story = StoryObj<typeof ColorPicker.RootProvider>;

export const Basic: Story = {
    render: stories.Basic,
    play: scenarios.basic,
};

export const Swatches: Story = {
    render: stories.Swatches,
    play: scenarios.swatches,
};

export const FormatHSBA: Story = {
    args: { format: 'hsba', defaultOpen: true },
    render: stories.Basic,
    // 13 пикселей отличаются в 2 случаях из 3
    tags: ['skip-test-runner'],
};

export const Disabled: Story = {
    args: { disabled: true },
    render: stories.Basic,
};

export const ReadOnly: Story = {
    args: { readOnly: true },
    render: stories.Basic,
};

export const DisableAlpha: Story = {
    args: { disableAlpha: true, defaultOpen: true },
    render: stories.Basic,
};

export const Positioning: Story = {
    args: {
        positioning: {
            placement: 'right',
            offset: { mainAxis: 200 },
            gutter: 100,
            shift: 100,
            overlap: true,
        },
        defaultOpen: true,
    },
    render: stories.Basic,
};

export const Original: Story = {
    render: stories.Original,
    tags: ['skip-test-runner'],
};
