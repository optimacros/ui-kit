import { forward, styled } from '@optimacros/ui-kit-store';
import { ReactElement, ReactNode } from 'react';
import {
    Virtuoso,
    VirtuosoGrid,
    VirtuosoGridProps,
    VirtuosoHandle,
    VirtuosoProps,
} from 'react-virtuoso';

type VirtualContainerBase = {
    items?: Array<ReactNode>;
};

export const Root = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="virtual" data-part="root" />
));

export type ListProps = VirtualContainerBase & VirtuosoProps<any, any>;
export const List = forward<
    ListProps & {
        children: (i, data: any, context: any) => ReactElement;
    },
    VirtuosoHandle
>(
    ({ children, ...rest }, ref) => {
        return (
            <Virtuoso
                data-scope="virtual"
                data-part="list"
                style={{
                    height: '100%',
                    width: '100%',
                }}
                ref={ref}
                itemContent={children}
                {...rest}
            />
        );
    },
    {
        memoize: true,
    },
);

export type GridProps = VirtualContainerBase & VirtuosoGridProps<any, any>;
export const Grid = forward<GridProps, VirtuosoHandle>(
    (props, ref) => {
        return (
            <VirtuosoGrid
                data-scope="virtual"
                data-part="grid"
                style={{
                    height: '100%',
                    width: '100%',
                }}
                ref={ref}
                {...props}
            />
        );
    },
    {
        memoize: true,
    },
);

export const Item = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="virtual" data-part="item" />
));
