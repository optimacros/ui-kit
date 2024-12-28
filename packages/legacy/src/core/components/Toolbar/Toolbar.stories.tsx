import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Toolbar } from './index';
import { Button } from '../Button';

const argTypes: Partial<ArgTypes> = {
    align: {
        control: 'radio',
        options: ['right', 'rightInRow', 'left', 'center'],
        table: {
            defaultValue: {
                summary: 'left',
            },
        },
    },
    small: {
        control: 'boolean',
        description: 'If `true`, toolbar will have less margin top.',
    },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
};

const meta: Meta<typeof Toolbar> = {
    title: 'legacy/Toolbar',
    component: Toolbar,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Toolbar>;

export const Basic: Story = {
    args: {
        align: 'left',
        children: (
            <>
                <Button label="cancel" />

                <Button label="submit" bordered />
            </>
        ),
    },
};

export const Center: Story = {
    args: {
        align: 'center',
        children: (
            <>
                <Button label="cancel" />

                <Button label="submit" bordered />
            </>
        ),
    },
};

export const Small: Story = {
    args: {
        align: 'left',
        small: true,
        children: (
            <>
                <Button label="cancel" />

                <Button label="submit" bordered />
            </>
        ),
    },
};
