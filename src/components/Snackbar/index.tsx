import React from 'react'
import { Button }  from 'ui-kit-core'
import { SnackbarComponent, SnackbarProps } from './Snackbar'
import theme from './snackbarTheme.module.css'
import { mergeStyles } from 'ui-kit-core'

const BaseSnackbar: React.FC<SnackbarProps> = (props) => (
    <SnackbarComponent
        {...props}
        Button={Button}
    />
)

export const Snackbar: React.FC<SnackbarProps> = (props) => (
    <BaseSnackbar
        {...props}
        theme={props.theme ? mergeStyles(props.theme, theme) : theme}
    />
)
