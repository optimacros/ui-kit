import { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@optimacros-ui/flex';
import { Button } from '@optimacros-ui/button';
import { Tooltip } from './index';

const meta: Meta<typeof Tooltip> = {
    title: 'UI Kit internal/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
            description: 'Additional CSS class for the tooltip',
        },
        composedComponent: {
            control: 'text',
            description: 'Component to be wrapped with tooltip functionality',
        },
        composedComponentProps: {
            control: 'object',
            description: 'Props to be passed to the composed component',
        },
        onClick: {
            action: 'clicked',
            description: 'Handler called when tooltip is clicked',
        },
        onMouseEnter: {
            action: 'mouseEntered',
            description: 'Handler called when mouse enters tooltip',
        },
        onMouseLeave: {
            action: 'mouseLeft',
            description: 'Handler called when mouse leaves tooltip',
        },
        theme: {
            control: 'object',
            description: 'Theme customization object',
        },
        tooltip: {
            control: 'text',
            description: 'Content to be displayed in the tooltip',
        },
        tooltipDelay: {
            control: 'number',
            description: 'Delay before showing tooltip (in milliseconds)',
            defaultValue: 0,
        },
        tooltipPosition: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Position of the tooltip relative to the component',
            defaultValue: 'top',
        },
        tooltipOffset: {
            control: 'number',
            description: 'Offset of the tooltip from the component',
            defaultValue: 10,
        },
    },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
    args: {
        tooltip: 'This is a tooltip',
        children: <Button variant="primary">Hover me</Button>,
    },
};

export const LongText: Story = {
    args: {
        tooltip:
            'The disease was diagnosed as pseudopseudohypoparathyroidism, a rare genetic disorder',
        children: <Button variant="primary">Hover me</Button>,
    },
};

export const ShortText: Story = {
    args: {
        tooltip: '-',
        children: <Button variant="primary">Hover me</Button>,
    },
};

export const Positions: Story = {
    render: () => (
        <Flex direction="column" gap="4" align="center" style={{ margin: '60px 0' }}>
            <Tooltip tooltip="Top tooltip" tooltipPosition="top">
                <Button variant="primary">Top Position</Button>
            </Tooltip>
            <Tooltip tooltip="Bottom tooltip" tooltipPosition="bottom">
                <Button variant="primary">Bottom Position</Button>
            </Tooltip>
            <Tooltip tooltip="Left tooltip" tooltipPosition="left">
                <Button variant="primary">Left Position</Button>
            </Tooltip>
            <Tooltip tooltip="Right tooltip" tooltipPosition="right">
                <Button variant="primary">Right Position</Button>
            </Tooltip>
            <Tooltip tooltip="Horizontal tooltip" tooltipPosition="horizontal">
                <Button variant="primary">Horizontal Position</Button>
            </Tooltip>
            <Tooltip tooltip="Vertical tooltip" tooltipPosition="vertical">
                <Button variant="primary">Vertical Position</Button>
            </Tooltip>
        </Flex>
    ),
};

export const Delay: Story = {
    args: {
        tooltip: 'Delayed tooltip',
        tooltipDelay: 1000,
        children: <Button variant="primary">Hover me</Button>,
    },
};

export const CustomOffset: Story = {
    args: {
        tooltip: 'Offset tooltip',
        tooltipOffset: 20,
        children: <Button variant="primary">Hover me</Button>,
    },
};

export const CustomComponent: Story = {
    args: {
        tooltip: 'Custom component tooltip',
        composedComponent: 'div',
        composedComponentProps: {
            style: { padding: '10px', border: '1px solid blue', display: 'inline-block' },
        },
        children: 'Hover over this div',
    },
};
