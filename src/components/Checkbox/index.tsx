import { isUndefined } from 'lodash'
import React from 'react'
import { CheckBox } from 'ui-kit-core'
import type { CheckBoxProps } from 'ui-kit-core/dist/components/CheckBox'

interface Props extends CheckBoxProps {
    value?: boolean;
    error?: null | string;
    placeholder?: string;
    type?: string;
}

export const Checkbox = (props: Props): React.JSX.Element => {
    const { checked, value, error, placeholder, label, type, ...restProps } = props

    return (
        <CheckBox
            {...restProps}
            checked={!isUndefined(checked)
                ? checked
                : !!value}
            label={label || placeholder}
        />
    )
}
