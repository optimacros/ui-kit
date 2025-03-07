import { ComponentProps } from 'react';
import { VisuallyHidden } from '..';

export const WithCustomInput = ({ children }: ComponentProps<typeof VisuallyHidden>) => (
    <div>
        <label>
            <VisuallyHidden>{children}</VisuallyHidden>
            <input
                type="search"
                placeholder="Search..."
                style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                }}
            />
        </label>
    </div>
);
