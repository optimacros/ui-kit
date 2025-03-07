import { Text, Tooltip } from '@optimacros-ui/kit';
import { Flex } from '@optimacros-ui/flex';
import { RadioGroup } from './index';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';
import { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { ComponentProps } from 'react';

const argTypes: ArgTypes<Partial<ComponentProps<typeof RadioGroup.Root>>> = {
    value: {
        control: 'text',
        description: 'The controlled value of the radio group',
    },
    defaultValue: {
        control: 'text',
        description: `The initial value of the checked radio when rendered. Use when you don't need to control the value of the radio group`,
    },
    onValueChange: {
        control: false,
        description: 'Function called once a radio is checked',
        table: { summary: { summary: '(details: ValueChangeDetails) => void' } },
    },
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled',
        table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
        control: 'boolean',
        description: 'Whether the checkbox is read-only',
        table: { defaultValue: { summary: 'false' } },
    },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
    id: { table: { disable: true } },
};

const meta: Meta<typeof RadioGroup.Root> = {
    title: 'UI Kit core/RadioGroup',
    component: RadioGroup.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof RadioGroup.Root>;

export const Base: Story = {
    render: stories.Basic,
    play: scenarios.basic,
};

export const Checked: Story = {
    args: { defaultValue: 'gradient' },
    render: stories.Basic,
};

export const Controlled: Story = {
    args: { defaultValue: 'gradient' },
    render: stories.Controlled,
    tags: ['skip-test-runner'], // чекед\нечекед сфоткали в Checked
};

export const States: Story = {
    render: (props) => {
        return (
            <Flex direction="column" gap="4">
                <Text.Title as="h5">Disabled</Text.Title>
                <Flex direction="row" gap="20">
                    <RadioGroup.Root {...props} value="gradient" disabled>
                        <RadioGroup.Item value="gradient">
                            <RadioGroup.Control value="gradient" />
                            <RadioGroup.Text value="gradient">gradient</RadioGroup.Text>
                        </RadioGroup.Item>
                        <RadioGroup.Item value="partialGradient">
                            <RadioGroup.Control value="partialGradient" />
                            <RadioGroup.Text value="partialGradient">
                                without gradient
                            </RadioGroup.Text>
                        </RadioGroup.Item>
                    </RadioGroup.Root>

                    <RadioGroup.Root {...props} disabled>
                        <RadioGroup.Item value="gradient">
                            <RadioGroup.Control value="gradient" />
                            <RadioGroup.Text value="gradient">gradient</RadioGroup.Text>
                        </RadioGroup.Item>
                        <RadioGroup.Item value="partialGradient">
                            <RadioGroup.Control value="partialGradient" />
                            <RadioGroup.Text value="partialGradient">
                                without gradient
                            </RadioGroup.Text>
                        </RadioGroup.Item>
                    </RadioGroup.Root>
                </Flex>

                <Text.Title as="h5">Readonly</Text.Title>
                <Flex direction="row" gap="20">
                    <RadioGroup.Root {...props} value="gradient" readOnly>
                        <RadioGroup.Item value="gradient">
                            <RadioGroup.Control value="gradient" />
                            <RadioGroup.Text value="gradient">gradient</RadioGroup.Text>
                        </RadioGroup.Item>
                        <RadioGroup.Item value="partialGradient">
                            <RadioGroup.Control value="partialGradient" />
                            <RadioGroup.Text value="partialGradient">
                                without gradient
                            </RadioGroup.Text>
                        </RadioGroup.Item>
                    </RadioGroup.Root>

                    <RadioGroup.Root {...props} readOnly>
                        <RadioGroup.Item value="gradient">
                            <RadioGroup.Control value="gradient" />
                            <RadioGroup.Text value="gradient">gradient</RadioGroup.Text>
                        </RadioGroup.Item>
                        <RadioGroup.Item value="partialGradient">
                            <RadioGroup.Control value="partialGradient" />
                            <RadioGroup.Text value="partialGradient">
                                without gradient
                            </RadioGroup.Text>
                        </RadioGroup.Item>
                    </RadioGroup.Root>
                </Flex>
            </Flex>
        );
    },
};

export const WithTooltip: Story = {
    render: (props) => {
        return (
            <div>
                <RadioGroup.Root {...props}>
                    <Tooltip.Root
                        openDelay={0}
                        closeDelay={0}
                        positioning={{
                            offset: { crossAxis: 0, mainAxis: 0 },
                            placement: 'bottom-start',
                        }}
                    >
                        <Tooltip.Trigger asChild>
                            <div>
                                <RadioGroup.Item value="gradient">
                                    <RadioGroup.Control value="gradient" />
                                    <RadioGroup.Text value="gradient">gradient</RadioGroup.Text>
                                </RadioGroup.Item>
                            </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Gradient</Tooltip.Content>
                    </Tooltip.Root>

                    <Tooltip.Root
                        openDelay={0}
                        closeDelay={0}
                        positioning={{
                            offset: { crossAxis: 0, mainAxis: 0 },
                            placement: 'bottom-start',
                        }}
                    >
                        <Tooltip.Trigger asChild>
                            <div>
                                <RadioGroup.Item value="partialGradient">
                                    <RadioGroup.Control value="partialGradient" />
                                    <RadioGroup.Text value="partialGradient">
                                        without gradient
                                    </RadioGroup.Text>
                                </RadioGroup.Item>
                            </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Without gradient</Tooltip.Content>
                    </Tooltip.Root>
                </RadioGroup.Root>
            </div>
        );
    },
    tags: ['skip-test-runner'],
};
