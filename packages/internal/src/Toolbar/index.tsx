import { Toolbar as UIToolbar } from '@optimacros-ui/toolbar';
import { memo, PropsWithChildren } from 'react';
import { ToolbarAlign } from './models';
import { Flex } from '@optimacros-ui/flex';

export interface ToolbarProps extends PropsWithChildren {
    align?: ToolbarAlign;
    className?: string;
}

export const Toolbar = memo<ToolbarProps>(({ align, className, children }) => (
    <UIToolbar.Root className={className}>
        <Flex data-align={align} data-role="toolbar-content">
            {children}
        </Flex>
    </UIToolbar.Root>
));
