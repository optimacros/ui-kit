//@ts-nocheck
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { ButtonMenu, MenuItem, SubMenu } from '@optimacros-ui/kit-internal';

const argTypes: Partial<ArgTypes> = {
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
    },
    visible: {
        control: 'boolean',
        description: ' If `true`, the Menu Dropdown will be visible by default.',
    },
    uppercase: {
        control: 'boolean',
        description: 'If `true`, the text inside the ButtonMenu will be in uppercase.',
    },
    showOnlyIcon: {
        control: 'boolean',
        description: 'If `true` and icon used - only icon will be visible in the ButtonMenu.',
    },
    arrowUp: {
        control: 'boolean',
        description: 'If `true`, dropdown arrow icon will point up.',
    },
    label: {
        control: 'text',
        description: 'The text string to use for the name of the button.',
    },
    icon: {
        control: 'text',
        description: 'Value of the icon (See Font Icon Component).',
    },
    tooltip: {
        control: 'text',
        description: 'The text string to use for the tooltip.',
    },
    tooltipDelay: {
        control: 'number',
        description: 'Amount of time in milliseconds spent before the tooltip is visible.',
    },
    tooltipPosition: {
        control: 'radio',
        options: ['vertical', 'horizontal', 'bottom', 'top', 'left', 'right'],
        table: {
            defaultValue: { summary: 'vertical' },
        },
        description: 'Determines the position of the tooltip.',
    },
    tooltipOffset: {
        control: 'number',
        description:
            ' If `tooltipPosition` - `vertical`, `bottom` or `top`, the tooltip moves relative to its axis.',
    },
    className: {
        table: { disable: true },
    },
    theme: {
        table: { disable: true },
    },
    menuRootContainerClassName: {
        table: { disable: true },
    },
    classNameDropdownContainer: {
        table: { disable: true },
    },
    onVisibleChange: {
        table: { disable: true },
    },
    dataName: {
        table: { disable: true },
    },
    children: {
        table: { disable: true },
    },
};

const meta: Meta<typeof ButtonMenu> = {
    title: 'UI KIT internal/ButtonMenu',
    component: ButtonMenu,
    argTypes,
    tags: ['skip-test-runner'],
};
export default meta;

type Story = StoryObj<typeof ButtonMenu>;

export const Basic: Story = {
    args: {
        label: 'Menu',
        icon: 'print',
        arrowUp: false,
        children: [
            <SubMenu label="2" key="2">
                <MenuItem key={1}>
                    <span>Option</span>
                </MenuItem>
                <MenuItem key={2}>
                    <span>Option</span>
                </MenuItem>
            </SubMenu>,
        ],
    },
};

export const Uppercase: Story = {
    args: {
        label: 'Menu',
        uppercase: true,
        children: [
            <MenuItem key={1}>
                <span>Option</span>
            </MenuItem>,
            <MenuItem key={2}>
                <span>Option</span>
            </MenuItem>,
        ],
    },
};

export const WithTooltip: Story = {
    args: {
        label: 'Menu',
        tooltip: 'Tooltip text',
        tooltipDelay: 50,
        tooltipPosition: 'bottom',
        tooltipOffset: 0,
        children: [
            <MenuItem key={1}>
                <span>Option</span>
            </MenuItem>,
            <MenuItem key={2}>
                <span>Option</span>
            </MenuItem>,
        ],
    },
};

export const Disabled: Story = {
    args: {
        label: 'Menu',
        disabled: true,
        children: [
            <MenuItem key={1}>
                <span>Option</span>
            </MenuItem>,
            <MenuItem key={2}>
                <span>Option</span>
            </MenuItem>,
        ],
    },
};

export const Visible: Story = {
    args: {
        label: 'Menu',
        visible: true,
        children: [
            <MenuItem key={1}>
                <span>Option</span>
            </MenuItem>,
            <MenuItem key={2}>
                <span>Option</span>
            </MenuItem>,
        ],
    },
};
