import { Divider } from '@optimacros-ui/divider';
import { Flex } from '@optimacros-ui/flex';
import { Header } from '@optimacros-ui/header';
import { Icon } from '@optimacros-ui/icon';
import { Orientation } from 'packages/utils/src/constants';
import { Navigation } from '..';
import { Menu } from '@optimacros-ui/menu';
import { Button } from '@optimacros-ui/button';
import { Badge } from '@optimacros-ui/badge';
import { menuItems } from '../../../Menu/src/mock';

const Item = ({ children }) => (
    <Flex align="center">
        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
            {children}
        </a>
    </Flex>
);

export const WsFeHeader = (props: Navigation.NavigationProps) => {
    return (
        <Header.Root>
            <Flex gap="1">
                <Icon data-react-toolbox="font-icon" aria-label="" value="menu" />
                <div>OM CRM ##3.0 New (planar)</div>
            </Flex>

            <Divider orientation={Orientation.Vertical} />

            <Navigation.Root {...props} orientation={Orientation.Horizontal}>
                <Flex gap="2">
                    <Item>Portfolio</Item>
                    <Item>About</Item>
                    <Item>Menu</Item>
                    <Item>Location</Item>
                    <Item>Contacts</Item>
                </Flex>
            </Navigation.Root>

            <Divider orientation={Orientation.Vertical} />

            <Menu.Root>
                <Menu.Trigger asChild>
                    <Button variant="transparent" size="sm">
                        <Badge count={10} position="top-right" size="10px" offset={-1}>
                            <Icon value="bell" size="4" />
                        </Badge>
                        Georgiy Zhuravlev
                    </Button>
                </Menu.Trigger>

                <Menu.Positioner>
                    <Menu.Content>
                        <Navigation.Root {...props} orientation={Orientation.Vertical}>
                            <Menu.List>
                                {menuItems.map((item) => (
                                    <Menu.Item {...item} key={item.value}>
                                        {item.valueText}
                                    </Menu.Item>
                                ))}
                            </Menu.List>
                        </Navigation.Root>
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>
        </Header.Root>
    );
};
