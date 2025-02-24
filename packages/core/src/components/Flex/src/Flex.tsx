import { ReactNode, CSSProperties } from 'react';
import { styled, forward } from '@optimacros-ui/store';

export type FlexProps = {
    children?: ReactNode;
    direction?: CSSProperties['flexDirection'];
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
    wrap?: CSSProperties['flexWrap'];
    gap?: number | string;
    fluid?: boolean;
    className?: string;
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
};

export const Flex = forward<FlexProps, 'div'>(
    (
        {
            children = null,
            direction = 'row',
            align = 'start',
            justify = 'start',
            wrap = 'nowrap',
            gap = 0,
            style,
            fluid,
            width,
            height,
            ...rest
        },
        ref,
    ) => {
        return (
            <styled.div
                {...rest}
                data-scope="flex"
                data-part="root"
                data-direction={direction}
                data-align={align}
                data-justify={justify}
                data-wrap={wrap}
                data-fluid={fluid}
                style={{
                    gap: `var(--spacing-${gap})`,
                    width,
                    height,
                    ...style,
                }}
                ref={ref}
            >
                {children}
            </styled.div>
        );
    },
);
