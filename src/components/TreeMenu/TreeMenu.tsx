import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { mergeStyles } from '../../utils'
import { FontIcon } from 'ui-kit-core'
import BaseMenu from './BaseMenu'
import themeTreeMenu from './TreeMenu.module.css'

@observer
export class TreeMenu extends React.Component {
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
    }

    static defaultProps = {
        theme: {
            /* eslint-disable @typescript-eslint/camelcase, camelcase */
            Menu__static: 'TreeMenu__Menu__static',
            element: 'TreeMenu__element',
            icon: 'TreeMenu__icon',
            title: 'TreeMenu__title',
            /* eslint-enable @typescript-eslint/camelcase, camelcase */
        },
    }

    render() {
        const theme = mergeStyles(this.props.theme, themeTreeMenu)

        return (
            <BaseMenu
                {...this.props}
                theme={theme}
                onSelect={this._onSelect}
                renderElement={this.renderElement}
            />
        )
    }

    renderElement = (element, onSelect) => {
        const { theme } = this.props

        return (
            <div
                className={theme.element}
                onMouseDown={(e) => onSelect(element, e)}
            >
                {this.renderIcon(element)}

                <div className={theme.title}>{element.title || element.label}</div>
            </div>
        )
    }

    renderIcon(element) {
        const theme = mergeStyles(this.props.theme, themeTreeMenu)

        if (!element.icon) {
            return null
        }

        return (
            <FontIcon
                value={element.icon}
                className={theme.icon}
            />
        )
    }

    _onSelect = (element, e) => {
        e.stopPropagation()

        this.props.onSelect(element, e)

        if (this.props.closeMenu) {
            this.props.closeMenu()
        }
    }
}
