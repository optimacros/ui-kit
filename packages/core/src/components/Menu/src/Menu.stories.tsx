import { Meta } from '@storybook/react';

import { Menu } from './index';
import { menu } from '.';
import { createMenuItems } from './mock';
const Wrapper = ({ children }: { children }) => (
    <div style={{ width: '100%', height: '100vh', marginLeft: '20px' }}>{children}</div>
);

const meta: Meta<typeof Menu> = {
    title: 'UI Kit core/Menu',
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

export const Basic = () => {
    return (
        <Menu.Root>
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
            <Menu.Trigger asChild>
                <div>Click me</div>
            </Menu.Trigger>
            <Menu.Api>
                {(api) => (
                    <Menu.Positioner>
                        <Menu.Content orientation="horizontal">
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
                <Menu.Content>
                    <Menu.List>
                        <Menu.Group id="first">
                            <Menu.GroupLabel htmlFor="first">first</Menu.GroupLabel>
                            {menuItems.map((v, i) => (
                                <Menu.Item {...v} key={`${v} 1`} value={`${v} 1`} />
                            ))}
                        </Menu.Group>

                        <Menu.Group id="second">
                            <Menu.GroupLabel htmlFor="second">second</Menu.GroupLabel>
                            {menuItems.map((v, i) => (
                                <>
                                    <Menu.Item {...v} key={`${v} 2`} value={`${v} 2`} />
                                    <Menu.Separator />
                                </>
                            ))}
                        </Menu.Group>
                        <Menu.Group id="third">
                            <Menu.GroupLabel htmlFor="third">third</Menu.GroupLabel>
                            {menuItems.map((v, i) => (
                                <Menu.Item {...v} key={`${v} 3`} value={`${v} 3`} />
                            ))}
                        </Menu.Group>
                    </Menu.List>
                </Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
    );
};

export const Disabled = () => {
    return (
        <Menu.Root closeOnSelect={false}>
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
