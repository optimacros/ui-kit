// @ts-nocheck
import _ from 'lodash'
import React from 'react'

import { WSTabsContainer as ExtTabs } from './ExtTabs'

interface Props {
    active?: number;
    key?: number | string;
    onChange?: (value: number) => void;
    onTabSwitch?: () => void;
    onTabPositionChange?: () => void;
    children?: React.ReactNode;
}

interface State {
    activeTab: number;
}

export class WSTabs extends React.Component<Props, State> {
    state = {
        activeTab: 0,
    }

    componentDidMount() {
        this._setCorrectActiveTab()
    }

    componentDidUpdate(prevProps: Props) {
        this._setTab(prevProps)
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        if (!_.isArray(props.children)) {
            return null
        }

        const children = _.compact(props.children)
        const currentTab = children[state.activeTab]

        if (!currentTab || currentTab.props.disabled) {
            const activeTab = _.findIndex(
                children,
                child => child && !!child.props.disabled == false,
            )

            return { activeTab }
        }

        return null
    }

    render() {
        const { children, ...otherProps } = this.props

        return (
            <ExtTabs
                active={this.state.activeTab}
                onTabSwitch={this._onTabSwitch}
                {...otherProps}
            >
                {this.getTabs()}
            </ExtTabs>
        )
    }

    _onTabSwitch = (index: number) => {
        if (this.props.onChange) {
            this.props.onChange(index)
        }

        this.setState({ activeTab: index })
    }

    _setTab(prevProps: Props) {
        const { key } = this.props

        if (key && key !== prevProps.key) {
            this.setState({
                activeTab: 0,
            })
        }
    }

    getTabs() {
        if (!_.isArray(this.props.children)) {
            return [this.props.children]
        }

        return _.compact(this.props.children)
    }

    _setCorrectActiveTab() {
        if (this._currentTabIsDisabled()) {
            const activeTab = this._getFirstNonDisabledTab()

            this.setState({ activeTab })
        }
    }

    _currentTabIsDisabled() {
        const { children } = this.props

        if (!_.isArray(children)) {
            return false
        }

        const { activeTab } = this.state

        const validChildren = _.compact(children)
        const currentTab = validChildren[activeTab]

        return !currentTab || currentTab.props.disabled
    }

    _getFirstNonDisabledTab() {
        const { children } = this.props

        if (!_.isArray(children)) {
            return null
        }

        const validChildren = _.compact(children)

        return _.findIndex(validChildren, child => !!child.props.disabled == false)
    }
}
