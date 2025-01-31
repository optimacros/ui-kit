import React from 'react';
import { Orientation } from '@optimacros-ui/utils';
import { Navigation as NavigationComponent } from '@optimacros-ui/kit';

type NavigationTheme = {
    horizontal: string;
    vertical: string;
};

type BaseNavigationProps = {
    type?: Orientation;
    theme: NavigationTheme;
    className?: string;
    wrap?: boolean;
};

interface Props extends Omit<BaseNavigationProps, 'theme'> {
    theme?: Partial<NavigationTheme>;
}

export type NavigationProps = React.PropsWithChildren<Props>;

export const Navigation: React.FC<NavigationProps> = ({ type, children }) => {
    return <NavigationComponent.Root orientation={type}>{children}</NavigationComponent.Root>;
};
