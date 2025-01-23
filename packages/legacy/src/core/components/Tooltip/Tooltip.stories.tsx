import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { Tooltip } from './Tooltip.tsx';
import { Button } from '../Button';

const argTypes: Partial<ArgTypes> = {
    composedComponent: {
        control: 'text',
        description: 'Tooltip reference element.',
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
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    theme: { table: { disable: true } },
    onClick: { table: { disable: true } },
    onMouseEnter: { table: { disable: true } },
    onMouseLeave: { table: { disable: true } },
};

const meta: Meta<typeof Tooltip> = {
    title: 'legacy/Tooltip',
    component: Tooltip,
    argTypes,
    tags: ['skip-test-runner'],
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ marginLeft: '100px' }}>{children}</div>
);

export const Basic: Story = {
    args: {
        composedComponent: 'div',
        tooltip: 'Tooltip text',
        tooltipPosition: 'left',
        tooltipDelay: 50,
        tooltipOffset: 0,
        // @ts-ignore
        children: <Button label="Left" />,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};

export const Component: Story = {
    args: {
        composedComponent: Button,
        composedComponentProps: { label: 'Apply', accent: true },
        tooltip: 'Tooltip text',
        tooltipDelay: 50,
        tooltipPosition: 'bottom',
        tooltipOffset: 0,
    },
    argTypes: {
        ...argTypes,
        composedComponent: {
            table: {
                disable: true,
            },
        },
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};
