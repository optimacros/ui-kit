// @ts-nocheck
import classnames from 'classnames'
import React, { ReactNode } from 'react'

export interface CheckProps {
    checked?: boolean;
    children?: ReactNode;
    onMouseDown?: (event: React.MouseEvent) => void;
    style?: React.CSSProperties;
    theme?: Record<string, string>;
}

const Check: React.FC<CheckProps> = ({ checked, children, onMouseDown, theme, style }) => (
    <div
        className={classnames(theme.check, { [theme.checked]: checked })}
        data-react-toolbox="check"
        style={style}
        onMouseDown={onMouseDown}
    >
        {children}
    </div>
)

export default Check
