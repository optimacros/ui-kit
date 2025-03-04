import { Button } from '@optimacros-ui/button';
import { Menu } from '..';
import { Props, useSubmenu } from '../menu.machine';
import { menuItems } from '../mock';

const Content = ({ parent }) => {
    const submenu_1 = useSubmenu(parent, { id: 'sub_1' });
    const submenu_2 = useSubmenu(parent, { id: 'sub_2' });
    const submenu_3 = useSubmenu(parent, { id: 'sub_3' });

    return (
        <>
            <Menu.Positioner>
                <Menu.Content data-testid="menu-content">
                    <Menu.List>
                        <Menu.TriggerItem {...submenu_1.props} value="sub_1">
                            sub 1
                        </Menu.TriggerItem>
                        {menuItems.slice(0, 3).map((v) => (
                            <Menu.Item {...v}>{v.valueText}</Menu.Item>
                        ))}
                        <Menu.TriggerItem {...submenu_2.props} value="sub_2">
                            sub 2
                        </Menu.TriggerItem>
                        {menuItems.slice(3, 6).map((v) => (
                            <Menu.Item {...v}>{v.valueText}</Menu.Item>
                        ))}
                        <Menu.TriggerItem {...submenu_3.props} value="sub_3">
                            sub 3
                        </Menu.TriggerItem>
                    </Menu.List>
                </Menu.Content>
            </Menu.Positioner>
            <Menu.SubMenuContent menu={submenu_1}>
                {menuItems.map((v) => (
                    <Menu.SubMenuItem {...v} data-testid={v.value}>
                        {v.valueText}
                    </Menu.SubMenuItem>
                ))}
            </Menu.SubMenuContent>
            <Menu.SubMenuContent menu={submenu_2}>
                {menuItems.map((v) => (
                    <Menu.SubMenuItem {...v} data-testid={v.value}>
                        {v.valueText}
                    </Menu.SubMenuItem>
                ))}
            </Menu.SubMenuContent>
            <Menu.SubMenuContent menu={submenu_3}>
                {menuItems.map((v) => (
                    <Menu.SubMenuItem {...v} data-testid={v.value}>
                        {v.valueText}
                    </Menu.SubMenuItem>
                ))}
            </Menu.SubMenuContent>
        </>
    );
};

export const Nested = (props: Props) => {
    return (
        <Menu.Root {...props} hoverable>
            <Menu.Trigger asChild>
                <Button data-testid="trigger">Click me</Button>
            </Menu.Trigger>

            <Menu.State>{(parent) => <Content parent={parent} />}</Menu.State>
        </Menu.Root>
    );
};
