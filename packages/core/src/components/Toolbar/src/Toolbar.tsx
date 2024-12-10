import React from 'react';
import { tw, Align } from '@optimacros-ui/utils';
import { forward, styled } from '@optimacros-ui/store';

export type Props = {
    align?: Align;
    isSmall?: boolean;
};

export type ToolbarProps = React.PropsWithChildren<Props>;

export const rootClassName = tw`clear-both mt-12`;
export const Root = forward<ToolbarProps, 'div'>(
    ({ isSmall = false, align = Align.Left, ...rest }, ref) => (
        <styled.div
            {...rest}
            ref={ref}
            data-scope="toolbar"
            data-part="root"
            data-is-small={isSmall}
            data-align={align}
            className={rootClassName}
        />
    ),
);
