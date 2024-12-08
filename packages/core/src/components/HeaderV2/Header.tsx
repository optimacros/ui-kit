import React, { ComponentProps } from 'react';
import { tw } from '@optimacros/ui-kit-utils';
import { forward, styled } from '@optimacros/ui-kit-store';
import { Menu } from '../Menu';
export * from '../Menu/Menu';

export type HeaderProps = React.PropsWithChildren;

export const rootClassName = tw`
relative w-full h-[1.875rem] pr-4 bg-header flex
justify-between items-center flex-shrink-0 text-header-text
shadow-[0px_-0.313rem_0.5rem_0px_rgba(0,0,0,1)] z-3
`;
export const Root = forward<HeaderProps, 'header'>((props, ref) => (
    <styled.header
        {...props}
        ref={ref}
        data-scope="header"
        data-part="root"
        className={rootClassName}
    />
));

export const iconClassName = tw`
  flex items-center size-[1.125rem]
  hover:opacity-70 transition-opacity duration-[0.6s] ease
`;
export const Icon = forward<{}, 'div'>((props, ref) => (
    <styled.div
        {...props}
        ref={ref}
        className={iconClassName}
        data-scope="header"
        data-part="icon"
    />
));

export const badgeClassName = tw`
  flex justify-center items-center absolute box-border font-normal text-[0.5rem] size-[0.75rem] rounded-full z-[1] right-0 top-0
  text-notification-badge-text bg-notification-badge transform scale-100 translate-x-[-0.1875rem] translate-y-[0.3125rem]
`;
export const Badge = forward<{}, 'div'>((props, ref) => (
    <styled.div
        {...props}
        ref={ref}
        className={badgeClassName}
        data-scope="header"
        data-part="badge"
    />
));

export const notificationClassName = tw`
  relative mr-[0.1875rem] p-[0.3125rem] cursor-pointer text-[--var(--color-white)]
`;
export const Notification = forward<{}, 'div'>((props, ref) => {
    return (
        <styled.div
            {...props}
            data-scope="header"
            data-part="notification"
            ref={ref}
            className={notificationClassName}
        />
    );
});

// TODO Menu
export const MenuRoot = forward<ComponentProps<typeof Menu.Root>, 'div'>((props, ref) => {
    return <Menu.Root {...props} data-tag="header" ref={ref} />;
});
