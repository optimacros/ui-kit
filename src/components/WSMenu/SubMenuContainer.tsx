// @ts-nocheck
import classNames from 'classnames'
import React, { Component } from 'react'
import { FontIcon } from 'ui-kit-core'
import SubMenuList from './SubMenuList'
import styles from './Menu.module.css'

export default class SubMenuContainer extends Component {
    constructor(props) {
        super(props)

        this._rootMenuItemNode = React.createRef()
    }

    state = {
        canShow: false,
    }

    render() {
        const { className, children, label, title, onClick, ...otherProps } = this.props
        const classNameContainer = classNames(
            {
                [styles.MenuItem]: true,
                [styles.MenuItem_disabled]: this.props.disabled,
            },
            className,
        )

        return (
            <li
                {...otherProps}
                className={classNameContainer}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <div
                    ref={this._rootMenuItemNode}
                    className={styles.MenuItemTitleContainer}
                    title={title || label}
                    onClick={this.onClick}
                >
                    <span className={styles.MenuItemTitle}>{label}</span>

                    <span className={styles.MenuItemTitleIcon}>
                        <FontIcon className={styles.MenuItemArrowIcon} value="navigate_next" />
                    </span>
                </div>

                {this.renderSubMenuList()}
            </li>
        )
    }

    renderSubMenuList() {
        if (!this.state.canShow || this.props.disabled) {
            return null
        }

        return <SubMenuList parentNode={this._rootMenuItemNode}>{this.props.children}</SubMenuList>
    }

    onMouseEnter = () => {
        this.setState({ canShow: true })
    }

    onMouseLeave = () => {
        this.setState({ canShow: false })
    }

    onClick = (event) => {
        if (this.props.disabled) {
            event.stopPropagation()
        }

        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick(this.props)
        }
    }
}
