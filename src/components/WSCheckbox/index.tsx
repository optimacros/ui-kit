import { isUndefined } from 'lodash'
import React from 'react'
import { Checkbox as Base } from 'ui-kit-core'
import type { CheckboxProps } from 'ui-kit-core/dist/components/Checkbox'

interface Props extends CheckboxProps {
    value?: boolean;
    error?: null | string;
    placeholder?: string;
    type?: string;
}

export const WSCheckbox = (props: Props): React.JSX.Element => {
    const { checked, value, error, placeholder, label, type, ...restProps } = props

    return (
        <Base
            {...restProps}
            checked={!isUndefined(checked)
                ? checked
                : !!value}
            label={label || placeholder}
        />
    )
}
