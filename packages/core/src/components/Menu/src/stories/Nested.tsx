import { Button } from '@optimacros-ui/button';
import { Menu } from '..';
import { RootProps } from '../Menu';
import { menuItems } from '../mock';

const CustomMenu = ({ value }) => {
    const api = Menu.useApi();

    return (
        <Menu.SubMenuPositioner>
            <Menu.Content data-testid={`${value} sub-menu-content`}>
                <Menu.List>
                    {menuItems.map((v) => (
                        <Menu.Item {...v} key={v.value}>
                            sub {v.valueText}
                        </Menu.Item>
                    ))}
                    <Menu.SubMenuItem
                        parent={api}
                        item={{
                            value: 'sub-menu-nested',
                            valueText: 'nested',
                        }}
                        positioning={{
                            fitViewport: false,
                            overlap: false,
                        }}
                    >
                        <Menu.SubMenuPositioner>
                            <Menu.Content data-testid={`sub-sub-menu-content`}>
                                <Menu.List>
                                    {menuItems.slice(0, 5).map((v) => (
                                        <Menu.Item
                                            {...v}
                                            value={v.value + 'sub'}
                                            valueText={v.value + 'sub'}
                                            key={v.value + 'sub-sub'}
                                        >
                                            sub sub {v.valueText}
                                        </Menu.Item>
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

export const Nested = (props: RootProps) => {
    return (
        <Menu.Root {...props}>
            <Menu.Trigger asChild>
                <Button data-testid="trigger">Click me</Button>
            </Menu.Trigger>
            <Menu.Api>
                {(api) => (
                    <Menu.Positioner>
                        <Menu.Content data-testid="menu-content">
                            <Menu.List>
                                {menuItems.map((v, i) => (
                                    <Menu.SubMenuItem
                                        key={v.value}
                                        disabled={v.disabled}
                                        parent={api}
                                        item={v}
                                        positioning={{
                                            fitViewport: false,
                                            overlap: false,
                                        }}
                                    >
                                        <CustomMenu value={v.value} />
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
