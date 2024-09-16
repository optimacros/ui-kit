import React, { useMemo } from 'react'
import { ButtonMenu as Base } from 'ui-kit-core'
import type { ButtonMenuProps } from 'ui-kit-core/dist/components/ButtonMenu'

import { mergeStyles } from '../../utils'

import styles from './ButtonMenu.module.css'

export const WSButtonMenu = (props: ButtonMenuProps): React.JSX.Element => {
    const theme = useMemo(() => mergeStyles(styles, props.theme), [props.theme])

    return (
        <Base
            {...props}
            theme={theme}
        />
    )
}
