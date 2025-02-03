//@ts-nocheck

import type { ReactNode } from 'react';
import { ICONS_MAP } from '@optimacros-ui/themes';
import { Icon } from '@optimacros-ui/kit';
import { Header } from '.';
import { Orientation } from '../../../constants';
import { headerMenuItems } from './mock';
import { Menu } from '@optimacros-ui/menu';

const Wrapper = ({ children }: { children: ReactNode }) => {
    return <div style={{ clipPath: 'xywh(0px 1px 100% 120%)' }}>{children}</div>;
};

export default {
    title: 'UI Kit core/Header',
    component: Header.Root,
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Base = (props) => {
    return <Header.Root {...props}> Header </Header.Root>;
};

export const Notification = (props) => {
    return (
        <Header.Root {...props}>
            <Header.Notification>
                <Header.Badge> 9 </Header.Badge>
                <Header.Icon>
                    <Icon value={ICONS_MAP.bell} />
                </Header.Icon>
            </Header.Notification>
        </Header.Root>
    );
};

export const MenuExample = (props) => {
    return (
        <Header.Root {...props}>
            <Menu.Root orientation={Orientation.Vertical}>
                <Menu.Trigger asChild>
                    <div>User Name</div>
                </Menu.Trigger>
                <Menu.Positioner portalled>
                    <Menu.Content>
                        <Menu.List>
                            {headerMenuItems.map((item) => (
                                <Menu.Item {...item} />
                            ))}
                        </Menu.List>
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>
        </Header.Root>
    );
};
