// @ts-nocheck
import classnames from 'classnames'
import React from 'react'

import { mergeStyles } from '../../utils'

import themeStyles from './chipTheme.module.css'

interface Theme {
    avatar?: string;
    chip?: string;
    deletable?: string;
    delete?: string;
    deleteIcon?: string;
    deleteX?: string;
}

interface Props {
    children?: React.ReactNode;
    className?: string;
    deletable?: boolean;
    onDeleteClick?: () => void;
    theme?: Theme | Record<string, string>;
    settingsDialog?: string;
		incomeDeleteIcon: any;
}

const Chip: React.FC<Props> = ({
    children,
    className,
    deletable,
    onDeleteClick,
    theme,
    settingsDialog,
    incomeDeleteIcon,
    ...other
}) => {
    const isStringChildren = typeof children === 'string'
    const classes = classnames(
        theme.chip,
        {
            [theme.deletable]: !!deletable,
        },
        className,
    )

    return (
        <div
            className={classes}
            data-react-toolbox="chip"
            {...other}
        >
            {isStringChildren
                ? <span className={theme.children}>{children}</span>
                : children}

            <div className={theme.iconsContainer}>
                {!!settingsDialog && (
                    <span className={theme.customIconsContainer}>{settingsDialog}</span>
                )}

                {!!deletable && renderDeleteIcon()}
            </div>
        </div>
    )

    function renderDeleteIcon() {
        if (incomeDeleteIcon) {
            return <span className={theme.customIconsContainer}>{incomeDeleteIcon}</span>
        }

        return (
            <svg
                className={theme.deleteIcon}
                viewBox="0 0 40 40"
                onClick={onDeleteClick}
            >
                <path
                    className={theme.deleteX}
                    d="M 12,12 L 28,28 M 28,12 L 12,28"
                />
            </svg>
        )
    }
}

Chip.defaultProps = {
    className: '',
    deletable: false,
}

const ThemedChip: React.FC<Props> = props => (
    <Chip
        {...props}
        theme={props.theme
            ? mergeStyles(props.theme, themeStyles)
            : themeStyles}
    />
)

export default ThemedChip
export { ThemedChip as WSThemedChip }
export { Chip as WSChip }
