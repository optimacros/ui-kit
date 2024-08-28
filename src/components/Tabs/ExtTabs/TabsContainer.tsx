import React, { Component } from 'react'
import classNames from 'classnames'
import { mergeStyles } from '../../../utils'
import TabHeader from './TabHeader'
import TabContent from './TabContent'

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
    theme?: {
        TabsContainer?: string;
    };
}

// eslint-disable-next-line react/prefer-stateless-function
class TabsContainer extends Component<Props> {
    static defaultProps = {
        hideTabHeader: false,
        theme: {
            TabsContainer: 'TabsContainer__TabsContainer',
        },
    }

    render() {
        const theme = mergeStyles(this.props.theme, styles)
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

export default TabsContainer
