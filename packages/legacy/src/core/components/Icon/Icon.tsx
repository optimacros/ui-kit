import React from 'react';

import { FontIcon } from '../FontIcon';

import IconStyle from './Icon.module.css';

export interface IconProps {
    value: React.JSX.Element | string;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    title?: string;
    alt?: string;
    style?: React.CSSProperties;
}

export const Icon = (props: IconProps): React.JSX.Element => {
    const { value, ...otherProps } = props;

    if (typeof value === 'string') {
        return <FontIcon {...otherProps} value={value} />;
    }

    return (
        <div {...otherProps} className={otherProps.className ?? IconStyle.Container}>
            {value}
        </div>
    );
};
