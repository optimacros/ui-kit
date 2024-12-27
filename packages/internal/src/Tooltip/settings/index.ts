import { TooltipPosition } from '../models';
import { Tooltip } from '@optimacros-ui/tooltip';

export const tooltipPositionMapping: Record<TooltipPosition, Tooltip.Placement> = {
    horizontal: 'left',
    vertical: 'top',
    top: 'top',
    right: 'right',
    bottom: 'bottom',
    left: 'left',
};
