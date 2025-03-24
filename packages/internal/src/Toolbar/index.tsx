import { forwardRef, PropsWithChildren } from 'react';
import { Toolbar as UIToolbar } from '@optimacros-ui/toolbar';
import { Flex } from '@optimacros-ui/flex';

type AlignProp = 'left' | 'center' | 'right' | 'rightInRow';

export interface ToolbarProps extends PropsWithChildren {
    align?: AlignProp;
    className?: string;
    gap?: number;
}

const getAlign = (align: AlignProp) => {
    switch (align) {
        case 'right':
            return 'end';
        case 'rightInRow':
            return 'end';
        case 'center':
            return 'center';
        default:
            return 'start';
    }
};

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
    ({ align, className, children, gap }, ref) => (
        <UIToolbar.Root className={className} ref={ref}>
            <Flex
                justify={getAlign(align)}
                data-role="toolbar-content"
                style={align === 'rightInRow' && { marginTop: 0 }}
                gap={gap ?? 3}
            >
                {children}
            </Flex>
        </UIToolbar.Root>
    ),
);
