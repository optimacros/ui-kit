import classNames from 'classnames'
import React, { Component } from 'react'

import type { TabContentTheme } from './TabContent'
import { TabContent } from './TabContent'
import type { TabHeaderTheme } from './TabHeader'
import { TabHeader } from './TabHeader'
import { mergeStyles } from '../../../utils/mergeStyle'
import { ButtonMenuTheme } from '../../ButtonMenu'
import type { TabProps } from '../Tab'

import styles from './TabsContainer.module.css'

export type TabsContainerTheme = {
    TabsContainer: string;
} & TabContentTheme & TabHeaderTheme & ButtonMenuTheme

export type TabsContainerProps = {
    active: number; // currentActiveTab number
    children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
    className?: string;
    draggable?: boolean;
    onTabSwitch?: (index: number) => void;
    onTabPositionChange?: (newIndex: number, oldIndex: number) => void;
    hideTabHeader?: boolean;
    headerClassName?: string;
    contentClassName?: string;
    theme?: Partial<TabsContainerTheme>;
}

export class TabsContainer extends Component<TabsContainerProps> {
    render(): React.JSX.Element {
        const {
            headerClassName,
            contentClassName,
            theme: customTheme = {},
            children,
            ...otherProps
        } = this.props

        const theme = mergeStyles(customTheme, styles) as TabsContainerTheme

        const className = classNames(theme.TabsContainer, this.props.className)

        return (
            <div className={className}>
                {!this.props.hideTabHeader && (
                    <TabHeader
                        {...otherProps}
                        className={headerClassName}
                        theme={theme}
                    >
                        {this.props.children as React.ReactElement<TabProps>[]}
                    </TabHeader>
                )}

                <TabContent
                    {...otherProps}
                    className={contentClassName}
                    theme={theme}
                >
                    {this.props.children as React.ReactElement<TabProps>[]}
                </TabContent>
            </div>
        )
    }
}
