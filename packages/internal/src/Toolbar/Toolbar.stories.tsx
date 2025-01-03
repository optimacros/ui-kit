import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Toolbar } from './index';
import { Button } from '@optimacros-ui/button';

const argTypes: Partial<ArgTypes> = {
    align: {
        control: 'radio',
        options: ['right', 'center', 'left', 'rightInRow'],
        description: `Position of the toolbar`,
        table: {
            defaultValue: {
                summary: 'left',
            },
            type: { summary: 'right | center | left | rightInRow' },
        },
    },
    children: {
        table: {
            disable: true,
        },
    },
};

const meta: Meta<typeof Toolbar> = {
    title: 'UI Kit internal/Toolbar',
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
                <Button variant="accent">button</Button>
                <Button variant="primary">another button</Button>
            </>
        ),
    },
};
