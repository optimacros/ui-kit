import { ArgTypes, Meta, StoryObj } from '@storybook/react';

import { Loader } from './index';
import LinearStory from './LoaderLinearV2.stories';

import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';

const argTypes: Partial<ArgTypes<Loader.Props>> = {
    ...LinearStory.argTypes,
    multicolor: {
        control: 'boolean',
        description: 'The circular progress bar will be changing its color in indeterminate mode.',
        table: { defaultValue: { summary: 'false' } },
    },
};

const meta: Meta<typeof Loader.Root> = {
    title: 'UI Kit core/Loader/Circular',
    argTypes,
    decorators: [
        (Story, props) => {
            return (
                <Loader.Root {...props.args}>
                    <Story />
                </Loader.Root>
            );
        },
    ],
    tags: ['skip-test-runner'],
};

export default meta;

type Story = StoryObj<typeof Loader.Root>;

export const Basic: Story = {
    render: stories.CircleBasic,
    play: scenarios.circleBasic,
};

export const Disabled: Story = {
    render: stories.CircleBasic,
    args: {
        disabled: true,
    },
    tags: ['!skip-test-runner'],
};

export const Multicolor: Story = {
    args: { multicolor: true, value: null },
    render: stories.CircleBasic,
};

export const Label: Story = {
    render: stories.CircleLabel,
    tags: ['!skip-test-runner'],
};

export const Infinite: Story = {
    render: stories.CircleLabel,
    args: {
        infinite: true,
        speed: 50,
        controllable: true,
    },
    //  play: scenarios.circleInfinite, не работает
};
