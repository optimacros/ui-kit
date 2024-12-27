export type TooltipPosition = 'bottom' | 'horizontal' | 'left' | 'right' | 'top' | 'vertical';

export type TooltipPositionInfo = {
    top: number;
    left: number;
    position: TooltipPosition;
};

export type TooltipTheme = {
    /** Added to the tooltip element wrapper */
    tooltip?: string;
    /** Added to the root when the tooltip is active */
    tooltipActive?: string;
    /** Added to the inner element which sets the background, font and rounded borders */
    tooltipInner?: string;
    /** Added to the root in case the tooltip is being positioned at bottom */
    tooltipBottom?: string;
    /** Added to the root in case the tooltip is being positioned at left */
    tooltipLeft?: string;
    /** Added to the root in case the tooltip is being positioned at right */
    tooltipRight?: string;
    /** Added to the root in case the tooltip is being positioned at top */
    tooltipTop?: string;
};
