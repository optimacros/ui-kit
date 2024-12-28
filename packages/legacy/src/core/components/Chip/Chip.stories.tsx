import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Chip } from './index';

const argTypes: Partial<ArgTypes> = {
    deletable: {
        control: 'boolean',
        description: 'If `true`, the chip will be rendered with delete icon.',
    },
    children: {
        control: 'text',
        description: 'The content of the component.  ',
    },
    className: {
        table: { disable: true },
    },
    settingsDialog: {
        table: { disable: true },
    },
    customDeleteIcon: {
        table: { disable: true },
    },
    theme: {
        table: { disable: true },
    },
    onDeleteClick: {
        table: { disable: true },
    },
};

const meta: Meta<typeof Chip> = {
    title: 'legacy/Chip',
    component: Chip,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Chip>;

const DeleteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* eslint-disable-next-line max-len */}
        <path
            d="M14.8284 14.8284L9.17158 9.17158M9.17157 14.8284L14.8284 9.17158M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#28303F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const Basic: Story = {
    args: {
        children: 'Basic',
    },
};

export const Deletable: Story = {
    args: {
        deletable: true,
        children: 'Deletable',
    },
};

export const CustomDeleteIcon: Story = {
    args: {
        deletable: true,
        children: 'Deletable',
        customDeleteIcon: <DeleteIcon />,
    },
};

// todo rename
export const SettingsDialog: Story = {
    args: {
        children: 'Chip',
        settingsDialog: <div>Settings</div>,
    },
};
