import { Button } from '@optimacros-ui/button';
import { menuItems } from '../mock';
import { Menu } from '..';

export const ContextMenu = (props) => {
    return (
        <Menu.Root {...props}>
            <Menu.ContextMenuTrigger asChild>
                <Button data-testid="trigger">Click me</Button>
            </Menu.ContextMenuTrigger>
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
};
