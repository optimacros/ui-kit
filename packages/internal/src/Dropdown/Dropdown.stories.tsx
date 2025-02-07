//@ts-nocheck

import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Dropdown, Button, Menu, MenuItem } from '@optimacros-ui/kit-internal';
import { Flex } from '@optimacros-ui/flex';

const argTypes: Partial<ArgTypes> = {
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
    },
    closeOnSelect: {
        control: 'boolean',
        description: 'If `true`, overlay close after select.',
    },
    overlayStyle: {
        control: 'object',
        description: 'Overlay styles.',
    },
    minOverlayWidthMatchTrigger: {
        control: 'boolean',
        description: 'Whether overlay"s width must not be less than trigger"s.',
    },
    arrow: {
        control: 'boolean',
    },
    alignPoint: {
        control: 'boolean',
        description:
            'Popup will align with mouse position (support action of `click`, `hover` and `contextMenu`)',
    },
    visible: {
        control: 'boolean',
        description: 'If `true`, overlay will be visible by default. ',
    },
    trigger: {
        control: 'radio',
        options: ['click', 'hover', 'contextMenu', 'focus'],
        table: {
            defaultValue: { summary: 'hover' },
        },
        description: 'Which actions cause popup shown.',
    },
    showAction: {
        control: 'radio',
        options: ['click', 'hover', 'contextMenu', 'focus'],
        table: {
            defaultValue: { summary: 'hover' },
        },
        description: 'Which actions cause popup shown.',
    },
    hideAction: {
        control: 'radio',
        options: ['click', 'hover', 'contextMenu', 'focus'],
        table: {
            defaultValue: { summary: 'hover' },
        },
        description: 'Which actions cause popup hide.',
    },
    mouseEnterDelay: {
        control: 'number',
        description: 'Delay time to show when mouse enter. Unit: s.',
    },
    mouseLeaveDelay: {
        control: 'number',
        description: 'Delay time to hide when mouse leave. Unit: s.',
    },
    overlay: {
        table: { disable: true },
    },
    className: {
        table: { disable: true },
    },
    overlayClassName: {
        table: { disable: true },
    },
    openClassName: {
        table: { disable: true },
    },
    prefixCls: {
        table: { disable: true },
    },
    transitionName: {
        table: { disable: true },
    },
    autoFocus: {
        table: { disable: true },
    },
    children: {
        table: { disable: true },
    },
    onVisibleChange: {
        table: { disable: true },
    },
    onOverlayClick: {
        table: { disable: true },
    },
    autoDestroy: {
        table: { disable: true },
    },
    animation: {
        table: { disable: true },
    },
    align: {
        table: { disable: true },
    },
    placement: {
        table: { disable: true },
    },
    placements: {
        table: { disable: true },
    },
    builtinPlacements: {
        table: { disable: true },
    },
    getPopupContainer: {
        table: { disable: true },
    },
    onPopupAlign: {
        table: { disable: true },
    },
};

const meta: Meta<typeof Dropdown> = {
    title: 'UI KIT internal/Dropdown',
    // @ts-ignore
    component: Dropdown,
    argTypes,
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [
        (Story) => {
            return (
                <Flex height="200px">
                    <Story />
                </Flex>
            );
        },
    ],
    args: {
        controllable: true,
    },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const OverlayComponent = () => {
    return (
        <div>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
        </div>
    );
};

export const Basic: Story = {
    args: {
        children: <Button label="Users" />,
        closeOnSelect: true,
        overlay: <OverlayComponent />,
        trigger: ['hover'],
    },
};

export const TriggerClick: Story = {
    args: {
        trigger: ['click'],
        children: <Button label="Users" />,
        overlay: (
            <Menu>
                <MenuItem>Item 1</MenuItem>
                <MenuItem>Item 2</MenuItem>
            </Menu>
        ),
    },
};

export const Disabled: Story = {
    args: {
        children: <Button label="Users" />,
        overlay: <OverlayComponent />,
        disabled: true,
    },
};
