import { ReactNode } from 'react';
import { styled, forward } from '@optimacros-ui/store';

type FlexProps = {
    children: ReactNode;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: string;
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
        },
        ref,
    ) => {
        return (
            <styled.div
                data-scope="flex"
                data-part="root"
                data-direction={direction}
                data-align={align}
                data-justify={justify}
                data-wrap={wrap}
                style={{
                    //@ts-ignore
                    '--gap': `var(--spacing-${gap})`,
                }}
                ref={ref}
            >
                {children}
            </styled.div>
        );
    },
);
