import { ComponentProps } from 'react';
import { VisuallyHidden } from '..';

export const WithButton = ({ children }: ComponentProps<typeof VisuallyHidden>) => (
    <button>
        <VisuallyHidden>{children}</VisuallyHidden>
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
        </svg>
    </button>
);
