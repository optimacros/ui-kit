import type React from 'react';

interface Props {
    width?: number;
    height?: number;
    row?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Layout: React.FC<Props> = (props) => {
    const { width, height, row, style, children, ...otherProps } = props;

    return (
        <div
            {...otherProps}
            style={style}
            data-scope="layout"
            data-part="root"
            data-direction={row ? 'row' : 'column'}
        >
            {children}
        </div>
    );
};
