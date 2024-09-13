// @ts-nocheck
import classNames from 'classnames'
import { Component } from 'react'

import { TabContent } from './TabContent'
import { TabHeader } from './TabHeader'
import { mergeStyles } from '../../../utils'

import styles from './TabsContainer.module.css'

interface Props {
    className?: string;
    active?: number;
    draggable?: boolean;
    onTabSwitch?: () => void;
    onTabPositionChange?: () => void;
    hideTabHeader?: boolean;
    headerClassName?: string;
    contentClassName?: string;
    theme: {
        TabsContainer: string;
    };
}

// eslint-disable-next-line react/prefer-stateless-function
export class TabsContainer extends Component<Props> {
    static defaultProps = {
        hideTabHeader: false,
        theme: {
            TabsContainer: 'TabsContainer__TabsContainer',
        },
    }

    render() {
        const theme = mergeStyles(this.props.theme, styles) as Props['theme']

        const { headerClassName, contentClassName, ...otherProps } = this.props
        const className = classNames(theme.TabsContainer, this.props.className)

        return (
            <div className={className}>
                {!this.props.hideTabHeader && (
                    <TabHeader
                        {...otherProps}
                        className={headerClassName}
                        theme={theme}
                    />
                )}

                <TabContent
                    {...otherProps}
                    className={contentClassName}
                    theme={theme}
                />
            </div>
        )
    }
}
