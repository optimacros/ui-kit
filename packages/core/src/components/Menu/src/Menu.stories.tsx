import { Meta, StoryObj } from '@storybook/react';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';
import { Menu } from './index';

const Wrapper = ({ children }: { children }) => (
    <div style={{ width: '100%', marginLeft: '20px' }}>{children}</div>
);

const meta: Meta<typeof Menu.Root> = {
    title: 'UI Kit core/Menu',
    component: Menu.Root,
    argTypes: {
        // State
        open: {
            control: 'boolean',
            description: 'Whether the menu is open',
            table: { defaultValue: { summary: 'false' } },
        },
        'open.controlled': {
            control: 'boolean',
            description: `Whether the menu's open state is controlled by the user`,
            table: { defaultValue: { summary: 'false' } },
        },
        onOpenChange: {
            control: false,
            description: 'Callback fired when menu state changed',
            table: { type: { summary: '(details: OpenChangeDetails) => void' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the menu trigger is disabled',
            table: { defaultValue: { summary: 'false' } },
        },
        closeOnSelect: {
            control: 'boolean',
            description:
                'Whether to close the menu when an item is selected. This prop can be passed both to `Root` and `Item` components',
            table: { defaultValue: { summary: 'true' } },
        },

        // Positioning
        positioning: {
            control: 'object',
            description: 'Options for menu positioning relative to trigger',
            table: {
                defaultValue: {
                    summary: `{
                placement: 'bottom',
                gutter: 4,
                offset: 0,
                strategy: 'absolute',
            }`,
                },
            },
        },

        // Behavior
        //@ts-ignore
        autoFocus: {
            control: 'boolean',
            description: 'Whether to focus the menu when opened',
            table: { defaultValue: { summary: 'true' } },
        },
        loopFocus: {
            control: 'boolean',
            description: 'Whether keyboard navigation should loop around',
            table: { defaultValue: { summary: 'true' } },
        },
        typeahead: {
            control: 'boolean',
            description:
                'Whether the pressing printable characters should trigger typeahead navigation',
            table: { defaultValue: { summary: 'true' } },
        },
    },
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof Menu.Root>;

export const Basic: Story = {
    args: {
        open: false,
        'open.controlled': false,
        closeOnSelect: true,
    },
    render: examples.Basic,
    play: scenarios.basic,
};

export const Disabled: Story = {
    args: { disabled: true },
    render: examples.Basic,
    play: scenarios.disabled,
};

export const OrientationExample: Story = {
    render: examples.OrientationExample,
    play: scenarios.orientation,
};

export const Nested: Story = {
    render: examples.Nested,
    play: scenarios.nested,
};

export const Group: Story = {
    render: examples.Group,
    play: scenarios.group,
};

export const ContextMenu: Story = {
    render: examples.ContextMenu,
};
