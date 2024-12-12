import classnames from 'classnames';
import React from 'react';

export type FontIconProps = {
    value: string | React.JSX.Element;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    title?: string;
    alt?: string;
    style?: React.CSSProperties;
};

export const FontIcon = (props: FontIconProps): React.JSX.Element => {
    const { alt = '', className = '', value, ...other } = props;

    return (
        <span
            {...other}
            data-react-toolbox="font-icon"
            aria-label={alt}
            className={classnames(
                {
                    'material-icons': typeof value === 'string',
                },
                className,
            )}
        >
            {value}
        </span>
    );
};
