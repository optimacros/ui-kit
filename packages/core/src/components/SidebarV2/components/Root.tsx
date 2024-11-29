import { ComponentProps, CSSProperties, FC, PropsWithChildren } from 'react';
import { RootProvider } from '../context';
import { isFunction } from '@optimacros/ui-kit-utils';

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>> & {
    open: boolean;
    width?: CSSProperties['width'];
    position?: 'left' | 'right';
};

export const Root: FC<RootProps> = ({
    children,
    open,
    width = 300,
    position = 'right',
    ...context
}) => {
    return (
        <RootProvider {...context} state={{ open, position, width }}>
            {(api) => (isFunction(children) ? children(api) : children)}
        </RootProvider>
    );
};
