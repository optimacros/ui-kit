import { ComponentProps } from 'react';
import { VisuallyHidden } from '..';

export const Basic = (props: ComponentProps<typeof VisuallyHidden>) => (
    <div>
        <p>The text below is visually hidden but accessible to screen readers:</p>
        <VisuallyHidden {...props} data-testId="root" />
    </div>
);
