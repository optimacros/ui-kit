import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Icon } from './index';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: 'text',
        description: 'Value of the icon. Using `FontIcon` if value string. Or `div` if value node.',
    },
    title: {
        control: 'text',
        description: 'Icon description, visible on icon hover.',
    },
    alt: {
        control: 'text',
        description: 'The text used to set the `aria-label` attribute.',
    },
    style: {
        control: 'object',
        description: 'Add styles to component.',
    },
    className: {
        table: { disable: true },
    },
    onClick: {
        table: { disable: true },
    },
};

const meta: Meta<typeof Icon> = {
    title: 'UI Kit core/Icon',
    component: Icon,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Icon>;

const UserIcon = () => (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        {/* eslint-disable-next-line max-len */}
        <path
            d="m12 11c2.2091 0 4-1.79086 4-4s-1.7909-4-4-4c-2.20914 0-4 1.79086-4 4s1.79086 4 4 4zm0 10c3.866 0 7-1.7909 7-4s-3.134-4-7-4c-3.86599 0-7 1.7909-7 4s3.13401 4 7 4z"
            fill="#28303f"
            clipRule="evenodd"
            fillRule="evenodd"
        />
    </svg>
);

export const Basic: Story = {
    args: {
        value: 'close',
        alt: 'close icon',
    },
};

export const WithTooltip: Story = {
    args: {
        value: 'search',
        title: 'description',
    },
};

export const CustomStyles: Story = {
    args: {
        value: 'add',
        title: 'description',
        style: { border: '1px solid black' },
    },
};

export const CustomIcon: Story = {
    args: {
        value: <UserIcon />,
    },
};
