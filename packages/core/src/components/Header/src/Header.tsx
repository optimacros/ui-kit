import React, { ComponentProps } from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { Menu } from '@optimacros-ui/menu';

export const { Trigger, Positioner, Content, List, Item } = Menu;

export type HeaderProps = React.PropsWithChildren;

export const Root = forward<HeaderProps, 'header'>((props, ref) => (
    <styled.header {...props} ref={ref} data-scope="header" data-part="root" />
));

export const Icon = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="header" data-part="icon" />
));

export const Badge = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="header" data-part="badge" />
));

export const Notification = forward<{}, 'div'>((props, ref) => {
    return <styled.div {...props} data-scope="header" data-part="notification" ref={ref} />;
});

// TODO Menu
export const MenuRoot = forward<ComponentProps<typeof Menu.Root>, 'div'>((props, ref) => {
    return <Menu.Root {...props} data-tag="header" ref={ref} />;
});
