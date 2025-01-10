import { ReactNode } from 'react';
import { styled, forward } from '@optimacros-ui/store';

type FlexProps = {
    children: ReactNode;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: string | number;
    fluid?: boolean;
    className?: string;
};

export const Flex = forward<FlexProps, 'div'>(
    (
        {
            children,
            direction = 'row',
            align = 'start',
            justify = 'start',
            wrap = 'nowrap',
            gap = '0',
            style,
            fluid,
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
                    ...style,
                }}
                ref={ref}
            >
                {children}
            </styled.div>
        );
    },
);
