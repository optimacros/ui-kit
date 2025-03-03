import { ComponentProps } from 'react';
import type { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { Image } from '.';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';
import { fn } from '@storybook/test';

const argTypes: ArgTypes<ComponentProps<typeof Image.Root>> = {
    ratio: {
        control: 'radio',
        options: ['square', 'portrait', 'landscape', 'wide', 'ultrawide', 'golden', 'custom'],
        description:
            'Image aspect ratio preset. If `custom` is selected, `--aspect-ratio` variable will be used',
        type: { name: 'string', required: true },
    },
    onStatusChange: {
        control: false,
        description: 'Functional called when the image loading status changes',
        table: { type: { summary: '(details: StatusChangeDetails) => void' } },
    },
    children: {
        table: { disable: true },
    },
    as: {
        table: { disable: true },
    },
    asChild: {
        table: { disable: true },
    },
    id: {
        table: { disable: true },
    },
};

const meta: Meta<typeof Image.Root> = {
    title: 'Ui kit core/Image',
    component: Image.Root,
    argTypes,
    tags: ['skip-test-runner'],
};

export default meta;

type Story = StoryObj<typeof Image.Root>;

export const Basic: Story = {
    args: { ratio: 'square', onStatusChange: fn() },
    render: examples.Basic,
    play: scenarios.basic,
    tags: ['!skip-test-runner'],
};

export const AspectRatios: Story = {
    render: examples.AspectRatios,
    play: scenarios.aspectRatios,
    tags: ['!skip-test-runner'],
};

export const WithError: Story = {
    render: examples.WithError,
};

export const CustomSize: Story = {
    render: examples.CustomSize,
};

export const CustomFallback: Story = {
    render: examples.CustomFallback,
};

export const LoadingStates: Story = {
    render: examples.LoadingStates,
};

export const Styled: Story = {
    render: examples.Styled,
};

export const Avatar: Story = {
    render: examples.Avatar,
};

export const Gallery: Story = {
    render: examples.Gallery,
};
