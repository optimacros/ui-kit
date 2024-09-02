import classNames from 'classnames'
import { map } from 'lodash'
import React, { Component } from 'react'

import type { TabsContainerProps, TabsContainerTheme } from './TabsContainer'
import { mergeStyles } from '../../../utils/mergeStyle'
import type { TabProps } from '../Tab'

import styles from './TabContent.module.css'

export type TabContentTheme = {
    TabContent: string;
    TabContent_Inner: string;
}

type Props = Omit<TabsContainerProps, 'headerClassName' | 'contentClassName'> & {
    children: React.ReactElement<TabProps>[];
    className?: string;
    theme?: Partial<TabContentTheme>;
}

export class TabContent extends Component<Props> {
    render(): React.JSX.Element {
        const theme = this.getTheme
        const className = classNames(theme.TabContent, this.props.className)

        return (
            <div className={className}>
                {this.renderPanel()}
            </div>
        )
    }

    renderPanel(): (React.JSX.Element | null)[] {
        const theme = this.getTheme
        const active = this.props.active ?? 0

        return map(this.props.children, (panel, index) => {
            if (active !== Number(index)) {
                return null
            }

            return (
                <div
                    className={theme.TabContent_Inner}
                    key={`panel-${index}`}
                >
                    {panel}
                </div>
            )
        })
    }

    private get getTheme(): TabsContainerTheme {
        const customTheme = this.props.theme ?? {}

        return mergeStyles(customTheme, styles) as TabsContainerTheme
    }
}
