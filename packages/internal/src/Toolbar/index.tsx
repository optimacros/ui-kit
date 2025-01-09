import { Toolbar as UIToolbar } from '@optimacros-ui/toolbar';
import { memo, PropsWithChildren } from 'react';
import { ToolbarAlign } from './models';
import { alignMapping } from './settings';

export interface ToolbarProps extends PropsWithChildren {
    align?: ToolbarAlign;
    className?: string;
}

export const Toolbar = memo<ToolbarProps>(({ align, className, children }) => {
    const alignEnum = alignMapping[align];

    return (
        <UIToolbar.Root className={className} align={alignEnum}>
            {children}
        </UIToolbar.Root>
    );
});
