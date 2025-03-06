import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Flex } from '@optimacros-ui/flex';
import { Button } from './index';

const argTypes: Partial<ArgTypes> = {
    accent: {
        control: 'boolean',
        description: 'If `true`, the button will have an accent color.',
    },
    primary: {
        control: 'boolean',
        description: 'If `true`, the button will have a primary color.',
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
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
    },
    warning: {
        control: 'boolean',
        description: 'If `true`, the button will have a warning look.',
    },
    inverse: {
        control: 'boolean',
        description:
            'If `true`, the neutral colors are inverted. Useful to put a button over a dark background.',
    },
    gray: {
        control: 'boolean',
        description: 'If `true`, the button will have gray color.',
    },
    bordered: {
        control: 'boolean',
        description: 'If `true`, the button will have border.',
    },
    neutral: {
        control: 'boolean',
        description: "Set it to `false` if you don't want the neutral styles to be included.",
    },
    uppercase: {
        control: 'boolean',
        description: 'If `true`, the text inside the button will be in uppercase.    ',
    },
    href: {
        control: 'text',
        description:
            'The URL to link to when the button is clicked. ' +
            'If defined, an `a` element will be used as the root node.',
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
    icon: {
        control: 'text',
        description: 'Overwritten description.',
    },
    target: {
        control: 'text',
        description: 'The `target` attribute value for link button.',
    },
    label: {
        control: 'text',
        description: 'The text string to use for the name of the button.',
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

export const argTypesTheme: Partial<ArgTypes> = {
    button: {
        control: false,
        description: 'Button root element',
    },
    icon: {
        control: false,
        description: 'Button icon element',
    },
    flat: {
        control: false,
        description: 'Use when the button is flat',
    },
    floating: {
        control: false,
        description: 'Use when the button is floating',
    },
    raised: {
        control: false,
        description: 'Use when the button is raised',
    },
    inverse: {
        control: false,
        description: 'Use when the button is inverted',
    },
    mini: {
        control: false,
        description: 'Use for mini floating button',
    },
    neutral: {
        control: false,
        description: 'Use for neutral colored button',
    },
    accent: {
        control: false,
        description: 'Use when the button is neutral and accent',
    },
    primary: {
        control: false,
        description: 'Use when the button is neutral and primary',
    },
    bordered: {
        control: false,
        description: 'Use when the button is neutral and bordered',
    },
};

const meta: Meta<typeof Button> = {
    title: 'UI kit internal/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: { ...argTypes /*, ...argTypesTheme*/ },
    excludeStories: ['argTypesTheme'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        label: 'Button',
    },
};

export const Primary: Story = {
    args: {
        label: 'Primary Button',
        primary: true,
    },
};

export const Accent: Story = {
    args: {
        label: 'Accent Button',
        accent: true,
    },
};

export const FloatingMini: Story = {
    args: {
        label: '+',
        floating: true,
        mini: true,
    },
};

export const Raised: Story = {
    args: {
        label: 'Raised Button',
        raised: true,
    },
};

export const Warning: Story = {
    args: {
        label: 'Warning Button',
        warning: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Button',
        disabled: true,
    },
};

export const InverseOnDark: Story = {
    args: {
        label: 'Inverse Button',
        inverse: true,
    },
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
};

export const GrayBordered: Story = {
    args: {
        label: 'Gray Bordered Button',
        gray: true,
        bordered: true,
    },
};

export const CustomStyles: Story = {
    args: {
        label: 'Custom Button',
        buttonColor: '#6366f1',
        fontColor: '#ffffff',
        fontSize: 16,
        uppercase: true,
    },
};

export const LinkButton: Story = {
    args: {
        label: 'Link Button',
        href: 'https://example.com',
        target: '_blank',
    },
};

export const IconButton: Story = {
    args: {
        label: 'Icon Button',
        icon: '👋',
    },
};

export const iconPosition: Story = {
    args: {
        icon: 'check',
        label: 'Ok',
        bordered: true,
    },
    render: (props) => {
        return (
            <Flex gap={10}>
                <Flex direction="column" gap={3}>
                    <b>Left:</b>
                    <Button {...props} iconPosition="left" />
                </Flex>
                <Flex direction="column" gap={3}>
                    <b>Right:</b>
                    <Button {...props} />
                </Flex>
            </Flex>
        );
    },
};

export const AllFeatures: Story = {
    render(props) {
        return (
            <>
                <Button {...props} />
                <style>
                    {`.custom-buttom-class {
                        border-radius: 1px !important;
                        background: beige !important;
                    }`}
                </style>
            </>
        );
    },
    args: {
        label: 'Kitchen Sink',
        primary: true,
        raised: true,
        bordered: true,
        fontSize: 14,
        icon: '🚀',
        theme: {
            button_uppercase: 'uppercase',
            Button: 'custom-buttom-class',
        },
    },
};
