import { Meta, StoryObj } from '@storybook/react';

import { Menu } from './index';
import { Orientation } from '@optimacros-ui/utils';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';
import { fn } from '@storybook/test';
import { menuItems } from './mock';

const Wrapper = ({ children }: { children }) => (
    <div style={{ width: '100%', marginLeft: '20px' }}>{children}</div>
);

const meta: Meta<typeof Menu.Root> = {
    title: 'UI Kit core/Menu',
    component: Menu.Root,
    argTypes: {
        // State
        defaultOpen: {
            control: 'boolean',
            description: 'Whether the menu is open',
            table: { defaultValue: { summary: 'false' } },
        },
        open: {
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
        onSelect: {
            control: false,
            description: 'Function called when a menu item is selected',
            table: { type: { summary: '(details: SelectionDetails) => void' } },
        },
        onHighlightChange: {
            control: false,
            description: 'Function called when the highlighted menu item changes',
            table: { type: { summary: '(details: HighlightChangeDetails) => void' } },
        },
        highlightedValue: {
            control: 'text',
            description: 'The controlled highlighted value of the menu item',
            table: { type: { summary: 'string' } },
        },
        defaultHighlightedValue: {
            control: 'text',
            description: `The initial highlighted value of the menu item when rendered. Use when you don't need to control the highlighted value of the menu item`,
            table: { type: { summary: 'string' } },
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
        orientation: {
            control: 'radio',
            options: ['horizontal', 'vertical'],
            description: 'Orientation of the menu',
            table: { defaultValue: { summary: 'vertical' } },
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
    args: {
        open: undefined,
        orientation: Orientation.Vertical,
        onSelect: fn(),
        onOpenChange: fn(),
        onHighlightChange: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof Menu.Root>;

export const Basic: Story = {
    render: examples.Basic,
    play: scenarios.basic,
};

export const highlighted: Story = {
    args: { defaultOpen: true, defaultHighlightedValue: menuItems[1].value },
    render: examples.Basic,
    play: scenarios.highlighted,
};

export const OrientationExample: Story = {
    args: { orientation: Orientation.Vertical },
    render: examples.Basic,
    play: scenarios.orientation,
};

export const Nested: Story = {
    args: { closeOnSelect: true, hoverable: true },
    render: examples.Nested,
    play: scenarios.nested,
};

export const Group: Story = {
    render: examples.Group,
    play: scenarios.group,
};

export const Disabled: Story = {
    args: { disabled: true },
    render: examples.Basic,
    play: scenarios.disabled,
};

export const ContextMenu: Story = {
    render: examples.ContextMenu,
    play: scenarios.contextMenu,
};
