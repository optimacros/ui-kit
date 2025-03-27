import { Button } from '@optimacros-ui/button';
import { Menu } from '..';
import { Props } from '../menu.machine';
import { menuItems } from '../mock';

export const Basic = (props: Props) => {
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
