import { forward, styled } from '@optimacros-ui/store';
import { ReactElement, ReactNode } from 'react';

export type ListProps = { children: ReactNode | ReactElement };

export const List = forward<ListProps, 'ul'>(({ children, ...rest }, ref) => {
    return (
        <styled.ul {...rest} ref={ref} data-scope="menu" data-part="list">
            {children}
        </styled.ul>
    );
});
