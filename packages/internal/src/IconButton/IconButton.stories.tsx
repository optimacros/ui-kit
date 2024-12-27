import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { IconButton } from './index';

const argTypes: Partial<ArgTypes> = {
    icon: {
        control: 'text',
        description: 'Value of the icon (See Font Icon Component).',
    },
    type: {
        table: {
            defaultValue: { summary: 'button' },
        },
        control: 'text',
        description: 'Component root container type.',
    },
    href: {
        control: 'text',
        description:
            'The URL to link to when the button is clicked. ' +
            'If defined, an `a` element will be used as the root node.',
    },
    target: {
        control: 'text',
        description: 'The `target` attribute value for link button.',
    },
    label: {
        control: 'text',
        description: 'The text string to use for the name of the button.',
    },
    accent: {
        control: 'boolean',
        description: 'If `true`, the button will have an accent color.',
    },
    primary: {
        control: 'boolean',
        description: 'If `true`, the button will have a primary color.',
    },
    inverse: {
        control: 'boolean',
        description:
            'If `true`, the neutral colors are inverted. Useful to put a button over a dark background.',
    },
    bordered: {
        control: 'boolean',
        description: 'If `true`, the button will have border.',
    },
    neutral: {
        control: 'boolean',
        description: "Set it to `false` if you don't want the neutral styles to be included.",
    },
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
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
    children: {
        table: { disable: true },
    },
    onMouseEnter: {
        table: { disable: true },
    },
    onMouseLeave: {
        table: { disable: true },
    },
    onMouseUp: {
        table: { disable: true },
    },
    gray: {
        table: { disable: true },
    },
    warning: {
        table: { disable: true },
    },
    uppercase: {
        table: { disable: true },
    },
    mini: {
        table: { disable: true },
    },
    flat: {
        table: { disable: true },
    },
    floating: {
        table: { disable: true },
    },
    raised: {
        table: { disable: true },
    },
    buttonColor: {
        table: { disable: true },
    },
    fontColor: {
        table: { disable: true },
    },
    fontSize: {
        table: { disable: true },
    },
};

const meta: Meta<typeof IconButton> = {
    title: 'ui kit internal/IconButton',
    component: IconButton,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Accent: Story = {
    args: {
        icon: 'bookmark',
        accent: true,
    },
};

export const Bordered: Story = {
    args: {
        icon: 'favorite',
        bordered: true,
    },
};

export const Primary: Story = {
    args: {
        icon: 'favorite',
        primary: true,
    },
};

export const Inverse: Story = {
    args: {
        icon: 'favorite',
        inverse: true,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <div style={{ backgroundColor: 'black', width: 'fit-content', borderRadius: '4px' }}>
                {Story()}
            </div>
        ),
    ],
};

export const Disabled: Story = {
    args: {
        icon: 'favorite',
        disabled: true,
    },
};

export const Link: Story = {
    args: {
        icon: 'link',
        href: 'http://github.com/',
        target: '_blank',
        accent: true,
        label: 'Github',
    },
};

export const WithTooltip: Story = {
    args: {
        icon: 'favorite',
        tooltip: 'Like',
        tooltipDelay: 50,
        tooltipPosition: 'right',
        tooltipOffset: 0,
    },
};
