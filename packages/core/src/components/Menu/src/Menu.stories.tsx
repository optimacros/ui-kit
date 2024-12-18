import { Meta } from '@storybook/react';

import { Menu } from './index';
import { menu } from '.';
import { createMenuItems } from './mock';
import { Flex } from '@optimacros-ui/flex';
import { Orientation } from '@optimacros-ui/utils';

const Wrapper = ({ children }: { children }) => (
    <div style={{ width: '100%', height: '100vh', marginLeft: '20px' }}>{children}</div>
);

const meta: Meta<typeof Menu.Root> = {
    title: 'UI Kit core/Menu',
    component: Menu.Root,
    argTypes: {
        // Accessibility
        'aria-label': {
            control: 'text',
            description: 'Accessible label for the menu',
        },
        closeOnSelect: {
            control: 'boolean',
            description: 'Whether to close the menu when an item is selected',
            defaultValue: true,
        },

        // Positioning
        positioning: {
            control: 'object',
            description: 'Options for menu positioning relative to trigger',
            defaultValue: {
                placement: 'bottom',
                gutter: 4,
                offset: 0,
                strategy: 'absolute',
            },
        },

        // Behavior
        autoFocus: {
            control: 'boolean',
            description: 'Whether to focus the menu when opened',
            defaultValue: true,
        },
        loop: {
            control: 'boolean',
            description: 'Whether keyboard navigation should loop around',
            defaultValue: true,
        },
        preventScroll: {
            control: 'boolean',
            description: 'Whether to prevent scrolling when menu is open',
            defaultValue: false,
        },
        modal: {
            control: 'boolean',
            description: 'Whether the menu blocks interactions with other elements',
            defaultValue: false,
        },

        // Typeahead
        typeahead: {
            control: 'object',
            description: 'Options for typeahead functionality',
            defaultValue: {
                timeout: 750,
                loop: true,
            },
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

const menuItems: Array<menu.ItemProps> = createMenuItems(10);

export const Basic = (props) => {
    return (
        <Menu.Root {...props} controllable>
            <Menu.Trigger asChild>
                <div>Click me</div>
            </Menu.Trigger>
            <Menu.Positioner>
                <Menu.Content>
                    <Menu.List>
                        {menuItems.map((v, i) => (
                            <Menu.Item {...v} />
                        ))}
                    </Menu.List>
                </Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
    );
};

export const Horizontal = () => {
    return (
        <Menu.Root>
            <Menu.Trigger>
                <div>Click me</div>
            </Menu.Trigger>
            <Menu.Api>
                {(api) => (
                    <div
                        onClick={() =>
                            api.setOrientation(
                                api.orientation === Orientation.Horizontal
                                    ? Orientation.Vertical
                                    : Orientation.Horizontal,
                            )
                        }
                    >
                        Click me
                    </div>
                )}
            </Menu.Api>
            <Menu.Api>
                {(api) => (
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.List>
                                {menuItems.map((v, i) => (
                                    <Menu.Item {...v} />
                                ))}
                                <Menu.SubMenuItem
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
                                        <Menu.Content>
                                            <Menu.List>
                                                {menuItems.slice(0, 5).map((v, i) => (
                                                    <Menu.Item
                                                        {...v}
                                                        value={v.value}
                                                        key={v.value + 'sub-sub'}
                                                    />
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
};

// nested
const CustomMenu = () => {
    const api = Menu.useApi();

    return (
        <Menu.SubMenuPositioner>
            <Menu.Content>
                <Menu.List>
                    {menuItems.map((v, i) => (
                        <Menu.Item {...v} />
                    ))}
                    <Menu.SubMenuItem
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
                            <Menu.Content>
                                <Menu.List>
                                    {menuItems.slice(0, 5).map((v, i) => (
                                        <Menu.Item
                                            {...v}
                                            value={v.value}
                                            key={v.value + 'sub-sub'}
                                        />
                                    ))}
                                </Menu.List>
                            </Menu.Content>
                        </Menu.SubMenuPositioner>
                    </Menu.SubMenuItem>
                </Menu.List>
            </Menu.Content>
        </Menu.SubMenuPositioner>
    );
};

export const Nested = () => {
    return (
        <Menu.Root closeOnSelect={false}>
            <Menu.Trigger asChild>
                <div>Click me</div>
            </Menu.Trigger>
            <Menu.Api>
                {(api) => (
                    <Menu.Positioner portalled>
                        <Menu.Content>
                            <Menu.List>
                                {menuItems.map((v, i) => (
                                    <Menu.SubMenuItem
                                        key={`custom-sub-${i}`}
                                        parent={api}
                                        item={v}
                                        closeOnSelect={false}
                                        positioning={{
                                            fitViewport: false,
                                            overlap: false,
                                        }}
                                    >
                                        <CustomMenu />
                                    </Menu.SubMenuItem>
                                ))}
                            </Menu.List>
                        </Menu.Content>
                    </Menu.Positioner>
                )}
            </Menu.Api>
        </Menu.Root>
    );
};

export const Group = () => {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <div>Click me</div>
            </Menu.Trigger>
            <Menu.Positioner>
                <Menu.Content asChild>
                    <Flex direction="row">
                        <Menu.Group id="first">
                            <Menu.GroupLabel htmlFor="first">first</Menu.GroupLabel>
                            {menuItems.slice(0, 2).map((v, i) => (
                                <Menu.Item {...v} key={`${v} 1`} value={`${v} 1`} />
                            ))}
                        </Menu.Group>

                        <Menu.Group id="second">
                            <Menu.GroupLabel htmlFor="second">second</Menu.GroupLabel>
                            {menuItems.slice(3, 5).map((v, i) => (
                                <Menu.Item {...v} key={`${v} 2`} value={`${v} 2`} />
                            ))}
                        </Menu.Group>
                        <Menu.Group id="third">
                            <Menu.GroupLabel htmlFor="third">third</Menu.GroupLabel>
                            {menuItems.slice(6, 8).map((v, i) => (
                                <Menu.Item {...v} key={`${v} 3`} value={`${v} 3`} />
                            ))}
                        </Menu.Group>
                    </Flex>
                </Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
    );
};

export const Disabled = () => {
    return (
        <Menu.Root closeOnSelect={false} disabled>
            <Menu.Trigger asChild>
                <div>Click me</div>
            </Menu.Trigger>
            <Menu.Positioner>
                <Menu.Content>
                    <Menu.List>
                        {menuItems.map((v, i) => (
                            <Menu.Item {...v} disabled={i % 2 === 0} />
                        ))}
                    </Menu.List>
                </Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
    );
};
