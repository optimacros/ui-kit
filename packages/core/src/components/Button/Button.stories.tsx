import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Button } from './src/index';
import { Icon } from '../Icon';

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
    children: {
        control: 'text',
        description: 'The text string to use for the name of the button.',
    },
    theme: { table: { disable: true } },
};

const meta: Meta<typeof Button> = {
    title: 'UI Kit core/ButtonV2',
    component: Button,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Accent: Story = {
    args: {
        renderIcon: () => {
            return <Icon value="bookmark" />;
        },
        children: 'bookmark',
        variant: 'accent',
    },
};

export const Bordered: Story = {
    args: {
        children: 'Apply',
        variant: 'bordered',
    },
};

export const Primary: Story = {
    args: {
        children: 'Apply',
        variant: 'primary',
    },
};

export const Flat: Story = {
    args: {
        renderIcon: () => {
            return <Icon value="inbox" />;
        },
        float: 'flat',
        children: 'Inbox',
    },
};

export const Floating: Story = {
    args: {
        renderIcon: () => {
            return <Icon value="inbox" />;
        },
        float: 'floating',
    },
};

export const Mini: Story = {
    args: {
        renderIcon: () => {
            return <Icon value="add" />;
        },
        float: 'floating',
        variant: 'neutral',
        size: 'xs',
    },
};

export const Raised: Story = {
    args: {
        children: 'Next',
        float: 'raised',
    },
};

export const Uppercase: Story = {
    args: {
        children: 'Apply',
        uppercase: true,
    },
};

export const Disabled: Story = {
    args: {
        renderIcon: () => {
            return <Icon value="add" className="size-auto" />;
        },
        children: 'Add this',
        disabled: true,
        variant: 'accent',
    },
};

export const Gray: Story = {
    args: {
        children: 'Cancel',
    },
};

export const Warning: Story = {
    args: {
        children: 'Delete',
        status: 'warning',
    },
};

export const Inverse: Story = {
    args: {
        children: 'Delete',
        inverse: true,
    },
};

export const Link: Story = {
    args: {
        href: 'http://github.com/',
        target: '_blank',
        variant: 'accent',
        children: 'Github',
    },
};
