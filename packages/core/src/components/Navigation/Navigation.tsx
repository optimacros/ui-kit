import classNames from 'classnames';
import { isEqual } from 'lodash';
import React from 'react';

import type { NavigationProps as BaseNavigationProps, NavigationTheme } from './BaseNavigation';
import { BaseNavigation } from './BaseNavigation';
import { mergeStyles } from '@optimacros/ui-kit-utils';

import navigationTheme from './Navigation.module.css';

export interface Props extends Omit<BaseNavigationProps, 'theme'> {
    theme?: Partial<NavigationTheme>;
}

interface State {
    theme: NavigationTheme;
}

export type NavigationProps = React.PropsWithChildren<Props>;

export class Navigation extends React.PureComponent<NavigationProps, State> {
    state = {
        theme: {} as NavigationTheme,
    };

    static getDerivedStateFromProps(props: React.PropsWithChildren<Props>, state: State) {
        const updatedTheme = props.theme
            ? mergeStyles(props.theme, navigationTheme)
            : navigationTheme;
        const theme = isEqual(state.theme, updatedTheme) ? state.theme : updatedTheme;

        return {
            theme,
        };
    }

    render(): React.JSX.Element {
        const { theme } = this.state;

        const className = classNames(this.props.className, {
            [navigationTheme.NavigationContainer]: true,
            [navigationTheme.NavigationContainer_Vertical]: this.props.vertical ?? false,
            [navigationTheme.NavigationContainer_Wrap]: this.props.wrap,
        });

        return <BaseNavigation {...this.props} theme={theme} className={className} />;
    }
}
