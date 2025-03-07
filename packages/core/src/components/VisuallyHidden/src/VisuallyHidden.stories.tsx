import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from './VisuallyHidden';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';

const meta: Meta<typeof VisuallyHidden> = {
    title: 'Ui kit core/VisuallyHidden',
    component: VisuallyHidden,
};

export default meta;

type Story = StoryObj<typeof VisuallyHidden>;

export const Basic: Story = {
    args: {
        children: 'This text is hidden visually but available to screen readers',
    },
    render: examples.Basic,
    play: scenarios.basic,
};

export const WithButton: Story = {
    args: { children: 'Save' },
    render: examples.WithButton,
    tags: ['skip-test-runner'],
};

export const WithCustomInput: Story = {
    args: { children: 'Search' },
    render: examples.WithCustomInput,
    tags: ['skip-test-runner'],
};
