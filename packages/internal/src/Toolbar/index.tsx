import { forwardRef, PropsWithChildren } from 'react';
import { Toolbar as UIToolbar } from '@optimacros-ui/toolbar';
import { Flex } from '@optimacros-ui/flex';

import './styles.css';

type AlignProp = 'left' | 'center' | 'right' | 'rightInRow';

export interface ToolbarProps extends PropsWithChildren {
    align?: AlignProp;
    className?: string;
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
    ({ align, className, children, ...rest }, ref) => (
        <UIToolbar.Root
            className={className}
            ref={ref}
            data-tag="internal"
            style={align === 'rightInRow' ? { marginTop: 0 } : null}
            {...rest}
        >
            <Flex
                justify={getAlign(align)}
                data-role="toolbar-content"
                data-testid="toolbar-content"
            >
                {children}
            </Flex>
        </UIToolbar.Root>
    ),
);

Toolbar.displayName = 'Toolbar';
