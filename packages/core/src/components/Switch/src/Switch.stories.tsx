import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '.';
import React from 'react';

const meta: Meta<typeof Switch.Root> = {
    title: 'Ui kit core/Switch',
    component: Switch.Root,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ padding: '2rem' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Switch.Root>;

// Basic Switch
export const Default: Story = {
    render: () => (
        <Switch.Root>
            <Switch.Control>
                <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>Enable notifications</Switch.Label>
        </Switch.Root>
    ),
};

// With different states
export const States: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Switch.Root defaultChecked>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Checked by default</Switch.Label>
            </Switch.Root>

            <Switch.Root disabled>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Disabled switch</Switch.Label>
            </Switch.Root>

            <Switch.Root disabled defaultChecked>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Disabled checked</Switch.Label>
            </Switch.Root>
        </div>
    ),
};

// Size variants
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Switch.Root data-size="sm">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Small switch</Switch.Label>
            </Switch.Root>

            <Switch.Root data-size="md">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Medium switch</Switch.Label>
            </Switch.Root>

            <Switch.Root data-size="lg">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Large switch</Switch.Label>
            </Switch.Root>
        </div>
    ),
};

// Color variants
export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Switch.Root data-color="primary">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Primary</Switch.Label>
            </Switch.Root>

            <Switch.Root data-color="success">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Success</Switch.Label>
            </Switch.Root>

            <Switch.Root data-color="danger">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Danger</Switch.Label>
            </Switch.Root>
        </div>
    ),
};

// Controlled example
export const Controlled: Story = {
    render: () => {
        const [checked, setChecked] = React.useState(false);

        return (
            <Switch.Root checked={checked} onCheckedChange={({ checked }) => setChecked(checked)}>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>{checked ? 'Active' : 'Inactive'}</Switch.Label>
            </Switch.Root>
        );
    },
};

// Label placement
export const LabelPlacement: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Switch.Root data-label-placement="start">
                <Switch.Label>Label before</Switch.Label>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
            </Switch.Root>

            <Switch.Root data-label-placement="end">
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Label after</Switch.Label>
            </Switch.Root>
        </div>
    ),
};
