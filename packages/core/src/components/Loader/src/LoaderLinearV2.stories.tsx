import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Loader } from '.';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';

const argTypes: Partial<ArgTypes<Loader.Props>> = {
    value: {
        control: false,
        description: 'Value of the current progress. Indeterminate mode if no value is provided',
        table: { defaultValue: { summary: '0' } },
    },
    defaultValue: {
        control: 'number',
        description: 'Value of the current progress. Indeterminate mode if no value is provided',
        table: { defaultValue: { summary: '0' } },
    },
    infinite: {
        control: 'boolean',
        description: 'Whether the loader starts from `min` again after reaching `max`',
        table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
        table: { defaultValue: { summary: 'false' } },
    },
    speed: {
        control: 'number',
        description: 'Increment frequency in `ms`',
        table: { defaultValue: { summary: '100' } },
    },
    step: {
        control: 'number',
        description: 'Increment value',
        table: { defaultValue: { summary: '1' } },
    },
    min: {
        control: 'number',
        description: 'The minimum allowed value of the progress bar.',
        table: { defaultValue: { summary: '0' } },
    },
    max: {
        control: 'number',
        description: 'The maximum allowed value of the progress bar.',
        table: { defaultValue: { summary: '100' } },
    },
};

const meta: Meta<typeof Loader.Root> = {
    title: 'UI Kit core/Loader/Linear',
    argTypes,
    decorators: [
        (Story, props) => {
            return (
                <Loader.Root {...props.args} data-testid="root">
                    <Story />
                </Loader.Root>
            );
        },
    ],
    args: {
        value: undefined,
        running: undefined,
        defaultValue: 0,
        onCancel: () => {
            console.info('stop');
        },
    },
    tags: ['skip-test-runner'],
};

export default meta;

type Story = StoryObj<typeof Loader.Root>;

export const Basic: Story = {
    render: stories.LinearBasic,
    play: scenarios.linearBasic,
};

export const Disabled: Story = {
    render: stories.LinearBasic,
    args: {
        disabled: true,
    },
    tags: ['!skip-test-runner'],
};

export const Label: Story = {
    render: stories.LinearLabel,
    tags: ['!skip-test-runner'],
};

export const Infinite: Story = {
    render: stories.LinearLabel,
    args: {
        speed: 300,
        step: 10,
        infinite: true,
    },
    play: scenarios.linearInfinite,
};

export const MinMax: Story = {
    render: stories.LinearLabel,
    args: {
        speed: 500,
        step: 10,
        defaultValue: 50,
        min: 30,
        max: 70,
        infinite: true,
    },
};
