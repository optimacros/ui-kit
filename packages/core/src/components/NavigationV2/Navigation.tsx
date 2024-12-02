import React from 'react';
import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import { Orientation } from '../../constants';

export type BaseNavigationProps = {
    orientation?: Orientation;
    isWrap?: boolean;
};

export type NavigationProps = React.PropsWithChildren<BaseNavigationProps>;

export const rootClassName = tw`
flex p-0 m-[5px_0] flex-shrink-0 items-center max-w-full space-y-[0.19rem]
box-border font-preferred antialiased [text-size-adjust:full] p-0
`;
export const Root = forward<NavigationProps, 'nav'>(
    ({ orientation = Orientation.Horizontal, isWrap = false, ...rest }, ref) => (
        <styled.nav
            {...rest}
            ref={ref}
            data-scope="navigation"
            data-part="root"
            data-orientation={orientation}
            data-is-wrap={isWrap}
            className={rootClassName}
        />
    ),
);
