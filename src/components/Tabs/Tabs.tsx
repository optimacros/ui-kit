// @ts-nocheck
import _ from 'lodash'
import React from 'react'

import { TabsContainer as ExtTabs } from './ExtTabs'

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

export class Tabs extends React.Component<Props, State> {
    state = {
        activeTab: 0,
    }

    componentDidMount() {
        this._setCorrectActiveTab(this.props, this.state)
    }

    componentDidUpdate(prevProps: Props) {
        this._setTab(prevProps)
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        if (!_.isArray(props.children)) {
            return false
        }

        const children = _.compact(props.children)
        const currentTab = children[state.activeTab]

        if (!currentTab || currentTab.props.disabled) {
            if (!_.isArray(props.children)) {
                return null
            }

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
                {this.renderContent()}
            </ExtTabs>
        )
    }

    renderContent() {
        return this.getTabs()
    }

    _onTabSwitch = (index: number) => {
        if (this.props.onChange) {
            this.props.onChange(index)
        }

        this._setActiveTab(index)
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

    _setCorrectActiveTab(props, state) {
        if (this._currentTabIsDisabled(props, state)) {
            const activeTab = this._getFirstNonDisabledTab(props)

            this.setState({ activeTab })
        }
    }

    _currentTabIsDisabled(props, state) {
        if (!_.isArray(props.children)) {
            return false
        }

        const children = _.compact(props.children)
        const currentTab = children[state.activeTab]

        return !currentTab || currentTab.props.disabled
    }

    _getFirstNonDisabledTab(props) {
        if (!_.isArray(props.children)) {
            return null
        }

        const children = _.compact(props.children)

        return _.findIndex(children, child => child && !!child.props.disabled == false)
    }

    _setActiveTab(activeTab: number) {
        this.setState({ activeTab })
    }
}
