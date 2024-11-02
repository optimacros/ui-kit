import classnames from 'classnames';
import { isEqual } from 'lodash';
import React from 'react';

import { mergeStyles } from '@optimacros/ui-kit-utils';

import themeStyles from './navigationTheme.module.css';

export type NavigationTheme = {
    horizontal: string;
    vertical: string;
};

export type NavigationProps = {
    vertical?: boolean;
    theme: NavigationTheme;
    className?: string;
    wrap?: boolean;
};

interface State {
    theme: NavigationTheme;
}

export class BaseNavigation extends React.PureComponent<
    React.PropsWithChildren<NavigationProps>,
    State
> {
    state = {
        theme: {} as NavigationTheme,
    };

    static getDerivedStateFromProps(props: React.PropsWithChildren<NavigationProps>, state: State) {
        const updatedTheme = props.theme ? mergeStyles(props.theme, themeStyles) : themeStyles;
        const theme = isEqual(state.theme, updatedTheme) ? state.theme : updatedTheme;

        return {
            theme,
        };
    }

    render() {
        const { theme } = this.state;

        const classes = classnames(
            theme[this.props.vertical ? 'vertical' : 'horizontal'],
            this.props.className,
        );

        return (
            <nav data-react-toolbox="navigation" className={classes}>
                {React.Children.map(this.props.children, (child) =>
                    React.isValidElement(child) ? React.cloneElement<any>(child, { theme }) : null,
                )}
            </nav>
        );
    }
}
