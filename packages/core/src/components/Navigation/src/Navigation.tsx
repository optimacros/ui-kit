import React from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { Orientation } from '@optimacros-ui/utils';

export type NavigationProps = React.PropsWithChildren<{ orientation?: Orientation }>;
export const Root = forward<NavigationProps, 'nav'>(
    ({ orientation = Orientation.Horizontal, ...rest }, ref) => (
        <styled.nav
            {...rest}
            ref={ref}
            data-scope="navigation"
            data-part="root"
            data-orientation={orientation}
        />
    ),
);
