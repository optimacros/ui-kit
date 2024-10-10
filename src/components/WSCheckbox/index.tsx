import { isUndefined } from 'lodash'
import React from 'react'
import { Checkbox as Base } from 'ui-kit-core'
import type { CheckboxProps } from 'ui-kit-core/dist/components/Checkbox'

interface Props extends CheckboxProps {
    defaultChecked?: boolean;
    value?: boolean;
    error?: null | string;
    placeholder?: string;
    type?: string;
}

export const WSCheckbox = (props: Props): React.JSX.Element => {
    const { checked, defaultChecked, value, error, placeholder, label, type, ...restProps } = props
    const checkedProps = (() => {
        if (isUndefined(defaultChecked)) {
            return {
                checked: !isUndefined(checked)
                    ? checked
                    : !!value,
            }
        }

        return {
            defaultChecked,
        }
    })()

    return (
        <Base
            {...restProps}
            {...checkedProps}
            label={label || placeholder}
        />
    )
}
