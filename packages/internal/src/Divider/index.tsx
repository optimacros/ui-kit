import { Divider as DividerComponent } from '@optimacros-ui/kit';
import { Orientation } from '@optimacros-ui/utils';

type DividerProps = {
    vertical?: boolean;
};

export const Divider = ({ vertical = false }: DividerProps) => {
    const orientation = vertical ? Orientation.Vertical : Orientation.Horizontal;

    return <DividerComponent orientation={orientation} />;
};

export const HorizontalDivider = () => {
    return <DividerComponent orientation={Orientation.Horizontal} />;
};

export const VerticalDivider = () => {
    return <DividerComponent orientation={Orientation.Vertical} />;
};
