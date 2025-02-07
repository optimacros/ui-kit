import React from 'react';
import { Orientation } from '@optimacros-ui/utils';
import { Navigation as NavigationComponent } from '@optimacros-ui/navigation';

type NavigationTheme = {
    horizontal: string;
    vertical: string;
};

type NavigationType = 'horizontal' | 'vertical';

type BaseNavigationProps = {
    type?: NavigationType;
    vertical?: boolean;
    theme?: Partial<NavigationTheme>;
    className?: string;
    wrap?: boolean;
};

export type NavigationProps = React.PropsWithChildren<BaseNavigationProps>;

const getOrientation = (type: NavigationType, vertical: boolean): Orientation => {
    if (type) {
        return Orientation[type.charAt(0).toUpperCase() + type.slice(1)];
    }
    if (vertical) {
        return Orientation.Vertical;
    }

    return Orientation.Horizontal;
};

export const Navigation = ({ type, children, className, vertical }: NavigationProps) => {
    return (
        <NavigationComponent.Root
            orientation={getOrientation(type, vertical)}
            className={className}
        >
            {children}
        </NavigationComponent.Root>
    );
};
