import { forward, styled } from '@optimacros-ui/store';

type GridProps = {
    cols?: '1' | '2' | '3' | '4' | '5' | '6' | '12';
    rows?: '1' | '2' | '3' | '4' | '5' | '6';
    gap?: string;
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'stretch';
    flow?: 'row' | 'column' | 'dense';
};

export const Root = forward<GridProps, 'div'>(
    (
        {
            children,
            cols = '1',
            rows,
            gap = '0',
            align = 'stretch',
            justify = 'stretch',
            flow = 'row',
            ...rest
        },
        ref,
    ) => {
        return (
            <styled.div
                {...rest}
                data-scope="grid"
                data-part="root"
                data-cols={cols}
                data-rows={rows}
                data-align={align}
                data-justify={justify}
                data-flow={flow}
                style={{
                    gap: `var(--spacing-${gap})`,
                }}
                ref={ref}
            >
                {children}
            </styled.div>
        );
    },
);

export const Item = forward<
    {
        colSpan?: string;
        rowSpan?: string;
    },
    'div'
>(({ children, colSpan, rowSpan, ...rest }, ref) => {
    return (
        <styled.div
            {...rest}
            ref={ref}
            data-scope="grid"
            data-part="item"
            style={{
                gridColumn: colSpan ? `span ${colSpan}` : undefined,
                gridRow: rowSpan ? `span ${rowSpan}` : undefined,
            }}
        >
            {children}
        </styled.div>
    );
});
