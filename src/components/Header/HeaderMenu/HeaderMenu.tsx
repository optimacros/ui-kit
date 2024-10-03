// @ts-nocheck
import _ from 'lodash'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { HeaderMenuElement } from './HeaderMenuElement'

import styles from './HeaderMenu.module.css'

@observer
export class HeaderMenu extends Component {
    static propTypes = {
        elements: PropTypes.array.isRequired,
    }

    render() {
        if (_.isEmpty(this.props.elements)) {
            return null
        }

        return (
            <div className={styles.Container}>
                <ul className={styles.Menu}>{this.renderList()}</ul>
            </div>
        )
    }

    renderList() {
        return _.map(this.props.elements, element => {
            if (element.hidden) {
                return null
            }

            const key = element.id || element.entityLongId || element.title

            return (
                <HeaderMenuElement
                    key={key}
                    element={element}
                    firstLevel
                />
            )
        })
    }
}
