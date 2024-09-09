import React from 'react'
import { Chip as BaseChip } from 'ui-kit-core'
import type { ChipProps } from 'ui-kit-core/dist/components/Chip'

interface Props extends ChipProps {
    incomeDeleteIcon?: React.JSX.Element;
}

export const Chip = (props: Props) => {
    const { incomeDeleteIcon, ...restProps } = props

    return (
        <BaseChip
            {...restProps}
            customDeleteIcon={incomeDeleteIcon}
        />
    )
}
