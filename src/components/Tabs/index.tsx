import { compact, findIndex, isArray } from 'lodash'
import React from 'react'

import { TabsContainer } from './ExtTabs'
import type { TabsContainerProps } from './ExtTabs/TabsContainer'
import type { TabProps } from './Tab'

interface Props extends Omit<TabsContainerProps, 'active'> {
    active?: number;
    onChange?: (index: number) => void;
}

type State = {
    activeTab: number;
}

export class Tabs extends React.Component<React.PropsWithChildren<Props>, State> {
    constructor(props: React.PropsWithChildren<Props>) {
        super(props)

        this.setCorrectActiveTab(this.props, this.state)
    }

    state = {
        activeTab: this.props.active ?? 0,
    }

    static getDerivedStateFromProps(props: React.PropsWithChildren<Props>, state: State): State | null {
        if (currentTabIsDisabled(props, state)) {
            const activeTab = getFirstNonDisabledTab(props) ?? 0

            return { activeTab }
        }

        return null
    }

    render(): React.JSX.Element {
        const {
            children,
            onChange,
            ...otherProps
        } = this.props

        return (
            <TabsContainer
                {...otherProps}
                active={this.state.activeTab}
                onTabSwitch={this.onTabSwitch}
            >
                {this.renderContent()}
            </TabsContainer>
        )
    }

    renderContent(): React.ReactElement<TabProps>[] {
        if (!isArray(this.props.children)) {
            return [this.props.children]
        }

        return compact(this.props.children)
    }

    private onTabSwitch = (index: number): void => {
        if (this.props.onChange) {
            this.props.onChange(index)
        }

        this.setActiveTab(index)
    }

    private setCorrectActiveTab(props: React.PropsWithChildren<Props>, state: State): void {
        if (currentTabIsDisabled(props, state)) {
            const activeTab = getFirstNonDisabledTab(props) ?? 0

            this.setActiveTab(activeTab)
        }
    }

    private setActiveTab(activeTab: number): void {
        this.setState({ activeTab })
    }
}

function currentTabIsDisabled(props: React.PropsWithChildren<Props>, state: State): boolean {
    if (!isArray(props.children)) {
        return false
    }

    const children = compact(props.children)
    const currentTab = children[state.activeTab]

    return currentTab?.props.disabled ?? false
}

function getFirstNonDisabledTab(props: React.PropsWithChildren<Props>): number | null {
    if (!isArray(props.children)) {
        return null
    }

    const children = compact(props.children)

    return findIndex(children, (child) => child && !child.props.disabled)
}
