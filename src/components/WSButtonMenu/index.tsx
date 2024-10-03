import React, { useMemo } from 'react'
import { mergeStyles, ButtonMenu as BaseIconButton } from 'ui-kit-core'
import type { ButtonMenuProps } from 'ui-kit-core/dist/components/ButtonMenu'

// @ts-ignore
import styles from './ButtonMenu.module.css'

export const WSButtonMenu = (props: ButtonMenuProps): React.JSX.Element => {
    const theme = useMemo(() => mergeStyles(styles, props.theme), [props.theme])

    return (
        <BaseIconButton
            {...props}
            theme={theme}
        />
    )
}
