// @ts-nocheck
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import BaseMenu from './BaseMenu'

import themeTreeLineMenu from './TreeLineMenu.module.css'

@observer
export default class TreeLineMenu extends React.Component {
    static propTypes = {
        elements: PropTypes.oneOfType([
            PropTypes.arrayOf(
                PropTypes.shape({
                    icon: PropTypes.string,
                    title: PropTypes.string,
                    label: PropTypes.string,
                    active: PropTypes.bool,
                }),
            ).isRequired,

            PropTypes.object,
        ]),

        /**
         * ```js
         * <TreeMenu
         *   elements={elements}
         *   onSelect={(element) => state.select(element)}
         * />
         * ```
         */
        onSelect: PropTypes.func,

        closeMenu: PropTypes.func,

        onDropDownHide: PropTypes.func,

        theme: PropTypes.object,

        stateDraggable: PropTypes.object,
    }

    static defaultProps = {
        theme: {
            /* eslint-disable  camelcase */
            ButtonArrow: 'TreeLineMenu__ButtonArrow',
            ButtonArrowIcon: 'TreeLineMenu__ButtonArrowIcon',
            ButtonArrow__active: 'TreeLineMenu__ButtonArrow__active',
            Container: 'TreeLineMenu__Container',
            DefaultElement: 'TreeLineMenu__DefaultElement',
            Element: 'TreeLineMenu__Element',
            List: 'TreeLineMenu__List',
            ListElement: 'TreeLineMenu__ListElement',
            ListElement__children_none: 'TreeLineMenu__ListElement__children_none',
            ListElement__children_one: 'TreeLineMenu__ListElement__children_one',
            ListElement__children_some: 'TreeLineMenu__ListElement__children_some',
            TreeLineMenu: 'TreeLineMenu__TreeLineMenu',
            /* eslint-enable  camelcase */
        },
    }

    render() {
        return (
            <BaseMenu
                {...this.props}
                theme={{ ...themeTreeLineMenu, ...this.props.theme }}
                className={this.props.theme.TreeLineMenu}
                onSelect={this._onSelect}
                isTreeLineMenu
                sizeFromZoom
            />
        )
    }

    _onSelect = (element, event) => {
        event.stopPropagation()

        this.props.onSelect(element, event)

        if (this.props.closeMenu) {
            this.props.closeMenu()
        }
    }
}
