// @ts-nocheck
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react'
import React from 'react'
import { Icon } from 'ui-kit-core'

import styles from './HeaderMenu.module.css'

interface Props {
	isFirstLevel: boolean;
	element: Element;
	rootElementNode: Node;
	elements: Array<Element>;
}

@observer
export default class HeaderMenuElementContainer extends React.Component<Props> {
    render() {
        const { element } = this.props

        const className = classNames({
            [styles.Element]: true,
            [styles.Element_withIcon]: !!element.icon,
            [styles.ElementContainer]: true,
        })

        return (
            <div
                className={className}
                disabled={element.disabled}
                onClick={this._onClick}
            >
                {this.renderIcon(element)}

                <div className={styles.Element_Title}>{element.title}</div>

                {this.renderArrowIcon()}
            </div>
        )
    }

    renderIcon(element) {
        if (!element.icon) {
            return null
        }

        return (
            <div className={styles.Element_IconContainer}>
                <Icon
                    className={styles.Element_Icon}
                    value={element.icon}
                />
            </div>
        )
    }

    renderArrowIcon() {
        const { element, isFirstLevel } = this.props

        if (isFirstLevel || _.isEmpty(element.children) || element.disabled) {
            return null
        }

        return (
            <div>
                <Icon
                    className={styles.Element_Arrow}
                    value="navigate_next"
                />
            </div>
        )
    }

    _onClick = () => {
        const { element } = this.props

        if (!element.disabled && element.open) {
            element.open()
        }
    }
}
