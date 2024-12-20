import type { ReactNode } from 'react';
import { ICONS_MAP } from '@optimacros-ui/themes';
import { Icon } from '@optimacros-ui/core';
import { Header } from '.';
import { Orientation } from '../../../constants';
import { headerMenuItems } from './mock';

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

export const Menu = (props) => {
    return (
        <Header.Root {...props}>
            <Header.MenuRoot orientation={Orientation.Vertical}>
                <Header.Trigger asChild>
                    <div>User Name</div>
                </Header.Trigger>
                <Header.Positioner>
                    <Header.Content>
                        <Header.List>
                            {headerMenuItems.map((item) => (
                                <Header.Item {...item} />
                            ))}
                        </Header.List>
                    </Header.Content>
                </Header.Positioner>
            </Header.MenuRoot>
        </Header.Root>
    );
};
