import { forward, styled } from '@optimacros-ui/store';
import { Orientation } from '@optimacros-ui/utils';

interface Props {
    orientation?: Orientation;
    size?: number;
}

export const Spacer = forward<Props, 'div'>(
    ({ orientation = Orientation.Vertical, size = 1, style: styleProp, ...rest }, ref) => {
        const style = {
            ...styleProp,
            display: orientation === 'horizontal' ? 'inline-block' : 'block',
            flexShrink: 0,
            ...(orientation === 'horizontal'
                ? { width: `var(--spacing-${size})` }
                : { height: `var(--spacing-${size})` }),
        };

        return <styled.div {...rest} style={style} ref={ref} />;
    },
    { displayName: 'Spacer' },
);
