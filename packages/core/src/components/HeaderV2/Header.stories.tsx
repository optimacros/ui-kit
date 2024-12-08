import { ICONS_MAP } from '@optimacros/themes';
import { Icon } from '@optimacros/ui-kit-core';
import type { ReactNode } from 'react';
import { Header } from './index';

const Wrapper = ({ children }: { children: ReactNode }) => {
    return <div style={{ clipPath: 'xywh(0px 1px 100% 120%)' }}>{children}</div>;
};

export default {
    title: 'UI Kit core/HeaderV2',
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
