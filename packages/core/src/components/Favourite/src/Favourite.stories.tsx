import { Favourite } from '@optimacros-ui/favourite';
import { Flex } from '@optimacros-ui/flex';
import { StoryObj, ArgTypes, Meta } from '@storybook/react';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';

const argTypes: ArgTypes<Partial<ComponentProps<typeof Favourite.Root>>> = {
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled',
    },
    checked: {
        control: 'boolean',
        description: 'Checked value',
    },
    defaultChecked: {
        control: 'boolean',
        description: 'Checked value',
    },
    onCheckedChange: {
        control: false,
        description: 'The callback invoked when the checked state changes',
        table: { type: { summary: '(details: CheckedChangeDetails) => void' } },
    },
    as: {
        table: { disable: true },
    },
    asChild: {
        table: { disable: true },
    },
};

const meta: Meta<typeof Favourite.Root> = {
    title: 'UI Kit core/Favourite',
    component: Favourite.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Favourite.Root>;

export const Basic: Story = {
    args: { onCheckedChange: fn() },
    render: stories.Basic,
    play: scenarios.basic,
};

export const Checked: Story = {
    args: { defaultChecked: true },
    render: stories.Basic,
    tags: ['skip-test-runner'], // проверим в basic
};

export const Label: Story = {
    render: stories.Label,
    tags: ['skip-test-runner'], // проверим в disabled
};

export const Disabled: Story = {
    args: { disabled: true },
    render: (props) => {
        return (
            <Flex direction="row" gap="20">
                <stories.Label {...props} />
                <stories.Label {...props} checked />
            </Flex>
        );
    },
};
