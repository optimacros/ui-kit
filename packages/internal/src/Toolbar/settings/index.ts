import { ToolbarAlign } from '../models';
import { Align as AlignEnum } from '@optimacros-ui/utils';

export const alignMapping: Record<ToolbarAlign, AlignEnum> = {
    left: AlignEnum.Left,
    right: AlignEnum.Right,
    rightInRow: AlignEnum.RightInRow,
    center: AlignEnum.Center,
};
