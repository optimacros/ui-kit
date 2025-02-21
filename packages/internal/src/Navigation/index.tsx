import type React from 'react';
import { Orientation } from '@optimacros-ui/utils';
import { Navigation as NavigationComponent } from '@optimacros-ui/navigation';
import { forward } from '@optimacros-ui/store';

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

export const Navigation = forward<NavigationProps, 'nav'>(
    ({ type, children, className, vertical }, ref) => {
        return (
            <NavigationComponent.Root
                orientation={getOrientation(type, vertical)}
                className={className}
                ref={ref}
            >
                {children}
            </NavigationComponent.Root>
        );
    },
);
