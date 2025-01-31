//@ts-nocheck

import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { ComponentType, ReactNode } from 'react';

import { Navigation, NavigationProps } from './index';
import { Button } from '../Button';

const argTypes: Partial<ArgTypes> = {
    wrap: {
        control: 'boolean',
        description: 'If `true`, navigation items can wrap onto multiple lines. ',
    },
    type: {
        control: 'radio',
        options: ['horizontal', 'vertical'],
        table: {
            defaultValue: { summary: 'horizontal' },
        },
        description: 'Type of the navigation.',
    },
    theme: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
};

const meta: Meta<typeof Navigation> = {
    title: 'ui kit internal/Navigation',
    component: Navigation as unknown as ComponentType<NavigationProps>,
    argTypes,
};
export default meta;

type Story = StoryObj<NavigationProps>;

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '300px' }}>{children}</div>
);

export const Horizontal: Story = {
    args: {
        type: 'horizontal',
        children: (
            <>
                <Button label="Portfolio" />
                <Button label="About" />
            </>
        ),
    },
};

export const Vertical: Story = {
    args: {
        type: 'vertical',
        children: (
            <>
                <Button label="Portfolio" />
                <Button label="About" />
            </>
        ),
    },
};

export const Wrap: Story = {
    args: {
        type: 'horizontal',
        wrap: true,
        children: (
            <>
                <Button label="Portfolio" />
                <Button label="About" />
                <Button label="Menu" />
                <Button label="Location" />
                <Button label="Contact" />
            </>
        ),
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};
