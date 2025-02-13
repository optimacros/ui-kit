import { Counter } from './index';
import { Navigation } from '@optimacros-ui/navigation';
import { IconButton } from '@optimacros-ui/icon-button';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';
import { FC, PropsWithChildren } from 'react';

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <div style={{ display: 'flex' }}>{children}</div>
);

const argTypes: ArgTypes<Counter.CounterProps> = {
    defaultValue: {
        control: { type: 'number' },
        description: 'The default value',
        table: {
            type: { summary: 'number' },
        },
    },
    maxValue: {
        control: { type: 'number' },
        description: 'The maximum value',
        table: {
            type: { summary: 'number' },
        },
    },
    step: {
        control: { type: 'number' },
        description: 'Increment/decrement step value',
        table: {
            type: { summary: 'number' },
            defaultValue: { summary: '1' },
        },
    },
};

const meta: Meta<typeof Counter.Root> = {
    title: 'UI Kit core/Counter',
    component: Counter.Root,
    argTypes,
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Counter.Root>;

export const Base: Story = {
    render: stories.Basic,
    play: scenarios.basic,
};

export const DefaultValue: Story = {
    args: { defaultValue: 10 },
    render: stories.Basic,
};

export const MaxValue: Story = {
    args: { defaultValue: 10, maxValue: 5 },
    render: stories.Basic,
};

export const Step: Story = {
    args: { step: 15 },
    render: stories.Basic,
    play: scenarios.step,
};

export const Link: Story = {
    render: (props) => {
        return (
            <Counter.Root {...props}>
                <Counter.Decrease>
                    <IconButton variant="transparent" icon="-" />
                </Counter.Decrease>
                <Navigation.Root>
                    <a href={'https://google.com'} style={{ textDecoration: 'none' }}>
                        <Counter.Value />
                    </a>
                </Navigation.Root>
                <Counter.Increase>
                    <IconButton variant="transparent" icon="+" />
                </Counter.Increase>
            </Counter.Root>
        );
    },
};
