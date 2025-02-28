import { ComponentProps } from 'react';
import { ToastGroup } from '..';

export const props: Partial<ComponentProps<typeof ToastGroup.RootProvider>> = {
    controllable: false,
    pauseOnPageIdle: false,
    gap: 16,
    max: Number.MAX_SAFE_INTEGER,
    overlap: false,
    duration: undefined,
    removeDelay: undefined,
    placement: 'bottom',
};
