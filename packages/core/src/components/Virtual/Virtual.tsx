import { createReactStore, forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import { ReactElement, ReactNode, useEffect } from 'react';
import {
    Virtuoso,
    VirtuosoGrid,
    VirtuosoGridProps,
    VirtuosoHandle,
    VirtuosoProps,
} from 'react-virtuoso';

type VirtualContainerBase = {
    items?: Array<ReactNode>;
    children: (data: any, i, context: any) => ReactElement;
};

export const initialState = {
    components: {
        Header: undefined,
        Footer: undefined,
        Group: Group,
        TopItemList: TopItemList,
        Scroller: undefined,
        EmptyPlaceholder: undefined,
        ScrollSeekPlaceholder: undefined,
    },
};

export const {
    Provider,
    useActions: useApi,
    useSelector,
} = createReactStore({
    id: 'virtual',
    initialState,
    actions: {
        keys: ['components'],
    },
});

export const Root = forward<{}, 'div'>((props, ref) => (
    <Provider>
        <styled.div
            style={{
                height: '100%',
                width: '100%',
            }}
            {...props}
            ref={ref}
            data-scope="virtual"
            data-part="root"
        />
    </Provider>
));

export type ListProps = VirtualContainerBase &
    Omit<VirtuosoProps<any, any>, 'children' | 'components'>;
export const List = forward<ListProps, VirtuosoHandle>(
    ({ children, ...rest }, ref) => {
        const components = useSelector(({ components }) => components);

        return (
            <Virtuoso
                data-scope="virtual"
                data-part="list"
                style={{
                    height: '100%',
                    width: '100%',
                }}
                ref={ref}
                itemContent={(i, data, context) => children(data, i, context)}
                components={components}
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

export const Divider = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="virtual" data-part="divider" />
));

export const Header = forward<{}, 'div'>((props, ref) => {
    const { setInComponents } = useApi();

    useEffect(() => {
        setInComponents({
            path: 'Header',
            value: () => (
                <styled.div {...props} ref={ref} data-scope="virtual" data-part="header" />
            ),
        });
    }, [props]);

    return null;
});

export const Footer = forward<{}, 'div'>((props, ref) => {
    const { setInComponents } = useApi();

    useEffect(() => {
        setInComponents({
            path: 'Footer',
            value: () => (
                <styled.div {...props} ref={ref} data-scope="virtual" data-part="footer" />
            ),
        });
    }, [props]);

    return null;
});

export const topItemListClassname = tw``;
function TopItemList(props) {
    return (
        <styled.div
            {...props}
            className={topItemListClassname}
            data-scope="virtual"
            data-part="top-list"
        />
    );
}

export const groupClassname = tw``;
function Group(props) {
    return (
        <styled.div {...props} className={groupClassname} data-scope="virtual" data-part="group" />
    );
}
