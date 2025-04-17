import { Button } from '@optimacros-ui/button';
import { Menu } from '..';
import { Props } from '../menu.machine';
import { menuItems } from '../mock';
import { Orientation } from '@optimacros-ui/utils';
import { Flex } from '../../../Flex/src/Flex';
import { Spacer } from '../../../Spacer/src/Spacer';

export const Group = (props: Props) => {
    return (
        <Menu.Root {...props}>
            <Menu.Trigger asChild>
                <Button>Click me</Button>
            </Menu.Trigger>
            <Menu.Positioner>
                <Menu.Content>
                    <Flex direction="column">
                        <Menu.Group id="first">
                            <Menu.GroupLabel htmlFor="first">first</Menu.GroupLabel>
                            {menuItems.slice(0, 2).map((v) => (
                                <Menu.Item {...v} key={`${v.value} 1`}>
                                    {v.valueText}
                                </Menu.Item>
                            ))}
                        </Menu.Group>

                        <Spacer size={3} orientation={Orientation.Vertical} />

                        <Menu.Group id="second">
                            <Menu.GroupLabel htmlFor="second">second</Menu.GroupLabel>
                            {menuItems.slice(3, 5).map((v) => (
                                <Menu.Item {...v} key={`${v.value} 2`}>
                                    {v.valueText}
                                </Menu.Item>
                            ))}
                        </Menu.Group>

                        <Spacer size={3} orientation={Orientation.Vertical} />

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
