import { VisuallyHidden } from '..';
import { ComponentProps } from 'react';

export const props: Partial<ComponentProps<typeof VisuallyHidden>> = {
    children: 'This text is hidden visually but available to screen readers',
};
