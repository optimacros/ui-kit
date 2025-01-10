import { Orientation } from '@optimacros-ui/utils';

export const Spacer = ({
    orientation = Orientation.Vertical,
    size = 1,
    ...props
}: { orientation: Orientation; size: number }) => {
    const style = {
        display: orientation === 'horizontal' ? 'inline-block' : 'block',
        flexShrink: 0,
        ...(orientation === 'horizontal'
            ? { width: `var(--spacing-${size})` }
            : { height: `var(--spacing-${size})` }),
    };

    return <div style={style} {...props} />;
};
