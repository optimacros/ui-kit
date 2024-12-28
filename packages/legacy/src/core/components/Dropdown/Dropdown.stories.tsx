import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './index';
import { Button } from '../Button';

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
    title: 'legacy/Dropdown',
    // @ts-ignore
    component: Dropdown,
    argTypes,
    parameters: {
        docs: {
            description: {
                component:
                    'Ui-kit using `rc-dropdown`. You can read more ' +
                    'at the [link](https://github.com/react-component/dropdown).',
            },
        },
    },
};

export default meta;

// todo - fix ts
type Story = StoryObj<typeof Dropdown>;
// type Story = any

const OverlayComponent = () => {
    return (
        <div>
            <div>Item 1</div>
            <div>Item 2</div>
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
        overlay: <OverlayComponent />,
    },
};

export const Disabled: Story = {
    args: {
        children: <Button label="Users" />,
        overlay: <OverlayComponent />,
        disabled: true,
    },
};

export const Visible: Story = {
    args: {
        children: <Button label="Users" />,
        overlay: <OverlayComponent />,
        visible: true,
        trigger: ['hover'],
    },
};
