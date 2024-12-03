import React from 'react';
import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import { Orientation } from '../../constants';

export type NavigationProps = React.PropsWithChildren<{ orientation?: Orientation }>;

export const rootClassName = tw`
flex flex-wrap p-0 m-[0.3rem_0] flex-shrink-0 items-center space-y-[0.19rem] space-x-1.5
max-w-full box-border font-preferred antialiased [text-size-adjust:full] p-0 max-h-full
 
data-[orientation="vertical"]:flex-col
data-[orientation="vertical"]:mr-0
data-[orientation="vertical"]:mb-1.5
`;
export const Root = forward<NavigationProps, 'nav'>(
    ({ orientation = Orientation.Horizontal, ...rest }, ref) => (
        <styled.nav
            {...rest}
            ref={ref}
            data-scope="navigation"
            data-part="root"
            data-orientation={orientation}
            className={rootClassName}
        />
    ),
);
