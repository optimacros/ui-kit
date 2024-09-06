import React, { useMemo } from 'react'
import { ButtonMenu as Base, mergeStyles } from 'ui-kit-core'
import type { ButtonMenuProps } from 'ui-kit-core/dist/components/ButtonMenu'

import styles from './ButtonMenu.module.css'

export const ButtonMenu = (props: ButtonMenuProps): React.JSX.Element => {
    const theme = useMemo(() => mergeStyles(styles, props.theme), [props.theme])

    return (
        <Base
            {...props}
            theme={theme}
        />
    )
}
