import { Button } from '@optimacros-ui/button';
import { menuItems } from '../mock';
import { Menu } from '..';

export const Basic = (props) => {
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
};
