import React from 'react'
import { Navigation as BaseNavigation } from 'ui-kit-core'
import type { NavigationProps } from 'ui-kit-core/dist/components/Navigation'

interface Props extends NavigationProps {
    vertical?: boolean;
}

export const Navigation = (props: Props): React.JSX.Element => {
    const { vertical, ...restProps } = props

    return (
        <BaseNavigation
            {...restProps}
            type={vertical
                ? 'vertical'
                : 'horizontal'}
        />
    )
}
