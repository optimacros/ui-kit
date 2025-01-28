import React from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { Align } from '@optimacros-ui/utils';

export interface ToolbarProps {
    align?: Align;
    isSmall?: boolean;
}

export const Root = forward<React.PropsWithChildren<ToolbarProps>, 'div'>(
    ({ isSmall = false, ...rest }, ref) => (
        <styled.div
            {...rest}
            ref={ref}
            data-scope="toolbar"
            data-part="root"
            // TODO data-size=small|default? какой у нас подход?
            // не должны ли мы align передавать как data-align? rightInRow же не будет работать
            data-small={isSmall}
        />
    ),
);
