import { PropsWithChildren } from 'react';
import { Toolbar as UIToolbar } from '@optimacros-ui/kit';
import { Flex } from '@optimacros-ui/kit';
import { Align } from '@optimacros-ui/utils';

export interface ToolbarProps extends PropsWithChildren {
    align?: Align;
    className?: string;
}

export const Toolbar = ({ align, className, children }: ToolbarProps) => (
    <UIToolbar.Root className={className}>
        <Flex data-align={align} data-role="toolbar-content">
            {children}
        </Flex>
    </UIToolbar.Root>
);
