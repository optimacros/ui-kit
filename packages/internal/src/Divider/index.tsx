import { Divider as DividerComponent } from '@optimacros-ui/divider';
import { Orientation } from '@optimacros-ui/utils';

type DividerProps = {
    vertical?: boolean;
};

export const Divider: DividerProps = ({ vertical = false }) => {
    const orientation = vertical ? Orientation.Vertical : Orientation.Horizontal;

    return <DividerComponent orientation={orientation} />;
};

export const HorizontalDivider = () => {
    return <DividerComponent orientation={Orientation.Horizontal} />;
};

export const VerticalDivider = () => {
    return <DividerComponent orientation={Orientation.Vertical} />;
};
