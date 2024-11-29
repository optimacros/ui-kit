import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { isEqual } from '@optimacros/ui-kit-utils';
import { mergeStyles } from '@optimacros/ui-kit-utils';

import type { NavigationProps as BaseNavigationProps, NavigationTheme } from './BaseNavigation';
import navigationTheme from './Navigation.module.css';

export interface Props extends Omit<BaseNavigationProps, 'theme'> {
    theme?: Partial<NavigationTheme>;
}

export type NavigationProps = React.PropsWithChildren<Props>;

const Navigation: React.FC<NavigationProps> = ({
    theme: propTheme,
    className,
    vertical,
    wrap,
    children,
    ...restProps
}) => {
    const [theme, setTheme] = useState<NavigationTheme>(navigationTheme);

    useEffect(() => {
        const updatedTheme = propTheme ? mergeStyles(propTheme, navigationTheme) : navigationTheme;
        if (!isEqual(theme, updatedTheme)) {
            setTheme(updatedTheme);
        }
    }, [propTheme, theme]);

    const containerClassName = classNames(className, {
        [navigationTheme.NavigationContainer]: true,
        [navigationTheme.NavigationContainer_Vertical]: vertical ?? false,
        [navigationTheme.NavigationContainer_Wrap]: wrap,
    });

    const classes = classNames(theme[vertical ? 'vertical' : 'horizontal'], className);

    return (
        <nav data-react-toolbox="navigation" className={classes}>
            {React.Children.map(children, (child) =>
                React.isValidElement(child) ? React.cloneElement(child, { theme }) : null,
            )}
        </nav>
    );
};

export default Navigation;
