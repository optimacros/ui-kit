// @ts-nocheck
import classNames from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'
import { FontIcon } from 'ui-kit-core'

import styles from './styles.module.css'

interface Props {
	state: any;
	children: any;
	header: any;
	subHeader: any;
	hideInPrintMode: boolean;
	onDragOver: any;
}

@observer
export class Contents extends React.Component<Props> {
    state = {
        isScrolled: false,
    }

    render() {
        const className = classNames({
            Contents: true,
            [styles.main]: true,
            [styles.mainMini]: !this._contents.opened,
            hideInPrintMode: this.props.hideInPrintMode,
        })

        return this._contents.opened
            ? this.renderOpened(className)
            : this.renderClosed(className)
    }

    renderOpened(className) {
        return (
            <div
                className={className}
                onDragOver={this.props.onDragOver}
                onScroll={this._onScroll}
            >
                {this.renderHeader()}
                {this.renderContent()}
            </div>
        )
    }

    renderClosed(className) {
        return (
            <div
                className={className}
                onClick={() => this._contents.toggle()}
            >
                <div className={styles.toggleBtn}>{this.renderOpenIcon()}</div>
            </div>
        )
    }

    renderHeader() {
        const headerClassName = classNames({
            [styles.header]: true,
            [styles.header__scrolled]: this.state.isScrolled,
        })

        return (
            <div className={headerClassName}>
                <div className={styles.HeaderContentContainer}>
                    <div className={styles.SearchContainer}>
                        {this.renderCloseButton()}

                        <div className={styles.HeaderInnerContainer}>{this.props.header}</div>
                    </div>

                    <div className={styles.FilterContainer}>{this.props.subHeader}</div>
                </div>
            </div>
        )
    }

    renderCloseButton() {
        return (
            <div
                className={styles.toggleBtn}
                onClick={() => this._contents.toggle()}
            >
                {this.renderCloseIcon()}
            </div>
        )
    }

    renderContent() {
        return <div className={styles.ContentContainer}>{this.props.children}</div>
    }

    renderCloseIcon() {
        const value = 'keyboard_arrow_right'

        return (
            <div>
                <FontIcon
                    className={styles.toggleBtnIcon}
                    value={value}
                />
                <FontIcon
                    className={styles.toggleBtnIcon}
                    value={value}
                />
            </div>
        )
    }

    renderOpenIcon() {
        const value = 'keyboard_arrow_left'

        return (
            <FontIcon
                className={styles.toggleBtnIcon}
                value={value}
            />
        )
    }

    _onScroll = e => {
        if (!this.state.isScrolled && e.currentTarget.scrollTop > 2) {
            this.setState({
                isScrolled: true,
            })
        }

        if (this.state.isScrolled && e.currentTarget.scrollTop <= 2) {
            this.setState({
                isScrolled: false,
            })
        }
    }

    get _contents() {
        return this.props.state
    }
}
