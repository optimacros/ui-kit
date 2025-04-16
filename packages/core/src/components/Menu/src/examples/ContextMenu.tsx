import { Button } from '@optimacros-ui/button';
import { Menu } from '..';
import { Props } from '../menu.machine';
import { menuItems } from '../mock';

export const ContextMenu = (props: Props) => {
    return (
        <Menu.Root {...props}>
            <Menu.ContextTrigger asChild>
                <Button>Click me</Button>
            </Menu.ContextTrigger>
            <Menu.Positioner>
                <Menu.Content>
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
};
