import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Button } from './index.tsx';

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
    theme: { table: { disable: true } },
};

const meta: Meta<typeof Button> = {
    title: 'legacy/Button',
    component: Button,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Accent: Story = {
    args: {
        icon: 'bookmark',
        label: 'Bookmark',
        accent: true,
    },
};

export const Bordered: Story = {
    args: {
        label: 'Apply',
        bordered: true,
    },
};

export const Primary: Story = {
    args: {
        label: 'Apply',
        primary: true,
    },
};

export const Flat: Story = {
    args: {
        icon: 'inbox',
        label: 'Inbox',
    },
};

export const Floating: Story = {
    args: {
        icon: 'add',
        floating: true,
    },
};

export const Mini: Story = {
    args: {
        icon: 'add',
        floating: true,
        mini: true,
    },
};

export const Raised: Story = {
    args: {
        label: 'Next',
        raised: true,
    },
};

export const Uppercase: Story = {
    args: {
        label: 'Apply',
        uppercase: true,
    },
};

export const Disabled: Story = {
    args: {
        icon: 'add',
        label: 'Add this',
        disabled: true,
        accent: true,
    },
};

export const Gray: Story = {
    args: {
        label: 'Cancel',
        gray: true,
    },
};

export const Warning: Story = {
    args: {
        label: 'Delete',
        warning: true,
    },
};

export const Inverse: Story = {
    args: {
        label: 'Delete',
        inverse: true,
        buttonColor: 'black',
    },
};

export const Styled: Story = {
    args: {
        label: 'Remove',
        buttonColor: 'purple',
        fontColor: 'white',
        fontSize: 14,
    },
};

export const Link: Story = {
    args: {
        href: 'http://github.com/',
        target: '_blank',
        accent: true,
        label: 'Github',
    },
};
