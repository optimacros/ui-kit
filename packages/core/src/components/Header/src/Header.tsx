import React from 'react';
import { forward, styled } from '@optimacros-ui/store';

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
