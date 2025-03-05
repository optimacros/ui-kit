import { Meta, StoryObj, ArgTypes } from '@storybook/react';
import * as examples from './examples';
import { Backdrop } from './index';
import { Loader } from '@optimacros-ui/loader';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof Backdrop.Root> = {
    title: 'UI Kit core/Backdrop',
    component: Backdrop.Root,
    argTypes,
    decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof Backdrop.Root>;

export const Basic: Story = {
    render: examples.Basic,
};

export const WithLoader: Story = {
    args: {
        children: (
            <Loader.Root value={null}>
                <Loader.Circle>
                    <Loader.CircleTrack />
                    <Loader.CircleRange />
                </Loader.Circle>
            </Loader.Root>
        ),
    },
    render: examples.Basic,
};

export const WithLongPage: Story = {
    render: examples.WithLongPage,
};
