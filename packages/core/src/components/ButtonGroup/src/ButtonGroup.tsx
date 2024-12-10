import { forward, styled } from '@optimacros-ui/store';
import { tw, Orientation } from '@optimacros-ui/utils';

export const rootClassName = tw`flex data-[orientation=vertical]:flex-col border-primary border-2 rounded-sm justify-center align-center text-center`;
export const Root = forward<{ orientation: Orientation }, 'div'>(
    ({ orientation = Orientation.Horizontal, ...rest }, ref) => (
        <styled.div
            {...rest}
            ref={ref}
            className={rootClassName}
            data-scope="button-group"
            data-part="root"
            data-orientation={orientation}
        />
    ),
);

export const itemClassName = tw`nth-of-type-[n+1]:not-last-of-type:border-r-primary border-1 border-transparent p-1`;
export const Item = forward<{}, 'div'>((props, ref) => (
    <styled.div
        {...props}
        ref={ref}
        data-scope="button-group"
        data-part="item"
        className={itemClassName}
    />
));
