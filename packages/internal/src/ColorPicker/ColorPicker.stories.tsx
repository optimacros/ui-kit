import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './';
import * as Stories from './stories';
import { Modal } from '../Modal';
import { Flex } from '@optimacros-ui/flex';

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
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
};
export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Basic: Story = {
    args: {
        title: 'title',
        name: 'name',
        tooltip: 'tooltip',
        tooltipPosition: 'top',
        color: '#999444',
        disableAlpha: true,
        cancelLabel: 'cancel',
        applyLabel: 'apply',
        showSettings: true,
        colorSettingsLabel: 'settings',
        recentColorsLabel: 'recent color',
        presetColors: [
            '#99A0C0',
            '#9AB4E4',
            '#16A8A8',
            '#610CEF',
            '#1240ED',
            '#10FF1E',
            '#12449A',
            '#99A0C0',
            '#9AB4E4',
            '#16A8A8',
            '#610CEF',
            '#1240ED',
            '#10FF1E',
            '#12449A',
        ],
        recentColors: [
            '#FFE9B4',
            '#BF83E0',
            '#1B39E6',
            '#AA4863',
            '#4A0ED8',
            '#06EE74',
            '#DF0150',
            '#FFE9B4',
            '#BF83E0',
            '#1B39E6',
            '#AA4863',
            '#4A0ED8',
            '#06EE74',
            '#DF0150',
        ],
    },
    render: Stories.Basic,
};

export const Disabled: Story = {
    args: {
        disabled: true,
        title: 'title',
        name: 'name',
        tooltip: 'tooltip',
        tooltipPosition: 'top',
        color: '#999444',
        disableAlpha: true,
        cancelLabel: 'cancel',
        applyLabel: 'apply',
        showSettings: true,
        colorSettingsLabel: 'settings',
        recentColorsLabel: 'recent color',
        presetColors: ['#99A0C0', '#9AB4E4', '#16A8A8', '#610CEF', '#1240ED', '#10FF1E', '#12449A'],
        recentColors: ['#FFE9B4', '#BF83E0', '#1B39E6', '#AA4863', '#4A0ED8', '#06EE74', '#DF0150'],
    },
    render: Stories.Basic,
};

export const TitleWithPositionedTooltip: Story = {
    args: { title: 'title', tooltip: 'tooltip content', tooltipPosition: 'top' },
    render: Stories.Tooltip,
};

export const WithModal: Story = {
    args: Basic.args,
    render: (args) => {
        return (
            <Modal isOpen onRequestClose={() => {}}>
                <Flex width="520px" height="520px">
                    <Stories.Basic {...args} />
                </Flex>
            </Modal>
        );
    },
};
