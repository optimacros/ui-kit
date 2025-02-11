import { Divider as DividerComponent } from '@optimacros-ui/divider';
import { Orientation } from '@optimacros-ui/utils';
import { forward } from '@optimacros-ui/store';

type DividerProps = {
    vertical?: boolean;
};

export const Divider = forward<DividerProps, 'hr'>(({ vertical = false }, ref) => {
    const orientation = vertical ? Orientation.Vertical : Orientation.Horizontal;

    return <DividerComponent orientation={orientation} ref={ref} />;
});

export const HorizontalDivider = forward<{}, 'hr'>((_, ref) => {
    return <DividerComponent orientation={Orientation.Horizontal} ref={ref} />;
});

export const VerticalDivider = forward<{}, 'hr'>((_, ref) => {
    return <DividerComponent orientation={Orientation.Vertical} ref={ref} />;
});
