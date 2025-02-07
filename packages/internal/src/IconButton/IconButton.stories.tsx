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
    floating: {
        control: 'boolean',
        description: 'If `true`, the button will have a floating look.',
    },
    mini: {
        control: 'boolean',
        description: 'To be used with floating button. If true, the button will be smaller.',
    },
    raised: {
        control: 'boolean',
        description: 'If `true`, the button will have a raised look.',
    },
    warning: {
        control: 'boolean',
        description: 'If `true`, the button will have a warning look.',
    },
    gray: {
        control: 'boolean',
        description: 'If `true`, the button will have gray color.',
    },
    buttonColor: {
        control: 'color',
        description: 'Background for the button.',
    },
    fontColor: {
        control: 'color',
        description: 'Font color for the button.',
    },
    fontSize: {
        control: 'number',
        description: 'Font size for the button.',
    },
    theme: {
        description: 'Additional classes to add',
        table: {
            type: {
                summary:
                    'button, icon, flat, floating, raised, inverse, mini, neutral, accent, primary, bordered',
            },
        },
    },
};

const meta: Meta<typeof IconButton> = {
    title: 'ui kit internal/IconButton',
    component: IconButton,
    argTypes,
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
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
                <Story />
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

export const InverseOnDark: Story = {
    args: {
        icon: '🌙',
        label: 'Dark Mode',
        inverse: true,
        tooltip: 'Toggle dark mode',
    },
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
};

export const CustomTooltipDelay: Story = {
    args: {
        icon: '⏱️',
        label: 'Timer',
        tooltip: 'This tooltip has a 2 second delay',
        tooltipDelay: 300,
        tooltipPosition: 'bottom',
    },
};

export const TooltipWithOffset: Story = {
    args: {
        icon: '📏',
        label: 'Measure',
        tooltip: 'This tooltip has an offset',
        tooltipPosition: 'bottom',
        tooltipOffset: 20,
    },
};

export const NonNeutral: Story = {
    args: {
        icon: '🎨',
        label: 'Theme',
        neutral: false,
        primary: true,
        tooltip: 'Change theme',
    },
};

export const ComplexExample: Story = {
    args: {
        icon: '🚀',
        label: 'Launch',
        primary: true,
        bordered: true,
        tooltip: 'Launch the application',
        tooltipPosition: 'right',
        tooltipDelay: 300,
        tooltipOffset: 10,
        buttonColor: '#6366f1',
        fontColor: '#ffffff',
        fontSize: 16,
        uppercase: true,
    },
};
