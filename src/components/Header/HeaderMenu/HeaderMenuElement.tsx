// @ts-nocheck
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react'
import React from 'react'

import HeaderMenuElementContainer from './HeaderMenuElementContainer'
import HeaderSubMenu from './HeaderSubMenu'

import styles from './HeaderMenu.module.css'

interface Props {
    firstLevel: boolean;
    element: Element;
    rootElementNode: Node;
    elements: Array<Element>;
}

@observer
export class HeaderMenuElement extends React.Component<Props> {
    constructor(props) {
        super(props)

        this._node = React.createRef()
    }

    state = {
        showMenu: false,
    }

    render() {
        const { element } = this.props

        if (element.hidden) {
            return null
        }

        const className = classNames({
            [styles.MenuItem]: true,
            [styles.MenuItem__disabled]: element.disabled,
            [styles.MenuItem_child]: element.isChild,
            [styles.MenuItem_parent]: element.isParent,
        })

        return (
            <li
                ref={this._node}
                className={className}
                title={element.tooltip || element.title}
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}
            >
                <HeaderMenuElementContainer
                    element={element}
                    isFirstLevel={this.props.firstLevel}
                />
                {this.renderSubMenu()}
            </li>
        )
    }

    renderSubMenu() {
        const { element } = this.props

        if (!this.state.showMenu || _.isEmpty(element.children)) {
            return null
        }

        return (
            <HeaderSubMenu
                element={element}
                elements={element.children}
                firstLevel={this.props.firstLevel}
                rootElementNode={this._node}
            />
        )
    }

    _onMouseEnter = () => {
        this.setState(() => {
            return {
                showMenu: true,
            }
        })
    }

    _onMouseLeave = () => {
        this.setState(() => {
            return {
                showMenu: false,
            }
        })
    }
}
