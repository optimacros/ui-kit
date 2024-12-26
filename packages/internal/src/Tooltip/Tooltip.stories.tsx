import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './index';
import { Button } from '@optimacros-ui/button';

const argTypes: Partial<ArgTypes> = {
    composedComponent: {
        control: 'text',
        description: 'Tooltip reference element.',
        table: {
            type: { summary: 'HTMLElementTagNameMap | React.FC | React.ComponentClass' },
        },
    },
    composedComponentProps: {
        control: 'object',
        description: 'Props to composed component.',
    },
    tooltip: {
        control: 'text',
        description: 'The text string to use for the tooltip.',
    },
    tooltipDelay: {
        control: 'number',
        description: 'Amount of time in milliseconds spent before the tooltip is visible.',
        table: {
            defaultValue: { summary: '0' },
        },
    },
    tooltipPosition: {
        control: 'radio',
        options: ['vertical', 'horizontal', 'bottom', 'top', 'left', 'right'],
        table: { defaultValue: { summary: 'vertical' } },
        description:
            'Determines the position of the tooltip. It can be automatic with `vertical` and `horizontal` values or forced with `bottom`, `top`, `left` or `right`.',
    },
    tooltipOffset: {
        control: 'number',
        description:
            ' If `tooltipPosition` - `vertical`, `bottom` or `top`, the tooltip moves relative to its axis.',
        table: { defaultValue: { summary: '0' } },
    },
    theme: {
        control: 'object',
        description: 'A set of classes for different parts and states of the component',
        table: {
            type: {
                summary: `{ tooltip: 'Added to the tooltip element wrapper',
 tooltipActive: 'Added to the root when the tooltip is active',
 tooltipInner: 'Added to the inner element which sets the background, font and rounded borders',
 tooltipBottom: 'Added to the root in case the tooltip is being positioned at bottom',
 tooltipLeft: 'Added to the root in case the tooltip is being positioned at left',
 tooltipRight: 'Added to the root in case the tooltip is being positioned at right',
 tooltipTop: 'Added to the root in case the tooltip is being positioned at top' }`,
            },
        },
    },
    onClick: {
        control: false,
        description: 'Callback to be invoked when Component is clicked',
        table: {
            type: { summary: 'MouseEventHandler<HTMLElement>' },
        },
    },
    onMouseEnter: {
        control: false,
        description: 'Callback called when the mouse enters the Component',
        table: {
            type: { summary: 'MouseEventHandler<HTMLElement>' },
        },
    },
    onMouseLeave: {
        control: false,
        description: 'Callback called when the mouse leaves the Component',
        table: {
            type: { summary: 'MouseEventHandler<HTMLElement>' },
        },
    },
};

const meta: Meta<typeof Tooltip> = {
    title: 'UI Kit internal/Tooltip',
    component: Tooltip,
    argTypes,
    parameters: {
        docs: {
            description: {
                component: `A Tooltip is useful to show information on hover in any kind of component. We have a component that can be used as a **decorator** for any kind of component. Also, it's factory function is exposed so you can create your own decorator with specific properties.`,
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
    args: {
        tooltip: 'Basic',
        children: <Button variant="accent">button</Button>,
    },
};

export const Componnent: Story = {
    args: {
        tooltip: 'Component',
        composedComponent: Button,
        composedComponentProps: { children: 'composedComponentProps/children', variant: 'accent' },
        children: 'children that wont pass since there are children in composedComponentProps',
    },
};

export const Offset: Story = {
    args: {
        tooltip: 'Component',
        composedComponent: Button,
        composedComponentProps: { children: 'composedComponentProps/children', variant: 'accent' },
        tooltipOffset: 100,
    },
};
