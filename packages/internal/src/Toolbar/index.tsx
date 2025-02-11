import { PropsWithChildren } from 'react';
import { Toolbar as UIToolbar } from '@optimacros-ui/toolbar';
import { Flex } from '@optimacros-ui/flex';
import { forward } from '@optimacros-ui/store';

type AlignProp = 'left' | 'center' | 'right' | 'rightInRow';

export interface IToolbar extends PropsWithChildren {
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

export const Toolbar = forward<IToolbar, 'div'>(({ align, className, children }, ref) => (
    <UIToolbar.Root className={className} ref={ref}>
        <Flex
            justify={getAlign(align)}
            data-role="toolbar-content"
            style={align === 'rightInRow' && { marginTop: 0 }}
        >
            {children}
        </Flex>
    </UIToolbar.Root>
));
