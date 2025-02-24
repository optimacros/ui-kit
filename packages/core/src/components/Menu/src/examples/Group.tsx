import { Button } from '@optimacros-ui/button';
import { Flex } from '@optimacros-ui/flex';
import { Spacer } from '@optimacros-ui/spacer';
import { menuItems } from '../mock';
import { Menu } from '..';

export const Group = (props) => {
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
};
