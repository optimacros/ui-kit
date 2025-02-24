import { Icon } from '@optimacros-ui/kit';
import { Menu } from '@optimacros-ui/menu';
import { Orientation } from '../../../constants';
import { headerMenuItems } from './mock';
import { Header } from '.';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

const argTypes: ArgTypes<ComponentProps<typeof Header.Root>> = {
    children: {
        control: 'text',
        description: 'Header content',
        table: { type: { summary: 'ReactNode' } },
    },
    as: {
        table: { disable: true },
    },
    asChild: {
        table: { disable: true },
    },
};

const meta: Meta<typeof Header.Root> = {
    title: 'UI Kit core/Header',
    component: Header.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Header.Root>;

export const Base: Story = {
    render: (props) => <Header.Root {...props}>Header</Header.Root>,
};

export const Notification: Story = {
    render: (props) => (
        <Header.Root {...props}>
            <Header.Notification>
                <Header.Badge> 9 </Header.Badge>
                <Header.Icon>
                    <Icon value="bell" />
                </Header.Icon>
            </Header.Notification>
        </Header.Root>
    ),
};

export const MenuExample: Story = {
    render: (props) => (
        <Header.Root {...props}>
            <Menu.Root orientation={Orientation.Vertical}>
                <Menu.Trigger asChild>
                    <div>User Name</div>
                </Menu.Trigger>
                <Menu.Positioner portalled>
                    <Menu.Content>
                        <Menu.List>
                            {headerMenuItems.map((item) => (
                                <Menu.Item key={item.value} {...item}>
                                    {item.valueText}
                                </Menu.Item>
                            ))}
                        </Menu.List>
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>
        </Header.Root>
    ),
    tags: ['skip-test-runner'],
};
