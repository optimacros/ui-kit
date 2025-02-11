import { Meta, StoryObj } from '@storybook/react';

import { Menu } from './index';
import { menuItems } from './mock';
import { Flex } from '@optimacros-ui/flex';
import { Button } from '@optimacros-ui/button';
import { Orientation } from '@optimacros-ui/utils';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';
import { Spacer } from '@optimacros-ui/spacer';

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
    render: (props) => {
        return (
            <Menu.Root {...props}>
                <Menu.Trigger asChild>
                    <Button data-testid="trigger">Click me</Button>
                </Menu.Trigger>
                <Menu.Positioner>
                    <Menu.Content size="sm" data-testid="menu-content">
                        <Menu.List data-testid="menu-list">
                            {menuItems.map((v) => (
                                <Menu.Item key={v.value} {...v}>
                                    {v.valueText}
                                </Menu.Item>
                            ))}
                        </Menu.List>
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>
        );
    },
    play: scenarios.basic,
};

export const OrientationExample: Story = {
    render: () => {
        return (
            <Menu.Root>
                <Menu.Trigger data-testid="trigger">
                    <div>Click me</div>
                </Menu.Trigger>
                <Menu.Api>
                    {(api) => (
                        <div
                            data-testid="orientation-trigger"
                            onClick={() =>
                                api.setOrientation(
                                    api.orientation === Orientation.Horizontal
                                        ? Orientation.Vertical
                                        : Orientation.Horizontal,
                                )
                            }
                        >
                            Change orientation
                        </div>
                    )}
                </Menu.Api>
                <Menu.Api>
                    {(api) => (
                        <Menu.Positioner>
                            <Menu.Content size="sm" data-testid="menu-content">
                                <Menu.List>
                                    {menuItems.map((v) => (
                                        <Menu.Item {...v} key={v.value}>
                                            {v.valueText}
                                        </Menu.Item>
                                    ))}
                                    <Menu.SubMenuItem
                                        // @ts-ignore
                                        parent={api}
                                        item={{
                                            value: 'sub-menu-nested',
                                            valueText: 'nested',
                                            closeOnSelect: true,
                                        }}
                                        positioning={{
                                            fitViewport: false,
                                            overlap: false,
                                        }}
                                    >
                                        <Menu.SubMenuPositioner>
                                            <Menu.Content data-testid="sub-menu-content">
                                                <Menu.List>
                                                    {menuItems.slice(0, 5).map((v) => (
                                                        <Menu.Item {...v} key={v.value + 'sub-sub'}>
                                                            {v.valueText}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.List>
                                            </Menu.Content>
                                        </Menu.SubMenuPositioner>
                                    </Menu.SubMenuItem>
                                </Menu.List>
                            </Menu.Content>
                        </Menu.Positioner>
                    )}
                </Menu.Api>
            </Menu.Root>
        );
    },
    play: scenarios.orientation,
};

export const Nested: Story = {
    render: stories.Nested,
    play: scenarios.nested,
};

export const Group: Story = {
    render: (props) => {
        return (
            <Menu.Root {...props}>
                <Menu.Trigger asChild data-testid="trigger">
                    <Button data-testid="trigger">Click me</Button>
                </Menu.Trigger>
                <Menu.Positioner>
                    <Menu.Content data-testid="menu-content">
                        <Flex direction="column">
                            <Menu.Group id="first">
                                <Menu.GroupLabel htmlFor="first">first</Menu.GroupLabel>
                                {menuItems.slice(0, 2).map((v) => (
                                    <Menu.Item {...v} key={`${v.value} 1`}>
                                        {v.valueText}
                                    </Menu.Item>
                                ))}
                            </Menu.Group>

                            <Spacer size={3} orientation="vertical" />

                            <Menu.Group id="second">
                                <Menu.GroupLabel htmlFor="second">second</Menu.GroupLabel>
                                {menuItems.slice(3, 5).map((v) => (
                                    <Menu.Item {...v} key={`${v.value} 2`}>
                                        {v.valueText}
                                    </Menu.Item>
                                ))}
                            </Menu.Group>

                            <Spacer size={3} orientation="vertical" />

                            <Menu.Group id="third">
                                <Menu.GroupLabel htmlFor="third">third</Menu.GroupLabel>
                                {menuItems.slice(5, 8).map((v) => (
                                    <Menu.Item {...v} key={`${v.value} 3`}>
                                        {v.valueText}
                                    </Menu.Item>
                                ))}
                            </Menu.Group>
                        </Flex>
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>
        );
    },
    play: scenarios.group,
};

export const Disabled: Story = {
    args: { disabled: true },
    render: (props) => {
        return (
            <Menu.Root {...props}>
                <Menu.Trigger asChild data-testid="trigger">
                    <Button>Click me</Button>
                </Menu.Trigger>
                <Menu.Positioner>
                    <Menu.Content data-testid="menu-content">
                        <Menu.List>
                            {menuItems.map((v) => (
                                <Menu.Item {...v} key={v.value}>
                                    {v.valueText}
                                </Menu.Item>
                            ))}
                        </Menu.List>
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>
        );
    },
    play: scenarios.disabled,
};
