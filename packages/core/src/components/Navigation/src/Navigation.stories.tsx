import { ReactNode } from 'react';
import { menu, Menu } from '@optimacros-ui/core';
import { Orientation } from '@optimacros-ui/utils';
import { Button } from '@optimacros-ui/button';
import { Header } from '@optimacros-ui/header';
import { Divider } from '@optimacros-ui/divider';
import { Flex } from '@optimacros-ui/flex';
import { Navigation } from './index';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '600px' }}>{children}</div>
);

export default {
    title: 'UI Kit core/Navigation',
    component: Navigation.Root,
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: 'radio',
            options: ['horizontal', 'vertical'],
            table: {
                defaultValue: { summary: 'horizontal' },
            },
            description: 'Type of the navigation.',
        },
    },
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

const Children = (
    <>
        <Button> Portfolio </Button>
        <Button> About </Button>
        <Button> Menu </Button>
        <Button> Location </Button>
        <Button> Contacts </Button>
    </>
);

export const Base = (props) => {
    return <Navigation.Root {...props}>{Children}</Navigation.Root>;
};

export const Horizontal = (props) => {
    return (
        <Navigation.Root {...props} orientation={Orientation.Horizontal}>
            {Children}
        </Navigation.Root>
    );
};

export const Vertical = (props) => {
    return (
        <Navigation.Root {...props} orientation={Orientation.Vertical}>
            {Children}
        </Navigation.Root>
    );
};

export const WithHeader = (props) => {
    const Item = ({ children }) => (
        <Flex align="center">
            <a href="#" style={{ textDecoration: 'none', marginLeft: '10px' }}>
                {children}
            </a>
        </Flex>
    );
    return (
        <Header.Root>
            <Navigation.Root {...props} orientation={Orientation.Horizontal}>
                <Item>Portfolio</Item>
                <Divider orientation={Orientation.Vertical} />
                <Item>About</Item>
                <Divider orientation={Orientation.Vertical} />
                <Item>Menu</Item>
                <Divider orientation={Orientation.Vertical} />
                <Item>Location</Item>
                <Divider orientation={Orientation.Vertical} />
                <Item>Contacts</Item>
            </Navigation.Root>
        </Header.Root>
    );
};

const createMenuItems = (count: number): Array<menu.ItemProps> => {
    return new Array(count).fill(0).map((v, i) => ({
        value: `value ${i}`,
        valueText: `value ${i}`,
        key: `value ${i}`,
        closeOnSelect: true,
    }));
};
const menuItems: Array<menu.ItemProps> = createMenuItems(10);

export const WithMenu = (props) => {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <div>Click me</div>
            </Menu.Trigger>
            <Menu.Positioner>
                <Menu.Content>
                    <Navigation.Root {...props} orientation={Orientation.Vertical}>
                        <Menu.List>
                            {menuItems.map((item) => (
                                <Menu.Item {...item} />
                            ))}
                        </Menu.List>
                    </Navigation.Root>
                </Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
    );
};
