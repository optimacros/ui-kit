// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { CheckBox as Checkbox } from 'ui-kit-core'
import BaseMenu from './BaseMenu'
import theme from './CheckBoxMenu.module.css'

@observer
export default class CheckBoxMenu extends React.Component {
    static propTypes = {
        elements: PropTypes.oneOfType([
            PropTypes.arrayOf(
                PropTypes.shape({
                    icon: PropTypes.string,
                    title: PropTypes.string,
                    label: PropTypes.string,
                    active: PropTypes.bool,
                }),
            ),

            PropTypes.object,
        ]).isRequired,

        isSelected: PropTypes.func,

        /**
         * ```js
         * <TreeMenu
         *   elements={elements}
         *   onSelect={(element) => state.select(element)}
         * />
         * ```
         */
        onSelect: PropTypes.func,

        onDropDownHide: PropTypes.func,
    }

    render() {
        return (
            <BaseMenu
                {...this.props}
                theme={theme}
                className={theme.BaseMenu}
                renderElement={this.renderElement}
                elementHeight={32}
                isCheckboxTree
                isStatic
            />
        )
    }

    renderElement = (element, onSelect) => {
        return (
            <div className={theme.CheckboxElement}>
                <Checkbox
                    theme={theme}
                    className={theme.Checkbox}
                    label={element.title}
                    checked={this._isChecked(element)}
                    disabled={element.disabled}
                    onChange={(checked) => onSelect(element, checked)}
                />
            </div>
        )
    }

    _isChecked(element) {
        return (this.props.isSelected && this.props.isSelected(element)) || element.checked || element.active
    }
}
